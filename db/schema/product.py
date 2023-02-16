from pydantic import BaseModel

class Schema_Product(BaseModel):
    name: str
    description: str
    price: float
    price_edge: float