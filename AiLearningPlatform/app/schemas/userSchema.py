from pydantic import BaseModel
from typing import Optional


class UserBase(BaseModel):
    name: str
    phone: str

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None

class UserInDB(UserBase):
    id: int

    class Config:
        from_attributes = True 

class UserUpdate(BaseModel):
    name: Optional[str]
    phone: Optional[str]