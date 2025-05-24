from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from base.models import Product,Review
from base.serializers import ProductSerializer,ReviewSerializer
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
@permission_classes([IsAdminUser])
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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request,id):
    product=Product.objects.get(_id=id)
    alreadyExits=product.review_set.filter(user=request.user).exists()
    data=request.data
    if alreadyExits:
        return Response("Already reviewed",status=HTTP_400_BAD_REQUEST)
    elif data['rating']==0:
        return Response("select any rating",status=HTTP_400_BAD_REQUEST)
    else:
        review=Review.objects.create(
            user=request.user,
            product=product,
            name=data["name"],
            rating=data["rating"],
            comment=data["comment"],
        )
       
        
        reviews=product.review_set.all()
        product.numReviews=len(reviews)

        total_rating=0
        for i in reviews:
            total_rating+=i.rating
        
        product.rating=total_rating/len(reviews)
        product.save()
        serializer=ProductSerializer(product,many=False)
        return Response(serializer.data,status=HTTP_200_OK)
    
