from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .products import products
# from django.http import JsonResponse
# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    routes=[
        '/api/products/',
        '/api/products/create/',
        '/api/products/upload/',
        '/api/products/<id>/reviews/',
        '/api/products/top/',
        '/api/products/<id>/',
        '/api/products/delete/<id>/',
        '/api/products/<update>/<id>/',

    ]
    return Response(routes)


@api_view(['GET'])
def getProducts(request):
    return Response(products)

@api_view(['GET'])
def getProduct(request,pk):
    product=None
    for i in products:
        if(i["_id"]==pk):
            product=i
            break
    return Response(product)