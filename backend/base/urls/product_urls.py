
from django.urls import path
from base.views import product_views



urlpatterns = [
    path('',product_views.getProducts,name="products"),
    path('create/',product_views.createProduct,name="createProduct"),
    path('upload/<str:id>/',product_views.uploadImage,name="uploadImage"),
    path('update/<str:id>/',product_views.updateProduct,name="updateProduct"),
    path('review/<str:id>/',product_views.createProductReview,name="createProductReview"),
    path('<str:pk>/',product_views.getProduct,name="product"),
    path('delete/<str:id>/',product_views.deleteProduct,name="deleteProduct"),
    
]
