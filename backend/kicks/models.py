from datetime import datetime, timezone

from sqlmodel import Field, Relationship, SQLModel

from ..users.models import User


class Kick(SQLModel, table=True):
    id: int | None = Field(primary_key=True)
    user_id: int = Field(foreign_key="user.id", nullable=False, ondelete="CASCADE")
    user: User | None = Relationship(back_populates="kicks")
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
