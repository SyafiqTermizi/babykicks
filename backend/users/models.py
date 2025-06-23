import json
from datetime import datetime, timedelta, timezone

import jwt
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
from pydantic import EmailStr
from sqlmodel import Field, SQLModel

from ..core.settings import settings


class User(SQLModel, table=True):
    id: int | None = Field(primary_key=True)
    username: str = Field(unique=True, min_length=5, max_length=255)
    email: EmailStr = Field(unique=True, min_length=5, index=True, max_length=255)
    password: str = Field(min_length=5, max_length=255)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    def set_password(self, raw_password: str):
        ph = PasswordHasher()
        self.password = ph.hash(raw_password)

    def check_password(self, raw_password: str) -> bool:
        """
        Return a boolean of whether the raw_password was correct. Handles
        hashing formats behind the scenes.
        """
        ph = PasswordHasher()
        is_valid = False

        try:
            is_valid = ph.verify(self.password, raw_password)
        except VerifyMismatchError:
            is_valid = False

        return is_valid

    def create_jwt_token(self):
        expire = datetime.now(timezone.utc) + timedelta(
            seconds=settings.ACCESS_TOKEN_EXPIRE_SECONDS
        )
        subject = json.dumps({"username": self.username, "email": self.email})
        to_encode = {"exp": expire, "sub": str(subject)}
        encoded_jwt = jwt.encode(
            to_encode,
            settings.SECRET_KEY,
            algorithm=settings.ACCESS_TOKEN_ALGORITHM,
        )
        return encoded_jwt
