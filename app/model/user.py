from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, Text
from db.connection import DBConnectionHandler
from db.oauth import get_current_user
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

def update(data, id) -> int:
    with DBConnectionHandler() as db:
        user = db.session.query(User).filter(User.id_user == id).first()
        user.email = data.email
        user.username = data.username
        user.password = user.password if data.password else data.password
        db.save(user)
    return {"status": 201, "id": user.id_user}

def fetch(data) -> User:
    with DBConnectionHandler() as db:
        user = db.session.query(User).filter(User.username == data.username).first()
    return user

def fetch_all() ->User:
    with DBConnectionHandler() as db:
        users = db.session.query(User).order_by(User.id_user).all()
    return users

def delete_user(id: int) -> dict:
    with DBConnectionHandler() as db:
        try:
            user = db.session.query(User).filter(User.id_user == id).first()
            db.delete(user)
            return {'status': 200}
        except:
            return {'status': 404, 'message': 'Erro ao tentar Deletar'}

def find_user(id: int) -> User:
    with DBConnectionHandler() as db:
        user = db.session.query(User).filter(User.id_user == id).first()
        if user:
            return {'status': 200, 'register': user}
    return {'status': 404, 'message': 'Usuario não encontrado...'}

def fetch_filter(username, email) -> User:
    with DBConnectionHandler() as db:
        if email and username:
            return db.session.query(User).filter(User.username.ilike(f'%{username}%'), User.email.ilike(f'%{email}%')).all()

        if email:
            return db.session.query(User).filter(User.email.ilike(f'%{email}%')).all()

        if username:
            return db.session.query(User).filter(User.username.ilike(f'%{username}%')).all()

def get_user(token) -> int:
    if token:
        token =token[0][6:]
        username = get_current_user(token)
        user = fetch(username)
        return user.id_user