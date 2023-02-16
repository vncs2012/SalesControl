from db.connection import DBConnectionHandler
from db.classes.Client import Client
from db.classes.Sales import Sales
from sqlalchemy import Date, cast
from sqlalchemy.sql import func
import datetime

class Orders:
    db = None
    
    def __init__(self) -> None:
        if not self.db:
            with DBConnectionHandler() as db:
                self.db = db
     
    def insert(self,data, id_user) -> int:
        sales = Sales(
            nu_value=data.nu_value,
            dt_sale=str(datetime.datetime.now()),
            id_user=id_user,
            id_client=data.id_client,
            )
        self.db.save(sales)
        return {"status": 201, "id": sales.id_sales}

    def update(self,data, id) -> int:
        with DBConnectionHandler() as db:
            user = db.session.query(Sales).filter(Sales.id_sales == id).first()
            user.email = data.email
            user.username = data.username
            user.password = user.password if data.password else data.password
            db.save(user)
        return {"status": 201, "id": user.id_user}

    def fetch(self,data) -> Sales:
        user = self.db.session.query(Sales).filter(Sales.username == data.username).first()
        return user
    
    def fetch_all(self) -> Sales:
        registros = self.db.session.query(Sales, Client).join( Client, Client.id_client == Sales.id_client, isouter=True).order_by(Sales.id_sales.desc()).limit(100).all()
        return registros

    def delete(self,id: int) -> dict:
        try:
            registro = self.db.session.query(Sales).filter(
                Sales.id_sales == id).first()
            self.db.delete(registro)
            return {'status': 200}
        except:
            return {'status': 404, 'message': 'Erro ao tentar Deletar'}

    def find(self,id: int) -> Sales:
        registro = self.db.session.query(Sales, Client).join( Client, Client.id_client == Sales.id_client, isouter=True).filter(Sales.id_sales == id).first()
        if registro:
            return {'status': 200, 'register': registro}
        return {'status': 404, 'message': 'Compra não encontrado...'}

    def get_day_sale(self):
        today = datetime.date.today()
        day = self.db.session.query(func.sum(Sales.nu_value).label("total")).filter(cast(Sales.dt_sale,Date) == today).first()
        return {'total':day.total,'date':today}

    def get_week_sale(self):
        week_today = (datetime.date.today() - datetime.timedelta(days=7))
        today = datetime.date.today()
        week =self. db.session.query(func.sum(Sales.nu_value).label("total")).filter(cast(Sales.dt_sale,Date) >= week_today,cast(Sales.dt_sale,Date) <= today).first()
        return {'total':week.total}

    def get_month_sale(self):
        month_today = (datetime.date.today() - datetime.timedelta(days=30))
        today = datetime.date.today()
        month_today = self.db.session.query(func.sum(Sales.nu_value).label("total")).filter(cast(Sales.dt_sale,Date) >= month_today,cast(Sales.dt_sale,Date) <= today).first()
        return {'total':month_today.total}

    def select(self):
        ...