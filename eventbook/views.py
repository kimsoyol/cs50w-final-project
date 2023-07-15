import json
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.db import IntegrityError
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render
from django.urls import reverse
from django.http import JsonResponse
from .models import User, Event, Comment

from .util import format_datetime

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "eventbook/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "eventbook/login.html")
    

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("login"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "eventbook/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "eventbook/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "eventbook/register.html")

def index(request):
    return render(request, "eventbook/index.html")

def events(request):
    events = Event.objects.all().order_by('start_time')

    return JsonResponse([event.serialize() for event in events], safe=False)

@csrf_exempt
@login_required
def create_event(request):
       
    # Adding a new event must be via POST
    if request.method == "POST":
        event_data = json.loads(request.body)
        data = event_data.get("event")
        event = Event(
            title = data['title'],
            start_time = format_datetime(data['start_date'],data['start_time']),
            description = data['description'],
            location = data['location'],
            image_url = data['image_url'],
            privacy = data['privacy'],
            organizer = request.user,
            going_guests = request.user,
        )
        event.save()
        return JsonResponse({"message": 'SUCCESSFUL.'}, status=201)
    else:
        return JsonResponse({'error': 'Invalid request method'})


def event_details(request, id):
    event = Event.objects.get(id=id)
    total = event.going_guests.count() + event.interested_guests.count()
    return render(request, 'eventbook/event_details.html', {
        'event': event.serialize(),
        'total': total
    })

@csrf_exempt
@login_required
def comment(request, id):
    event = Event.objects.get(id=id)
    if request.method == "POST":
        comment_data = json.loads(request.body)
        data = comment_data.get("comment")
        print(data)
        comment = Comment(
            event = event,
            user = request.user,
            content = data
        )
        comment.save()
    comments = event.comments.all().order_by('-comment_date')
    return JsonResponse([comment.serialize() for comment in comments]
    , safe=False)


@csrf_exempt
@login_required
def interested(request, id):
    event = Event.objects.get(id=id)
    if request.method == "PUT":
        status_data = json.loads(request.body)
        data = status_data.get("status")
        if data == 'add':
            event.interested_guests.add(request.user)
        else:
            event.interested_guests.remove(request.user)
        event.save()
        
    return JsonResponse({'message': 'SUCCESS'}, status=201)