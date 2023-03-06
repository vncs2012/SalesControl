
from fastapi import FastAPI, Depends
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from app.controller import user as UserController
from app.controller import home as homeController
from app.routers import user, RouterOrder, client ,product

app = FastAPI(
    title="Backend Pizzaria",
    version="0.1.0",
    description="",
    )
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

orders = RouterOrder()
app.include_router(orders.router)
app.include_router(user.router)
app.include_router(client.router)
app.include_router(product.router)

@app.get("/")
def home():
	return homeController.get_home()

@app.post('/login')
def login(request:OAuth2PasswordRequestForm = Depends()):
    return UserController.login(request)