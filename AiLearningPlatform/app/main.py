from fastapi import FastAPI
from app.routers import userRouter,categoryRouter,subCategoryRouter, promptRouter
from app.db.database import Base, engine

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(userRouter.router)
app.include_router(categoryRouter.router)
app.include_router(subCategoryRouter.router)
app.include_router(promptRouter.router)
