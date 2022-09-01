from django.contrib import admin

from .models import Order


# Register your models here.
class OrderFilter(admin.ModelAdmin):
    list_filter = ("transaction_id", "user")
    list_display = ("transaction_id", "user")


admin.site.register(Order,OrderFilter)
