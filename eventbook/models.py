from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    wallet = models.DecimalField(max_digits=8, decimal_places=2, null=True)
    pass

class Event(models.Model):
    title = models.CharField(max_length=255)
    start_time = models.DateTimeField()
    description = models.TextField(max_length=800, null=True)
    location = models.CharField(max_length=255)
    image_url = models.URLField(max_length=200)
    privacy = models.CharField(max_length=20)
    organizer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='organized_events')
    interested_guests = models.ManyToManyField(User, related_name="interested_guest", blank=True)
    going_guests = models.ManyToManyField(User, related_name="going_guests", blank=True)

    def serialize(self):
        return {
        'id': self.id,
        'title': self.title, 
        'start_time': self.start_time.strftime("%a, %b %d %Y, %I:%M %p"),
        'description': self.description,
        'location': self.location,
        'image_url': self.image_url,
        'privacy': self.privacy,
        'organizer': self.organizer.username,
        'interested_guests': [guest.username for guest in self.interested_guests.all()],
        'going_guests': [guest.username for guest in self.going_guests.all()]
    }


class Ticket(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='tickets')
    ticket_price = models.DecimalField(max_digits=8, decimal_places=2, null=True)
    ticket_type = models.CharField(max_length=100)
    purchaser = models.ForeignKey(User, on_delete=models.CASCADE, related_name='purchased_tickets')


class Review(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='reviews')
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='event_reviews')
    content = models.TextField()
    rating = models.PositiveIntegerField()
    review_date = models.DateTimeField()

class Comment(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE,  related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='event_comments')
    content = models.TextField()
    comment_date = models.DateTimeField(auto_now_add=True)
    
    def serialize(self):
        return {
            'id': self.id,
            'event': self.event.id,
            'user': self.user.username,
            'content': self.content,
            'comment_date': self.comment_date.strftime("%a, %b %d %Y, %I:%M %p"),
        }