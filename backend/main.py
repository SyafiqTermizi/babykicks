from fastapi import FastAPI

from .core.settings import settings
from .kicks.routes import router as kick_router
from .users.routes import router as user_router

app = FastAPI(title=settings.PROJECT_NAME)


app.include_router(user_router)
app.include_router(kick_router)
