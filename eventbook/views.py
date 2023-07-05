from django.shortcuts import render
from django.http import JsonResponse
from .models import User, Event

# Create your views here.
def index(request):
    return render(request, "eventbook/index.html")

def events(request):
    events = Event.objects.all().order_by('start_time')

    return JsonResponse([event.serialize() for event in events], safe=False)