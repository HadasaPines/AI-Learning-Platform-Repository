from pydantic import BaseModel, Field
from typing import Optional
from app.schemas.categorySchema import CategoryInDB

class SubCategoryBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=50, description="Sub-category name")
    category_id: int = Field(..., gt=0, description="ID of the parent category")

class SubCategoryCreate(SubCategoryBase):
    pass

class SubCategoryUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=50)
    category_id: Optional[int] = Field(None, gt=0)

class SubCategoryInDB(SubCategoryBase):
    id: int
    category: CategoryInDB

    class Config:
        from_attributes = True
