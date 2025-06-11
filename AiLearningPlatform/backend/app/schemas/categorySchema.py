from pydantic import BaseModel
from typing import Optional

class CategoryBase(BaseModel):
    name: str
   
class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(BaseModel):
    name: Optional[str] = None

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
