from pydantic import BaseModel, EmailStr, Field


class UserCreateDTO(BaseModel):
    username: str = Field(min_length=5, max_length=255)
    email: EmailStr = Field(min_length=5, index=True, max_length=255)
    password: str = Field(min_length=5, max_length=255)


class UserSignInDTO(BaseModel):
    email: EmailStr = Field(min_length=5, index=True, max_length=255)
    password: str = Field(min_length=5, max_length=255)


class UserTokenDTO(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserPublicDTO(BaseModel):
    username: str = Field(min_length=5, max_length=255)
    email: EmailStr = Field(min_length=5, index=True, max_length=255)
