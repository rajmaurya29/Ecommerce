
from django.urls import path
from base.views import user_views



urlpatterns = [
    path('login/', user_views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', user_views.getUser, name='users-profile'),
    path('', user_views.getUsers, name='users'),
    path('register/', user_views.registerUsers, name='users-register'),
    path('profiletoken/', user_views.getUserWithToken, name='users-profileToken'),
]
