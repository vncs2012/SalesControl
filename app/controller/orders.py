from db.hashing import Hash
from app.model.orders import Orders
from app.model.client import Client
from app.model import user

class ControllerOrder:
    _model = None
    
    def __init__(self) -> None:
        self._model = Orders()
    
    def get_all(self):
        list = self._model.fetch_all()
        day = self._model.get_day_sale()
        week = self._model.get_week_sale()
        month = self._model.get_month_sale()
        return {'list': list, 'day': day, 'week': week, 'month': month}

    def insert_controller(self,request, authorization):
        username = user.get_user(authorization)
        return self._model.insert(request,username)

    def delete_controller(self,id: int) -> dict:
        return self._model.delete(id)

    def find_controller(self,id:int):
        return self._model.find(id)

    def get_select():
        client = Client()
        product = []
        return {'client': client.get_select(), 'product': product}

    def update_controller(self,id, request):
        user_object = request
        if not user_object.password:
            hashed_pass = Hash.bcrypt(user_object.password)
            user_object.password = hashed_pass
        return self._model.update(user_object, id)
