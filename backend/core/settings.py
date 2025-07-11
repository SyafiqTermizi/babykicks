from pydantic_core import MultiHostUrl
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DEBUG: bool
    SECRET_KEY: str
    PROJECT_NAME: str
    ACCESS_TOKEN_EXPIRE_SECONDS: int
    ACCESS_TOKEN_ALGORITHM: str
    TIME_ZONE_NAME: str
    ALLOWED_CORS_ORIGIN: str

    POSTGRES_DB: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_PORT: int
    POSTGRES_HOST: str

    def get_db_url(self) -> str:
        return str(
            MultiHostUrl.build(
                scheme="postgresql+psycopg",
                username=self.POSTGRES_USER,
                password=self.POSTGRES_PASSWORD,
                host=self.POSTGRES_HOST,
                port=self.POSTGRES_PORT,
                path=self.POSTGRES_DB,
            )
        )


settings = Settings()
