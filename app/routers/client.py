from app.controller.client import ControllerClient 
from fastapi import APIRouter,Header
from typing import List, Union
from db.schema.Client import Schema_Client

router = APIRouter(prefix="/client",tags=["client"],)
controller = ControllerClient()

@router.get('')
def fetch_all_search(nu_document: str = None,no_client: str = None):
    if(nu_document or no_client):
        return controller.get_search(nu_document,no_client)
    return controller.get_all()

@router.post('')
def register_orders(request:Schema_Client,Authorization: Union[List[str], None] = Header(default=None)):
    return controller.insert_controller(request)

@router.delete('/{id}')
def delete(id: int):
    return controller.delete_controller(id)

@router.get('/{id}')
def find(id: int):
    return controller.find_controller(id)

@router.patch('/{id}')
def update(id: int,request:Schema_Client):
    return controller.update_controller(id,request)