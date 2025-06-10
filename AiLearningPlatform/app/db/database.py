from databases import Database
from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import declarative_base

DATABASE_URL = "postgresql://postgres:Dp7420019@localhost:5432/AI_Learning_DB"

database = Database(DATABASE_URL)
engine = create_engine(DATABASE_URL)
metadata = MetaData()
Base = declarative_base()
