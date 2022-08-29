from django.contrib import admin
from .models import Product


# Register your models here.

class ProductAdmin(admin.ModelAdmin):
    list_filter = ('name', 'category',)
    list_display = ('name', 'category', 'created_at', 'updated_at',)


admin.site.register(Product, ProductAdmin)
