from fastapi import APIRouter

from backend.core.database import DBConn
from backend.users.auth import CurrentUser

from .dtos import KickDTO
from .services import KickService
from .utils import to_formatted_kl_tz

router = APIRouter(prefix="/kicks", tags=["kicks"])


@router.post("")
def create_kick(user: CurrentUser, db_conn: DBConn) -> KickDTO:
    service = KickService(conn=db_conn)
    kick = service.create_kick(user_id=user.id)
    return KickDTO(
        id=kick.id,
        created_at=to_formatted_kl_tz(kick.created_at),
    )


@router.get("")
def list_today_kicks(user: CurrentUser, db_conn: DBConn):
    service = KickService(conn=db_conn)
    kicks = service.list_todays_kicks(user_id=user.id)
    res = list(
        map(
            lambda kick: KickDTO(
                id=kick.id,
                created_at=to_formatted_kl_tz(kick.created_at),
            ),
            kicks,
        )
    )
    return res
