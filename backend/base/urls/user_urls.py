
from django.urls import path
from base.views import user_views



urlpatterns = [
    path('login/', user_views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('logout/', user_views.logoutUser, name='logout_user'),
    path('profile/', user_views.getUser, name='users-profile'),
    path('update/', user_views.updateUser, name='users-update'),
    path('', user_views.getUsers, name='users'),
    path('register/', user_views.registerUsers, name='users-register'),
    path('profiletoken/', user_views.getUserWithToken, name='users-profileToken'),
    path('delete/<str:id>/', user_views.deleteUser, name='users-deleteUser'),
    path('editUser/<str:id>/', user_views.getUserById, name='users-getUserById'),
    path('admin/<str:id>/', user_views.updateUserAdmin, name='users-updateUserAdmin'),
    path('health/',user_views.health_check,name='health_check')
]
