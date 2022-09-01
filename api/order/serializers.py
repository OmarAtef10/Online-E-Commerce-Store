from rest_framework import serializers

from .models import Order


class OrderSeralizer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Order
        fields = ("user", "product_names", "transaction_id", "total_amount", "created_at",)
