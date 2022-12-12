from sqlalchemy import Column, Integer, Boolean, Numeric, TIMESTAMP, Date, cast
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from db.connection import DBConnectionHandler
from pydantic import BaseModel
import datetime

Base = declarative_base()
class Orders_schema(BaseModel):
    nu_value: float


class Sales(Base):
    __tablename__ = 'sales'
    __table_args__ = {'schema': 'sales'}
    id_sales = Column(Integer, primary_key=True, nullable=False)
    nu_value = Column(Numeric)
    dt_sale = Column(TIMESTAMP)
    nu_portion = Column(Integer)
    id_user = Column(Integer)
    bo_paid = Column(Boolean)


def insert(data, id_user) -> int:
    print('insert',data)
    with DBConnectionHandler() as db:
        sales = Sales(
            nu_value=data.nu_value,
            dt_sale=str(datetime.datetime.now()),
            id_user=id_user)
        db.save(sales)
    return {"status": 201, "id": sales.id_sales}


def update(data, id) -> int:
    with DBConnectionHandler() as db:
        user = db.session.query(Sales).filter(Sales.id_sales == id).first()
        user.email = data.email
        user.username = data.username
        user.password = user.password if data.password else data.password
        db.save(user)
    return {"status": 201, "id": user.id_user}


def fetch(data) -> Sales:
    with DBConnectionHandler() as db:
        user = db.session.query(Sales).filter(
            Sales.username == data.username).first()
    return user
 
def fetch_all() -> Sales:
    with DBConnectionHandler() as db:
        registros = db.session.query(Sales).order_by(Sales.id_sales).all()
    return registros


def delete(id: int) -> dict:
    with DBConnectionHandler() as db:
        try:
            registro = db.session.query(Sales).filter(
                Sales.id_sales == id).first()
            db.delete(registro)
            return {'status': 200}
        except:
            return {'status': 404, 'message': 'Erro ao tentar Deletar'}


def find(id: int) -> Sales:
    with DBConnectionHandler() as db:
        registro = db.session.query(Sales).filter(Sales.id_sales == id).first()
        if registro:
            return {'status': 200, 'register': registro}
    return {'status': 404, 'message': 'Usuario não encontrado...'}

def fetch_filter(username, email) -> Sales:
    with DBConnectionHandler() as db:
       ...

def get_day_sale():
    with DBConnectionHandler() as db:
        today = datetime.date.today()
        day = db.session.query(func.sum(Sales.nu_value).label("total")).filter(cast(Sales.dt_sale,Date) == today).first()
    return {'total':day.total,'date':today}

def get_week_sale():
    with DBConnectionHandler() as db:
        week_today = (datetime.date.today() - datetime.timedelta(days=7))
        today = datetime.date.today()
        week = db.session.query(func.sum(Sales.nu_value).label("total")).filter(cast(Sales.dt_sale,Date) >= week_today,cast(Sales.dt_sale,Date) <= today).first()
    return {'total':week.total}

def get_month_sale():
    with DBConnectionHandler() as db:
        month_today = (datetime.date.today() - datetime.timedelta(days=30))
        today = datetime.date.today()
        month_today = db.session.query(func.sum(Sales.nu_value).label("total")).filter(cast(Sales.dt_sale,Date) >= month_today,cast(Sales.dt_sale,Date) <= today).first()
    return {'total':month_today.total}