from fastapi import APIRouter, HTTPException
from sqlalchemy.exc import IntegrityError

from ..core.database import DBConn
from .dtos import UserCreateDTO, UserPublicDTO, UserSignInDTO, UserTokenDTO
from .services import UserService

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/signup")
def signup(data: UserCreateDTO, db_conn: DBConn) -> UserPublicDTO:
    service = UserService(conn=db_conn)

    try:
        user = service.create_user(data)
    except IntegrityError:
        raise HTTPException(status_code=400, detail="username/email already exist")

    return UserPublicDTO(username=user.username, email=user.email)


@router.post("/signin")
def signin(data: UserSignInDTO, db_conn: DBConn) -> UserTokenDTO:
    service = UserService(conn=db_conn)
    user = service.authenticate(data)

    if not user:
        raise HTTPException(status_code=400, detail="invalid email/password")

    return UserTokenDTO(access_token=user.create_jwt_token())
