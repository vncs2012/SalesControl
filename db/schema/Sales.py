from pydantic import BaseModel

class schema_sales(BaseModel):
    nu_value: float
    id_client: int = None