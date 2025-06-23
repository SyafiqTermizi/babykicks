from sqlmodel import Session, select

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

    def authenticate(self, data: UserSignInDTO) -> User | None:
        """
        Check if given user name and password is valid. Returns None if
        - User does not exist
        - Password is invalid
        """
        statement = select(User).where(User.email == data.email)
        user = self.conn.exec(statement).first()

        if user and user.check_password(raw_password=data.password):
            return user

        return None
