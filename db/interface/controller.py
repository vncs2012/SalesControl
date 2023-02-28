from abc import ABC, abstractmethod
from typing import List, Union
from fastapi import Header


class Controller(ABC):

    @abstractmethod
    def get_all(self):
        ...

    @abstractmethod
    def insert_controller(self, request: classmethod, authorization: Union[List[str], None] = Header(default=None)) -> dict:
        ...

    @abstractmethod
    def delete_controller(self, id: int) -> dict:
        ...

    @abstractmethod
    def find_controller(self, id: int) -> classmethod:
        ...

    @abstractmethod
    def get_select(self) -> dict:
        ...

    @abstractmethod
    def update_controller(self, id: int, request: dict):
        ...
