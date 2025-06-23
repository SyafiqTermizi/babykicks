from fastapi import APIRouter, HTTPException
from sqlalchemy.exc import IntegrityError

from ..core.database import DBConn
from .auth import CurrentUser
from .dtos import UserCreateDTO, UserPublicDTO, UserSignInDTO, UserTokenDTO
from .services import TokenService, UserService

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
    user_service = UserService(conn=db_conn)
    user = user_service.authenticate(data)

    if not user:
        raise HTTPException(status_code=400, detail="invalid email/password")

    token_service = TokenService()
    return UserTokenDTO(access_token=token_service.encode_jwt_token(user=user))


@router.post("/test-token")
def test_token(user: CurrentUser):
    return UserPublicDTO(username=user.username, email=user.email)
