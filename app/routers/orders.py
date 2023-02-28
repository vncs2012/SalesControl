from app.controller.orders import ControllerOrder
from db.schema.Sales import schema_sales as Orders_schema
from fastapi import APIRouter, Header
from typing import List, Union
from db.interface.router import Router

class RouterOrder(Router):

    def __init__(self):
        self.router = APIRouter(prefix="/orders", tags=["orders"],)
        self._controller = ControllerOrder()
        self.init_routers()

    def init_routers(self):
        self.router.add_api_route('', methods=["GET"], endpoint=self.fetch_all)
        self.router.add_api_route('/select', methods=["GET"], endpoint=self.fetch_select)
        self.router.add_api_route('', methods=["POST"], endpoint=self.register)
        self.router.add_api_route('/{id}', methods=["DELETE"], endpoint=self.delete)
        self.router.add_api_route('/{id}', methods=["GET"], endpoint=self.find)
        self.router.add_api_route('/{id}', methods=["PUT"], endpoint=self.update)

    def fetch_all(self):
        return self._controller.get_all()

    def fetch_select(self):
        return self._controller.get_select()

    def register(self, request: Orders_schema, Authorization: Union[List[str], None] = Header(default=None)):
        return self._controller.insert_controller(request, Authorization)

    def delete(self, id: int):
        return self._controller.delete_controller(id)

    def find(self, id: int):
        return self._controller.find_controller(id)

    def update(self, id: int, request: Orders_schema):
        return self._controller.update_controller(id, request)
