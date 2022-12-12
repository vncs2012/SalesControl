
from fastapi import FastAPI, Depends, Query
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from app.controller import user as UserController
from app.controller import home as homeController
from app.model.user import User_schema
from db.oauth import get_current_user
from typing import Union
from app.routers import user
from app.routers import orders
from app.routers import client
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

app.include_router(user.router)
app.include_router(orders.router)
app.include_router(client.router)

@app.get("/")
def home():
	return homeController.get_home()

@app.post('/login')
def login(request:OAuth2PasswordRequestForm = Depends()):
    return UserController.login(request)