from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from rest_framework.decorators import permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.status import *
from base.models import *
from base.serializers import *

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    data=request.data
    orderItems=data["orderItems"]
    order=Order.objects.create(
        user=request.user,
        paymentMethod=data["paymentMethod"],
        taxPrice=data["taxPrice"],
        shippingPrice=data["shippingPrice"],
        totalPrice=data["totalPrice"]
    )
    shippingaddress=ShippingAddress.objects.create(
        order=order,
        address=data['shippingAddress']["address"],
        city=data['shippingAddress']["city"],
        postalCode=data['shippingAddress']["postalCode"],
        country=data['shippingAddress']["country"]
    )
    for i in orderItems:
        product=Product.objects.get(_id=i['product'])
        item=OrderItem.objects.create(
            order=order,
            product=product,
            name=i["name"],
            qty=i["qty"],
            price=i["price"],
            image=product.image.url
        )
        product.countInStock-=int(i["qty"])
        
        product.save()
    serializer=OrderSerializer(order,many=False)
    
    # print(serializer.data)
    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request,pk):
    order=Order.objects.get(_id=pk)
    serializer=OrderSerializer(order,many=False)
    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def pay(request,pk):
    order=Order.objects.get(_id=pk)
    order.isPaid=True
    order.save()
    serializer=OrderSerializer(order,many=False)
    return Response(serializer.data)


