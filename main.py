from fastapi import FastAPI, Depends
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from db.oauth import get_current_user

from app.model.login import User,Login
from app.controller import  login as login_sistema,create_user

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
def home(current_user:User = Depends(get_current_user)):
	return {"data":"Hello OWrld"}

@app.post('/register')
def register_user(request:User):
    return create_user(request)

@app.post('/login')
def login(request:OAuth2PasswordRequestForm = Depends()):
    return login_sistema(request)