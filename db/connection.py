from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


class DBConnectionHandler():
    def __init__(self, user='postgres', password='%40postgres', local='localhost', database='postgres',) -> None:
        self.__connection_string = f'postgresql://{user}:{password}@{local}:5433/{database}'
        self.__engine = self.__create_database_engine()
        self.session = None

    def __create_database_engine(self):
        engine = create_engine(self.__connection_string)
        return engine

    def get_engine(self):
        return self.__engine

    def __enter__(self):
        session_make = sessionmaker(bind=self.__engine)
        self.session = session_make()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.session.close()

    def save(self, inserir):
        self.session.add(inserir)
        self.session.commit()
        self.session.refresh(inserir)  
        
    def save_all(self, inserir):
        self.session.add_all(inserir)
        self.session.commit()
        
    def save_sem_refresh(self, inserir):
        self.session.add(inserir)
        self.session.commit()
        
    def delete(self,objeto):
        self.session.delete(objeto)
        self.session.commit()