
from datetime import datetime
from django.utils import timezone

def format_datetime(date, time):
    datetime_str = f"{date} {time}"
    start_time = datetime.strptime(datetime_str, "%Y-%m-%d %I:%M %p")
    start_time_aware = timezone.make_aware(start_time)
    return start_time_aware