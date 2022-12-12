from db.hashing import Hash
from app.model.orders import insert, fetch_all, delete, find, update, fetch_filter, get_day_sale, get_week_sale, get_month_sale
from app.model import user


def get_all():
    list = fetch_all()
    day = get_day_sale()
    week = get_week_sale()
    month = get_month_sale()
    return {'list': list, 'day': day, 'week': week, 'month': month}


def insert_controller(request, authorization):
    username = user.get_user(authorization)
    return insert(request,username)

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
