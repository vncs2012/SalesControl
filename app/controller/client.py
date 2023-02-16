from app.model.client import Client
from db.schema.Client import Schema_Client

class ControllerClient:
    _model = None
    
    def __init__(self) -> None:
        self._model = Client()
    
    def get_all(self):
        return self._model.fetch_all()

    def get_search(self,nu_document, no_client):
        request = Schema_Client(nu_document=nu_document, no_client=no_client)
        return self._model.fetch_filter(request)

    def insert_controller(self,request):
        return self._model.insert(request)

    def delete_controller(self,id: int) -> dict:
        return self._model.delete(id)

    def find_controller(self,id:int):
        return self._model.find(id)

    def update_controller(self,id, request):
        return self._model.update(request, id)

    def select_controller(self):
        return self._model.get_select()
