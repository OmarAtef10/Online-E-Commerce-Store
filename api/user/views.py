from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from .models import CustomUser
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login, logout
import random
import re


# Create your views here.
def generate_session_token(length=10):
    return ''.join(
        random.SystemRandom().choice([chr(i) for i in range(97, 123)] + [str(j) for j in range(10)]) for _ in
        range(length))


@csrf_exempt
def signin(request):
    if not request.method == 'POST':
        return JsonResponse({'Error': "Send a Post Request!"})

    username = request.POST['email']
    password = request.POST['password']

    # Validation!!
    if not re.match("^[\w\.\+\-]+\@[\w]+\.[a-z]{2,3}$", username):
        return JsonResponse({"Error": "Enter a Valid Email!"})
    if len(password) < 3:
        return JsonResponse({"Error": "Password is Too Short!"})

    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(email=username)
        if user.check_password(password):
            user_dic = UserModel.objects.filter(email=username).values().first()
            user_dic.pop('password')

            if user.session_token != "0":
                user.session_token = "0"
                user.save()
                return JsonResponse({"Error": "Previous Session Exists!!"})

            token = generate_session_token()
            user.session_token = token
            user.save()
            login(request, user)
            return JsonResponse({"Token": token, "user": user_dic})
        else:
            return JsonResponse({"Error": "Invalid Password!"})
    except UserModel.DoesNotExist:
        return JsonResponse({"Error": "Invalid Email"})


def signout(request, id):
    logout(request)

    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(pk=id)
        user.session_token = "0"
        user.save()

    except UserModel.DoesNotExist:
        return JsonResponse({'error': 'Invalid user ID'})

    return JsonResponse({'success': 'Logout success'})


class UserViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {'create': [AllowAny]}
    queryset = CustomUser.objects.all().order_by('id')
    serializer_class = UserSerializer

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]

        except KeyError:
            return [permission() for permission in self.permission_classes]
