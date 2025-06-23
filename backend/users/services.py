from sqlmodel import Session

from .dtos import UserCreateDTO, UserPublicDTO
from .models import User


class UserService:
    def __init__(self, conn: Session):
        self.conn = conn

    def create_user(self, data: UserCreateDTO) -> UserPublicDTO:
        user = User(username=data.username, email=data.email)
        user.set_password(raw_password=data.password)

        self.conn.add(user)
        self.conn.commit()

        return UserPublicDTO(username=user.username, email=user.email)
