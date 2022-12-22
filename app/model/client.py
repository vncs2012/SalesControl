from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, CHAR, Text
from db.connection import DBConnectionHandler
from pydantic import BaseModel

Base = declarative_base()


class Client_schema(BaseModel):
    no_client: str = None
    tp_sex: str = None
    nu_document: str = None
    email: str = None
    nu_contact: str = None
    address: str = None


class Client(Base):
    __tablename__ = 'client'
    __table_args__ = {'schema': 'client'}
    id_client = Column(Integer, primary_key=True, nullable=False)
    no_client = Column(Text)
    tp_sex = Column(Text)
    email = Column(Text)
    nu_document = Column(Text)
    nu_contact = Column(Text)
    address = Column(Text)


def insert(data) -> int:
    with DBConnectionHandler() as db:
        client = Client(
            no_client=data.no_client,
            tp_sex=data.tp_sex,
            email=data.email,
            nu_document=data.nu_document,
            nu_contact=data.nu_contact,
            address=data.address
        )
        db.save(client)
    return {"status": 201, "id": client.id_client}


def update(data, id) -> int:
    with DBConnectionHandler() as db:
        client = db.session.query(Client).filter(
            Client.id_client == id).first()
        client.no_client = data.no_client
        client.tp_sex = data.tp_sex
        client.email = data.email
        client.nu_document = data.nu_document
        client.nu_contact = data.nu_contact
        client.address = data.address
        db.save(client)
    return {"status": 201, "id": client.id_client}


def fetch(data) -> Client:
    with DBConnectionHandler() as db:
        user = db.session.query(Client).filter(
            Client.username == data.username).first()
    return user


def fetch_all() -> Client:
    with DBConnectionHandler() as db:
        registros = db.session.query(Client).order_by(Client.id_client).all()
    return registros


def delete(id: int) -> dict:
    with DBConnectionHandler() as db:
        try:
            registro = db.session.query(Client).filter(
                Client.id_client == id).first()
            db.delete(registro)
            return {'status': 200}
        except:
            return {'status': 404, 'message': 'Erro ao tentar Deletar'}


def find(id: int) -> Client:
    with DBConnectionHandler() as db:
        registro = db.session.query(Client).filter(
            Client.id_client == id).first()
        if registro:
            return {'status': 200, 'register': registro}
    return {'status': 404, 'message': 'Usuario não encontrado...'}


def fetch_filter(request: Client_schema) -> Client:
    with DBConnectionHandler() as db:
        if request.nu_document and request.no_client:
            return db.session.query(Client).filter(Client.no_client.ilike(f'%{request.no_client}%'), Client.nu_document == request.nu_document).all()

        if request.no_client:
            return db.session.query(Client).filter(Client.no_client.ilike(f'%{request.no_client}%')).all()

        if request.nu_document:
            return db.session.query(Client).filter(Client.nu_document == request.nu_document).all()

def get_select() -> Client :
    return fetch_all()
