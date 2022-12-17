from datetime import datetime, timedelta
from jose import JWTError, jwt
from app.model import user


SECRET_KEY = "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
