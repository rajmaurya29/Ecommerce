
from django.urls import path
from base.views import order_views



urlpatterns = [
   path('addOrder',order_views.addOrderItems,name="products"),
   path('ordersAdmin',order_views.getOrders,name="allOrdersByAdmin"),
   path('<str:pk>/',order_views.getOrderById,name='getOrderById'),
   path('pay/<str:pk>/',order_views.pay,name='pay'),
   path('allOrders',order_views.allOrders,name='allOrdersByUser'),
   path('delivered/<str:id>/',order_views.markDelivered,name='markDeliveredByAdmin'),

]  

