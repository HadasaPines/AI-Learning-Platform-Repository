from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from .categorySchema import CategoryRead, SubCategoryRead
from app.schemas.userSchema import UserInDB

class PromptBase(BaseModel):
    user_id: int = Field(..., gt=0, description="ID of the user")
    prompt: str = Field(..., min_length=5, max_length=1000, description="User's input prompt")
    category_id: int = Field(..., gt=0, description="ID of the selected category")
    sub_category_id: Optional[int] = Field(None, gt=0, description="Optional sub-category ID")
    response: Optional[str] = None

class PromptCreate(PromptBase):
    pass  # 👈 no created_at from client side

class PromptUpdate(BaseModel):
    user_id: Optional[int] = Field(None, gt=0)
    prompt: Optional[str] = Field(None, min_length=5, max_length=1000)
    category_id: Optional[int] = Field(None, gt=0)
    sub_category_id: Optional[int] = Field(None, gt=0)

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
    category: CategoryRead
    sub_category: Optional[SubCategoryRead] = None

    class Config:
        from_attributes = True
