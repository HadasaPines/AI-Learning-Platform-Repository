from pydantic import BaseModel, Field
from typing import Optional

class CategoryBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=50, description="Category name")

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=50)

class CategoryRead(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True

class SubCategoryRead(BaseModel):
    id: int
    name: str
    category_id: int

    class Config:
        from_attributes = True

class CategoryInDB(CategoryBase):
    id: int

    class Config:
        from_attributes = True
