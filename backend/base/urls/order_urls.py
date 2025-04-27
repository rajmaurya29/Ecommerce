
from django.urls import path
from base.views import order_views



urlpatterns = [
   path('addOrder',order_views.addOrderItems,name="products"),
]

