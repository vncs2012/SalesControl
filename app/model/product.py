from db.connection import DBConnectionHandler
from db.classes.product import Product as Products

class Product:
    db= None
    
    def __init__(self) -> None:
        if not self.db:
            with DBConnectionHandler() as db:
                self.db = db
                
    def insert(self,data) -> int:
        product = Products(**data)
        self.db.save(product)
        return {"status": 201, "id": product.id}

    def update(self,data, id_product) -> int:
        try:
            self.db.session.query(Products).filter_by(id = id_product).update(data)
            self.db.commit()
            return {"status": 201, "id":id_product} 
        except Exception as e:
            self.db.session.rollback()
            print("Erro ao atualizar o registro:", e)
            
    def fetch(self,data) -> Products:
        product = self.db.session.query(Products).filter(Products.id == data.id).first()
        return product

    def fetch_all(self) -> Products:
        registros = self.db.session.query(Products).order_by(Products.id).all()
        return registros

    def delete(self,id: int) -> dict:
        try:
            registro = self.db.session.query(Products).filter(Products.id == id).first()
            self.db.delete(registro)
            return {'status': 200}
        except:
            return {'status': 404, 'message': 'Erro ao tentar Deletar'}

    def find(self,id: int) -> Products:
        registro = self.db.session.query(Products).filter(Products.id == id).first()
        if registro:
            return {'status': 200, 'register': registro}
        return {'status': 404, 'message': 'Usuario não encontrado...'}

    def fetch_filter(request: Products) -> Products:
        ...
            # if request.nu_document and request.no_client:
            #     return db.session.query(Products).filter(Products.no_client.ilike(f'%{request.no_client}%'), Products.nu_document == request.nu_document).all()

            # if request.no_client:
            #     return db.session.query(Products).filter(Products.no_client.ilike(f'%{request.no_client}%')).all()

            # if request.nu_document:
            #     return db.session.query(Products).filter(Products.nu_document == request.nu_document).all()

    def get_select(self) -> Products:
        return self.fetch_all()