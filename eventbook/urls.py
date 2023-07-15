from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name='index'),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("create_event", views.create_event, name="create_event"),

    # API Routes
    path("events", views.events, name='events'),
    path("comment/<int:id>", views.comment, name='comment'),
    path("event_details/<int:id>", views.event_details, name='event_details'),
    path("interested/<int:id>", views.interested, name='interested'),
]
