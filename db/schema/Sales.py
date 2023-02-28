from pydantic import BaseModel
from typing import List, Union


class SchemaItems(BaseModel):
    id_sales: int | None
    id_product: int
    bo_border: bool = None
    purchase_quantity: int
    description: str | None

class schema_sales(BaseModel):
    nu_value: float | None
    id_client: int
    delivery: bool = None
    items: List[SchemaItems]
