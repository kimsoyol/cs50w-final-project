# Generated by Django 4.2.3 on 2023-07-18 03:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('eventbook', '0006_remove_event_capacity'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ticket',
            name='event',
        ),
        migrations.RemoveField(
            model_name='ticket',
            name='purchaser',
        ),
        migrations.DeleteModel(
            name='Review',
        ),
        migrations.DeleteModel(
            name='Ticket',
        ),
    ]
