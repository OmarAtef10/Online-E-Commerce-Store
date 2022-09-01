import json

from django.shortcuts import render
from rest_framework import viewsets
from django.http import JsonResponse
from .models import Order
from django.contrib.auth import get_user_model
from .serializers import OrderSeralizer
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers

# Create your views here.
from ..user.models import CustomUser


def validate_user_session(id, token):
    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(pk=id)
        if user.session_token == token:
            return True

        return False

    except UserModel.DeosNotExist:
        return False


@csrf_exempt
def add(request, id, token):
    if not validate_user_session(id, token):
        return JsonResponse({"Error": "Please login to use this feature!", "code": "69"})
    if request.method == "POST":
        transaction_id = request.POST["transaction_id"]
        products = request.POST["products"]
        amount = request.POST["amount"]
        total_product = len(products.split(',')[:-1])
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(pk=id)
        except UserModel.DeosNotExist:
            return JsonResponse({"Error": "User Doesn't Exist"})
        order = Order(user=user, product_names=products, total_products=total_product, transaction_id=transaction_id,
                      total_amount=float(amount))
        order.save()
        return JsonResponse(
            {"Success": "True", "Error": "False", "Message": f"Order Placed! with id-> {transaction_id} "})


def userOrders(request, id, token):
    if not validate_user_session(id, token):
        return JsonResponse({"Error": "Please login to use this feature!", "code": "69"})

    userModel = get_user_model()
    print("Got user Model!")
    try:
        user = userModel.objects.get(pk=id)
        print(user)

    except userModel.DeosNotExist:
        return JsonResponse({"Error": "User Doesn't Exist"})

    orders = list(Order.objects.filter(user=user))
    print(orders)
    res = []
    for order in orders:
        temp = {"user": order.user.email, "transaction_id": order.transaction_id, "total_amount": order.total_amount,
                "products": order.product_names, "created_at": order.created_at}
        res.append(temp)

    print(res)
    return JsonResponse(res, safe=False)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('id')
    serializer_class = OrderSeralizer
