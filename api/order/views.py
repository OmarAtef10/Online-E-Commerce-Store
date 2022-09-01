from django.shortcuts import render
from rest_framework import viewsets
from django.http import JsonResponse
from .models import Order
from django.contrib.auth import get_user_model
from .serializers import OrderSeralizer
from django.views.decorators.csrf import csrf_exempt


# Create your views here.

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
        user_id = id
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


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('id')
    serializer_class = OrderSeralizer
