from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DEBUG: bool
    PROJECT_NAME: str

    POSTGRES_DB: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_PORT: str
    POSTGRES_HOST: str


settings = Settings()
