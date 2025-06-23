from collections.abc import Generator
from typing import Annotated

from fastapi import Depends
from sqlmodel import Session, create_engine

from .settings import settings

engine = create_engine(str(settings.get_db_url()))


def get_db() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session


DBConn = Annotated[Session, Depends(get_db)]
