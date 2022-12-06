from fastapi import HTTPException,status
from db.jwttoken import create_access_token
from db.oauth import get_current_user
from db.hashing import Hash
from app.model.user import insert, fetch, fetch_all, delete_user, find_user, update, fetch_filter


def login(request):
    user = fetch(request)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail = f'No user found with this {request.username} username')
    if not Hash.verify(user.password,request.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail = f'Wrong Username or password')
    access_token = create_access_token(data={"sub": request.username })
    return {"access_token": access_token, "token_type": "bearer"}

def create_user(request):
    hashed_pass = Hash.bcrypt(request.password)
    user_object = request
    user_object.password = hashed_pass
    retorno = insert(user_object)
    return {"status": 201, "id": retorno}


def get_users(username, email):
    if username or email:
       return fetch_filter(username, email)
    return fetch_all()


def user_delete(id: int) -> dict:
    return delete_user(id)

def user_find(id:int):
    return find_user(id)


def user_update(id, request):
    user_object = request
    print(user_object)
    if not user_object.password:
        hashed_pass = Hash.bcrypt(user_object.password)
        user_object.password = hashed_pass
    return update(user_object, id)
