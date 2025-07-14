from django.contrib import admin
from django.urls import path
from todo.views import RegisterView,LoginView,DashboardView,TaskView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/auth/register',RegisterView.as_view(),name="auth_register"),
    path('api/auth/login',LoginView.as_view(),name="login"),
    path('api/auth/dashboard',DashboardView.as_view(),name="dashboard"),
    path('api/auth/todo',TaskView.as_view(),name="task_list"),
    
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
