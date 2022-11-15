from fastapi import HTTPException,status
from db.jwttoken import create_access_token
from db.oauth import get_current_user
from db.hashing import Hash

def login(request):
    # user = db["users"].find_one({"username":request.username})
    # if not user:
    #     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail = f'No user found with this {request.username} username')
    # if not Hash.verify(user["password"],request.password):
    #     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail = f'Wrong Username or password')
    access_token = create_access_token(data={"sub": request.username })
    print(request.username)
    return {"access_token": access_token, "token_type": "bearer"}

def create_user(request):
    hashed_pass = Hash.bcrypt(request.password)
    user_object = dict(request)
    user_object["password"] = hashed_pass
    # user_id = db["users"].insert(user_object)
    print(user_object)
    return {"res":"created"}

