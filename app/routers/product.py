from fastapi import APIRouter, Header
from db.schema.product import Schema_Product
from app.controller.product import ControllerProduct

router = APIRouter(prefix="/product", tags=["products"],)
controller = ControllerProduct()

@router.get("")
async def read_products():
    return await controller.get_products()

@router.get('/{product_id}')
def find_products(product_id: int):
    return controller.find(product_id)

@router.post("")
async def create_product_route( product: Schema_Product):
    return await controller.create_product(product)

@router.put("/{product_id}")
async def update_product_route(product_id: int, product: Schema_Product):
    return await controller.update_product(product_id, product)

@router.delete("/{product_id}")
async def delete_product_route(product_id: int):
    return await controller.delete_product(product_id)
