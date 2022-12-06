from fastapi import APIRouter
from app.controller import user as userController
from app.model.user import User_schema

router = APIRouter(prefix="/user",tags=["Users"],)
@router.get('')
def user_fetch_all_search(username: str = None,email: str = None):
    return userController.get_users(username,email)

@router.post('')
def register_user(request:User_schema):
    return userController.create_user(request)

@router.delete('/{id}')
def delete_user(id: int):
    return userController.user_delete(id)

@router.get('/{id}')
def find_user(id: int):
    return userController.user_find(id)

@router.patch('/{id}')
def update_user(id: int,request:User_schema):
    return userController.user_update(id,request)