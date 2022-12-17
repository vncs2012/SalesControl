from db.hashing import Hash
from app.model.client import insert, fetch_all, delete, find, update, fetch_filter, Client_schema


def get_all():
    return fetch_all()


def get_search(nu_document, no_client):
    request = Client_schema(nu_document=nu_document, no_client=no_client)
    return fetch_filter(request)

def insert_controller(request):
    return insert(request)

def delete_controller(id: int) -> dict:
    return delete(id)

def find_controller(id:int):
    return find(id)

def update_controller(id, request):
    return update(request, id)
