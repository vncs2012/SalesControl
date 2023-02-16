from db.hashing import Hash
from app.model.orders import Orders

def get_home():
    model = Orders()
    day = model.get_day_sale()
    week = model.get_week_sale()
    month = model.get_month_sale()
    return {'day': day, 'week': week, 'month': month}
