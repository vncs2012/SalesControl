from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, Text
from db.connection import DBConnectionHandler
from pydantic import BaseModel
from typing import Optional

Base = declarative_base()


class User_schema(BaseModel):
    username: str
    password: str
    email: str

class Login(BaseModel):
	username: str
	password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    
class TokenData(BaseModel):
    username: Optional[str] = None


class User(Base):
    __tablename__ = 'user'
    __table_args__ = {'schema': 'sales'}
    id_user = Column(Integer, primary_key=True, nullable=False)
    username = Column(Text)
    password = Column(Text)
    email = Column(Text)

def insert(data) -> int:
    with DBConnectionHandler() as db:
        user = User(username=data.username,
                    password=data.password, email=data.email)
        db.save(user)
    return user.id_user

def fetch(data) -> User:
    with DBConnectionHandler() as db:
        user = db.session.query(User).filter(User.username == data.username).first()
    return user
