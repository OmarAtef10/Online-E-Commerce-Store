from rest_framework import routers

from django.urls import path, include
from . import views

router = routers.DefaultRouter()
router.register(r'', views.OrderViewSet)

urlpatterns = [
    path('add/<str:id>/<str:token>/', views.add, name='order-add'),
    path('orders/<str:id>/<str:token>/', views.userOrders, name="user-orders"),
    path('', include(router.urls)),
]
