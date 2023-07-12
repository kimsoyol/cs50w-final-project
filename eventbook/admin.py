from django.contrib import admin
from .models import User, Event, Ticket, Review, Comment


class BaseAdmin(admin.ModelAdmin):
    def get_event(self, obj):
        return obj.event.title

    get_event.admin_order_field = 'event'
    get_event.admin_description = 'event'


class EventAdmin(BaseAdmin):
    list_display = ('id', 'organizer', 'title', 'start_time', 'privacy')
class TicketAdmin(BaseAdmin):
    list_display = ('get_event', 'ticket_price', 'ticket_type', 'purchaser')

class ReviewAdmin(BaseAdmin):
    list_display = ('get_event', 'reviewer', 'content', 'rating', 'review_date')

class CommentAdmin(BaseAdmin):
    list_display = ('get_event', 'user', 'content')

admin.site.register(User)
admin.site.register(Event, EventAdmin)
admin.site.register(Ticket, TicketAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(Comment, CommentAdmin)