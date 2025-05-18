from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from base.models import Product
from base.serializers import ProductSerializer
from rest_framework.status import *
from rest_framework.permissions import IsAuthenticated,IsAdminUser

@api_view(['GET'])
def getProducts(request):
    products=Product.objects.all()
    serializer=ProductSerializer(products,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request,pk):
    product=Product.objects.get(_id=pk)
    serializer=ProductSerializer(product,many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request,id):
    product=Product.objects.get(_id=id)
    product.delete()
    return Response("product deleted successfully")

@api_view(['POST'])
# @permission_classes([IsAdminUser])
def createProduct(request):
    data=request.data
    product=Product.objects.create(
        user=request.user,
        name=data["name"],
        brand=data["brand"],
        category=data["category"],
        description=data["description"],
        rating=data["rating"],
        numReviews=data["numReviews"],
        price=data["price"],
        countInStock=data["countInStock"],

    )
    serializer=ProductSerializer(product,many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def updateProduct(request,id):
    data=request.data
    product=Product.objects.get(_id=id)
    product.name=data["name"]
    product.brand=data["brand"]
    product.category=data["category"]
    product.description=data["description"]
    product.rating=data["rating"]
    product.numReviews=data["numReviews"]
    product.price=data["price"]
    product.countInStock=data["countInStock"]
    product.save()
    serializer=ProductSerializer(product,many=False)
    return Response(serializer.data)

@api_view(['POST'])
def uploadImage(request,id):
    product=Product.objects.get(_id=id)
    product.image=request.FILES.get("image")
    product.save()
    return Response("image was uploaded")