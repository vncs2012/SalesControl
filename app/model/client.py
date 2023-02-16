from db.connection import DBConnectionHandler
from db.classes.Client import Client as Customers
from db.schema.Client import Schema_Client

class Client:
    db= None
    
    def __init__(self) -> None:
        if not self.db:
            with DBConnectionHandler() as db:
                self.db = db

    def insert(self,data) -> int:
        client = Customers(
            no_client=data.no_client,
            tp_sex=data.tp_sex,
            email=data.email,
            nu_document=data.nu_document,
            nu_contact=data.nu_contact,
            address=data.address
        )
        self.db.save(client)
        return {"status": 201, "id": client.id_client}

    def update(self,data, id) -> int:
        client = self.db.session.query(Customers).filter(Customers.id_client == id).first()
        client.no_client = data.no_client
        client.tp_sex = data.tp_sex
        client.email = data.email
        client.nu_document = data.nu_document
        client.nu_contact = data.nu_contact
        client.address = data.address
        self.db.save(client)
        return {"status": 201, "id": client.id_client}

    def fetch(self,data) -> Customers:
        user = self.db.session.query(Customers).filter(
            Customers.username == data.username).first()
        return user

    def fetch_all(self) -> Customers:
        registros = self.db.session.query(Customers).order_by(Customers.id_client).all()
        return registros


    def delete(self,id: int) -> dict:
        try:
            registro = self.db.session.query(Customers).filter(Client.id_client == id).first()
            self.db.delete(registro)
            return {'status': 200}
        except:
            return {'status': 404, 'message': 'Erro ao tentar Deletar'}

    def find(self,id: int) -> Customers:
        registro = self.db.session.query(Customers).filter(
            Customers.id_client == id).first()
        if registro:
            return {'status': 200, 'register': registro}
        return {'status': 404, 'message': 'Usuario não encontrado...'}

    def fetch_filter(self,request: Schema_Client) -> Customers:
        if request.nu_document and request.no_client:
            return self.db.session.query(Customers).filter(Customers.no_client.ilike(f'%{request.no_client}%'), Client.nu_document == request.nu_document).all()

        if request.no_client:
            return self.db.session.query(Customers).filter(Customers.no_client.ilike(f'%{request.no_client}%')).all()

        if request.nu_document:
            return self.db.session.query(Customers).filter(Customers.nu_document == request.nu_document).all()

    def get_select(self) -> Customers :
        return self.fetch_all()
