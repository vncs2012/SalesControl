from fastapi import FastAPI, Depends
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware

from app.model.login import User,Login
from app.controller import  login as login_sistema,create_user

app = FastAPI()
origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def home():
    return {"message": "Hello World"}

@app.post('/register')
async def register_user(request:User):
    return create_user(request)

@app.post('/login',response_model=Login)
async def login(request:OAuth2PasswordRequestForm = Depends()):
    return login_sistema(request)