from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from .core.settings import settings
from .kicks.routes import router as kick_router
from .users.routes import router as user_router

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.ALLOWED_CORS_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)
app.include_router(kick_router)
