from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from .categorySchema import CategoryRead, SubCategoryRead
from app.schemas.userSchema import UserInDB



class PromptBase(BaseModel):
    user_id: int
    prompt: str
    category_id: int
    sub_category_id: Optional[int] = None
    response: Optional[str] = None

class PromptCreate(PromptBase):
    pass  # 👈 בלי created_at

class PromptUpdate(BaseModel):
    user_id: Optional[int] = None
    prompt: Optional[str] = None
    category_id: Optional[int] = None
    sub_category_id: Optional[Optional[int]] = None

class PromptWithCategory(PromptBase):
    id: int
    created_at: datetime
    category: CategoryRead
    sub_category: Optional[SubCategoryRead] = None

    class Config:
        from_attributes = True

class PromptInDB(PromptBase):
    id: int
    created_at: datetime 

    class Config:
        from_attributes = True

class PromptWithUser(PromptInDB):
    user: UserInDB  
    created_at: datetime
    category: CategoryRead
    sub_category: Optional[SubCategoryRead] = None

    class Config:
        from_attributes = True
