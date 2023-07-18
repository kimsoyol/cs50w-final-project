
from datetime import datetime
from django.utils import timezone
from .models import Event

def format_datetime(date, time):
    datetime_str = f"{date} {time}"
    start_time = datetime.strptime(datetime_str, "%Y-%m-%d %I:%M %p")
    start_time_aware = timezone.make_aware(start_time)
    return start_time_aware

def total_people(event_id):
    event = Event.objects.get(id=event_id)
    # Get the IDs of users
    interested_guests = event.interested_guests.values_list('id', flat=True)
    going_guests = event.going_guests.values_list('id', flat=True)
    # Combine the lists and remove duplicates
    all_guests = set(interested_guests) | set(going_guests)
    # Return Total 
    return (len(all_guests))