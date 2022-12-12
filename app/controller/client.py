from db.hashing import Hash
from app.model.client import insert, fetch_all, delete, find, update, fetch_filter
from app.model import user


def get_all():
    return fetch_all()

def insert_controller(request):
    return insert(request)

def delete_controller(id: int) -> dict:
    return delete(id)

def find_controller(id:int):
    return find(id)

def update_controller(id, request):
    user_object = request
    if not user_object.password:
        hashed_pass = Hash.bcrypt(user_object.password)
        user_object.password = hashed_pass
    return update(user_object, id)
