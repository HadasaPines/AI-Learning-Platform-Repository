from pydantic import BaseModel, Field
from typing import Optional


class UserBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=50, description="Full name of the user")
    phone: str = Field(..., min_length=9, max_length=15, description="Phone number as string")

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=50)
    phone: Optional[str] = Field(None, min_length=9, max_length=15)

class LoginRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=50)
    phone: str = Field(..., min_length=9, max_length=15)

class UserInDB(UserBase):
    id: int

    class Config:
        from_attributes = True
