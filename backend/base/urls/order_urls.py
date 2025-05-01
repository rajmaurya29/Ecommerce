
from django.urls import path
from base.views import order_views



urlpatterns = [
   path('addOrder',order_views.addOrderItems,name="products"),
   path('<str:pk>/',order_views.getOrderById,name='getOrderById'),
   path('pay/<str:pk>/',order_views.pay,name='pay'),
]  

