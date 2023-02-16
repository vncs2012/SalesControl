from db.hashing import Hash
from app.model.product import Product


class ControllerProduct:
    _model =None
    
    def __init__(self) -> None:
        self._model = Product()

    async def get_products(self):
        return self._model.fetch_all()

    async def create_product(self,product: Product)-> int :
        return self._model.insert(product.__dict__)

    async def find_product(self,product_id: int)-> Product :
        return self._model.find(product_id)

    async def update_product(self,product_id: int, product: Product):
        return self._model.update(product.__dict__, product_id)

    async def delete_product(self,product_id: int):
        return self._model.delete(product_id)