from sqlalchemy import Column, Integer, Boolean, Numeric, TIMESTAMP,Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Sales(Base):
    __tablename__ = 'sales'
    __table_args__ = {'schema': 'sales'}
    id_sales = Column(Integer, primary_key=True, nullable=False)
    nu_value = Column(Numeric)
    dt_sale = Column(TIMESTAMP)
    nu_portion = Column(Integer)
    id_user = Column(Integer)
    bo_paid = Column(Boolean)
    id_client = Column(Integer)


class Items(Base):
    __tablename__ = 'items'
    __table_args__ = {'schema': 'sales'}
    id_items= Column(Integer, primary_key=True, nullable=False)
    id_sales= Column(Integer, nullable=False)
    id_product= Column(Integer, nullable=False)
    bo_border = Column(Boolean)
    purchase_quantity = Column(Integer)
    description = Column(Text)
