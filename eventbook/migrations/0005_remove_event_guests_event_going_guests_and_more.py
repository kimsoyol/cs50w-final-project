# Generated by Django 4.2.3 on 2023-07-05 16:34

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('eventbook', '0004_remove_user_events_event_guests'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='guests',
        ),
        migrations.AddField(
            model_name='event',
            name='going_guests',
            field=models.ManyToManyField(blank=True, related_name='going_guests', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='event',
            name='interested_guests',
            field=models.ManyToManyField(blank=True, related_name='interested_guest', to=settings.AUTH_USER_MODEL),
        ),
    ]
