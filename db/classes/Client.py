from sqlalchemy import Column, Integer, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

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