import uuid
from datetime import datetime, timezone

from sqlmodel import Field, SQLModel


class Kick(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: int = Field(
        foreign_key="user.id",
        nullable=False,
        ondelete="CASCADE",
        index=True,
    )
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        index=True,
    )
