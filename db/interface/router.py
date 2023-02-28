from abc import ABC, abstractmethod
from typing import List, Union
from fastapi import Header


class Router(ABC):

    def fetch_all(self):
        ...

    def fetch_select(self):
        ...

    def register(self, request: classmethod, Authorization: Union[List[str], None] = Header(default=None)):
        ...

    def delete(self, id: int):
        ...

    def find(self, id: int):
        ...

    def update(self, id: int, request: classmethod):
        ...
