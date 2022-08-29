from django.urls import path, include
from rest_framework.authtoken import views
from rest_framework.authtoken.views import obtain_auth_token

import api.category.views
from . import views

urlpatterns = [
    path('', views.home, name='apiHome'),
    path('category/', include('api.category.urls')),
    path('product/', include('api.product.urls')),
    path('user/', include('api.user.urls')),
    path('api-token-auth', obtain_auth_token, name='api-token-auth'),
    path('order/', include('api.order.urls')),
    path('payment/',include('api.payment.urls'))
]
