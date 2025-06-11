from fastapi import FastAPI
from app.routers import userRouter,categoryRouter,subCategoryRouter, promptRouter
from app.db.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


app.include_router(userRouter.router)
app.include_router(categoryRouter.router)
app.include_router(subCategoryRouter.router)
app.include_router(promptRouter.router)
