from db.schema.Sales import schema_sales,SchemaItems
from db.connection import DBConnectionHandler
from db.classes.Sales import Sales, Items
from app.model.product import Product
from db.classes.Client import Client
from db.interface.model import Model
from sqlalchemy import Date, cast
from sqlalchemy.sql import func
import calendar
import datetime

class Orders(Model):
    db: DBConnectionHandler = None
    _data: schema_sales = None
    _id_user: int = None
    _sales: Sales
    _sales_items: list[Items] = []
    
    def __init__(self) -> None:
        if not self.db:
            with DBConnectionHandler() as db:
                self.db = db
     
    def set_username(self, username: int) -> None:
        self._id_user = username

    def set_values(self, data: schema_sales) -> None:
        self._data = data

    def insert(self) -> dict:
        self.db.save(self._sales)
        for items in self._sales_items:
            items.id_sales = self._sales.id_sales
        self.db.save_all(self._sales_items)
        return {"status": 201, "id": self._sales.id_sales}

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
        registro = self.db.session.query(Sales, Client)\
            .join(Client, Client.id_client == Sales.id_client, isouter=True)\
            .filter(Sales.id_sales == id).first()
        if registro:
            return {'status': 200, 'register': registro}
        return {'status': 404, 'message': 'Compra não encontrado...'}

    def get_day_sale(self)-> dict:
        today = datetime.date.today()
        day = self.db.session.query(func.sum(Sales.nu_value).label("total")).filter(cast(Sales.dt_sale,Date) == today).first()
        return {'total':day.total,'date':today}

    def get_week_sale(self)-> dict:
        today = datetime.date.today()
        week_init = today - datetime.timedelta(days=today.weekday())
        week_end = week_init + datetime.timedelta(days=6)
        week =self. db.session.query(func.sum(Sales.nu_value).label("total")).filter(cast(Sales.dt_sale,Date) >= week_init,cast(Sales.dt_sale,Date) <= week_end).first()
        return {'total':week.total}

    def get_month_sale(self) -> dict:
        today = datetime.date.today()
        one_day_month = today.replace(day=1)
        last_day_month = today.replace(day=calendar.monthrange(today.year, today.month)[1])
        month_today = self.db.session.query(func.sum(Sales.nu_value).label("total")).filter(cast(Sales.dt_sale,Date) >= one_day_month,cast(Sales.dt_sale,Date) <= last_day_month).first()
        return {'total':month_today.total}

    def select(self):
        ...

    def process_data(self) -> None:
        data = self._data
        nu_value = 0
       
        for item in self._data.items:
            nu_value += self.calc_value_orders(item)
            self._sales_items.append(Items(**item.__dict__))

        nu_value += 5 if data.delivery else 0
        self._sales = Sales(nu_value=nu_value, dt_sale=str(datetime.datetime.now()), id_user=20, id_client=data.id_client,)
        
    def calc_value_orders(self,item:SchemaItems)->float:
        product = Product()
        data_product = product.fetch(item.id_product)
        return (data_product.price * item.purchase_quantity) + (data_product.price_edge * item.purchase_quantity if item.bo_border == True else 0)
