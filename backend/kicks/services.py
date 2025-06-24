from datetime import datetime

from pytz import timezone
from sqlmodel import Session, desc, func, select

from backend.core.settings import settings

from .models import Kick


class KickService:
    def __init__(self, conn: Session):
        self.conn = conn

    def create_kick(self, user_id: int) -> Kick:
        kick = Kick(user_id=user_id)

        self.conn.add(kick)
        self.conn.commit()

        return kick

    def list_todays_kicks(self, user_id: int) -> list[Kick]:
        local_tz = timezone(settings.TIME_ZONE_NAME)
        date = (
            datetime.now(tz=local_tz)
            .replace(hour=0, minute=0, second=0, microsecond=0)
            .astimezone(timezone("utc"))
            .date()
        )
        statement = (
            select(Kick)
            .where(
                Kick.user_id == user_id,
                func.date(Kick.created_at) >= date,
            )
            .order_by(desc(Kick.created_at))
        )
        return self.conn.exec(statement).all()
