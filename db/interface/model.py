from abc import ABC, abstractmethod

class Model(ABC):

    @abstractmethod
    def insert(self) -> dict:
        ...

    @abstractmethod
    def update(self, data: dict, id: int) -> dict:
        ...

    @abstractmethod
    def fetch(self, id: int | dict) -> classmethod:
        ...

    @abstractmethod
    def fetch_all(self) -> classmethod:
        ...

    @abstractmethod
    def delete(self, id: int) -> dict:
        ...

    @abstractmethod
    def find(self, id: int) -> classmethod:
        ...

    @abstractmethod
    def process_data(self) -> None:
        ...

    @abstractmethod
    def select(self) -> dict:
        ...
