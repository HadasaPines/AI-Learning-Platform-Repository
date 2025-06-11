from pydantic import BaseModel
from typing import Optional

class PromptBase(BaseModel):
    user_id: int
    prompt: str
    category_id: int
    sub_category_id: Optional[int] = None
    response: Optional[str] = None

class PromptCreate(PromptBase):
    pass
class PromptUpdate(BaseModel):
    user_id: Optional[int] = None
    prompt: Optional[str] = None
    category_id: Optional[int] = None
    sub_category_id: Optional[Optional[int]] = None
    
class PromptInDB(PromptBase):
    id: int

    class Config:
        from_attributes = True  