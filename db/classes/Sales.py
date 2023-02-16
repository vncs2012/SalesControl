from sqlalchemy import Column, Integer, Boolean, Numeric, TIMESTAMP
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