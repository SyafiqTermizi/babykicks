import json
from datetime import datetime, timedelta, timezone

import jwt
from jwt.exceptions import InvalidTokenError
from pydantic import EmailStr
from sqlmodel import Session, select

from ..core.settings import settings
from .dtos import UserCreateDTO, UserSignInDTO
from .models import User


class UserService:
    def __init__(self, conn: Session):
        self.conn = conn

    def create_user(self, data: UserCreateDTO) -> User:
        user = User(username=data.username, email=data.email)
        user.set_password(raw_password=data.password)

        self.conn.add(user)
        self.conn.commit()

        return user

    def get_user_by_email(self, email: EmailStr) -> User | None:
        statement = select(User).where(User.email == email)
        return self.conn.exec(statement).first()

    def authenticate(self, data: UserSignInDTO) -> User | None:
        """
        Check if given user name and password is valid. Returns None if
        - User does not exist
        - Password is invalid
        """
        user = self.get_user_by_email(email=data.email)

        if user and user.check_password(raw_password=data.password):
            return user

        return None


class TokenService:
    def encode_jwt_token(self, user: User) -> str:
        expire = datetime.now(timezone.utc) + timedelta(
            seconds=settings.ACCESS_TOKEN_EXPIRE_SECONDS
        )
        subject = json.dumps({"username": user.username, "email": user.email})
        to_encode = {"exp": expire, "sub": str(subject)}
        encoded_jwt = jwt.encode(
            to_encode,
            settings.SECRET_KEY,
            algorithm=settings.ACCESS_TOKEN_ALGORITHM,
        )
        return encoded_jwt

    def decode_jwt_token(self, token: str) -> dict | None:
        try:
            payload = jwt.decode(
                token,
                settings.SECRET_KEY,
                algorithms=[settings.ACCESS_TOKEN_ALGORITHM],
            )
        except InvalidTokenError:
            return None

        return json.loads(payload["sub"])
