from fastapi import FastAPI, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from db.oauth import get_current_user

from app.model.user import User_schema, Login
from app.controller import login as login_sistema, create_user, get_users, user_delete,user_find

app = FastAPI()
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home(current_user:User_schema = Depends(get_current_user)):
	return {"data":"Hello OWrld"}

@app.post('/login')
def login(request:OAuth2PasswordRequestForm = Depends()):
    return login_sistema(request)

@app.get('/user')
def user_fetch_all():
    return get_users()

@app.post('/user')
def register_user(request:User_schema):
    return create_user(request)

@app.delete('/user/{id}')
def delete_user(id: int):
    return user_delete(id)

@app.get('/user/{id}')
def find_user(id: int):
    return user_find(id)
