from db.hashing import Hash
from app.model.orders import get_day_sale, get_week_sale, get_month_sale

def get_home():
    day = get_day_sale()
    week = get_week_sale()
    month = get_month_sale()
    return {'day': day, 'week': week, 'month': month}
