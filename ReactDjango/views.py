from django.contrib.auth.decorators import login_required
from django.shortcuts import render


def signin(request):
    return render(request, 'index.html')


def signup(request):
    return render(request, 'index.html')


@login_required()
def home(request):
    return render(request, 'index.html')


@login_required()
def dashboard(request):
    return render(request, "index.html")


@login_required()
def cart(request):
    return render(request, 'index.html')
