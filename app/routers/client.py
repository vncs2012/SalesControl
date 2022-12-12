from app.controller import client as controller
from fastapi import APIRouter,Header
from typing import List, Union
from app.model.client import Client_schema

router = APIRouter(prefix="/client",tags=["client"],)

@router.get('')
def fetch_all_search(username: str = None,email: str = None):
    return controller.get_all()

@router.post('')
def register_orders(request:Client_schema,Authorization: Union[List[str], None] = Header(default=None)):
    return controller.insert_controller(request)

@router.delete('/{id}')
def delete(id: int):
    return controller.delete_controller(id)

@router.get('/{id}')
def find(id: int):
    return controller.find_controller(id)

@router.patch('/{id}')
def update(id: int,request:Client_schema):
    return controller.update_controller(id,request)