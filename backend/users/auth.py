from typing import Annotated

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

from backend.core.database import DBConn

from .models import User
from .services import TokenService, UserService

reusable_oauth2 = OAuth2PasswordBearer(tokenUrl="/users/signin")
TokenDep = Annotated[str, Depends(reusable_oauth2)]


def get_current_user(db_conn: DBConn, token: TokenDep) -> User | None:
    token_service = TokenService()
    token_payload = token_service.decode_jwt_token(token=token)

    if not token_payload:
        raise HTTPException(status_code=403, detail="could not validate credential")

    user_service = UserService(conn=db_conn)
    user = user_service.get_user_by_email(email=token_payload["email"])

    if not user:
        raise HTTPException(status_code=403, detail="could not validate credential")

    return user


CurrentUser = Annotated[User, Depends(get_current_user)]
