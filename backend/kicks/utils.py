from datetime import datetime

from pytz import timezone

from backend.core.settings import settings


def to_formatted_tz(datetime: datetime):
    local_tz = timezone(settings.TIME_ZONE_NAME)
    return datetime.astimezone(local_tz).strftime("%I:%M %p, %d %b %Y")
