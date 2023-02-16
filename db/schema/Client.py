from pydantic import BaseModel

class Schema_Client(BaseModel):
    no_client: str = None
    tp_sex: str = None
    nu_document: str = None
    email: str = None
    nu_contact: str = None
    address: str = None