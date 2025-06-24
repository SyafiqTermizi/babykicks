import uuid

from pydantic import BaseModel


class KickDTO(BaseModel):
    id: uuid.UUID
    created_at: str
