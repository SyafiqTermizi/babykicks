from datetime import datetime

from pytz import timezone


def to_formatted_kl_tz(datetime: datetime):
    kl = timezone("Asia/Kuala_Lumpur")
    return datetime.astimezone(kl).strftime("%I:%M %p, %d %b %Y")
