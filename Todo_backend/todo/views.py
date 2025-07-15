from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken,AccessToken
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .serializers import RegisterSerializer,LoginSerializer,UserSerializer,TodoSerializer
from .models import Task
from django.utils import timezone

class RegisterView(generics.CreateAPIView):
    queryset=User.objects.all()
    permission_classes=(AllowAny,)
    serializer_class=RegisterSerializer
    
class LoginView(generics.GenericAPIView):
    serializer_class=LoginSerializer
    def post(self, request, *args, **kwargs):
        username=request.data.get('username')
        password=request.data.get('password')
        user=user = authenticate(username=username, password=password)
        if user:
            # User is authenticated
            refresh=RefreshToken.for_user(user)
            access = AccessToken.for_user(user)
            user_serializer=UserSerializer(user)
            
            res = Response({
                'refresh': str(refresh),
                'access': str(access),
                'user':user_serializer.data
            })
            res.set_cookie(
                key='refresh_token',
                value=str(refresh),
                httponly=True,
                secure=True,             # Set True in production with HTTPS
                samesite='strict',          # Or 'Strict' or 'None' depending on use case
                expires=timezone.now() + refresh.lifetime  # Expiry matches token
            )
            res.set_cookie(
                key='access_token',
                value=str(access),
                httponly=True,
                secure=True,             # Set True in production with HTTPS
                samesite='strict',          # Or 'Strict' or 'None' depending on use case
                expires=timezone.now() + access.lifetime  # Expiry matches token
            )
            return res
        else:
            return Response({'details': 'Invalid user.'},status=401)
            
class DashboardView(APIView):
    permission_classes=(IsAuthenticated,)
    def get(self , request):
        user=request.user
        user_serializer=UserSerializer(user)
        return Response({
            'message':"Wellcome to Dashboard",
            'user':user_serializer.data
        },200)
        
class TaskView(APIView):
    permission_classes = [IsAuthenticated]
    # permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return None

    def get(self, request, pk=None):
        """GET all tasks or a specific one"""
        if pk:
            task = self.get_object(pk)
            if not task:
                return Response({"error": "Task not found"}, status=404)
            serializer = TodoSerializer(task)
            return Response(serializer.data)
        else:
            tasks = Task.objects.filter(user=request.user)
            serializer = TodoSerializer(tasks, many=True)
            return Response(serializer.data)

    def post(self, request):
        """Create a new task"""
        # Get access token from Authorization header
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return Response({'detail': 'Authorization header missing or invalid.'}, status=401)
        access_token = auth_header.split(' ')[1]
        try:
            from rest_framework_simplejwt.tokens import AccessToken
            token = AccessToken(access_token)
            user_id = token['user_id']
            from django.contrib.auth import get_user_model
            User = get_user_model()
            user = User.objects.get(id=user_id)
        except Exception:
            return Response({'detail': 'Invalid or expired token.'}, status=401)
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=400)

    def put(self, request, pk):
        """Update an existing task"""
        task = self.get_object(pk)
        if not task:
            return Response({"error": "Task not found"}, status=404)
        if task.user != request.user:
            return Response({"error": "You do not have permission to update this task."}, status=403)
        serializer = TodoSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(user=task.user)
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        """Delete a task"""
        task = self.get_object(pk)
        if not task:
            return Response({"error": "Task not found"}, status=404)
        if task.user != request.user:
            return Response({"error": "You do not have permission to delete this task."}, status=403)
        task.delete()
        return Response({"message": "Task deleted"}, status=204)