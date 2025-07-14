from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .serializers import RegisterSerializer,LoginSerializer,UserSerializer,TodoSerializer
from .models import Task
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
            user_serializer=UserSerializer(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user':user_serializer.data
            })
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
    permission_classes = [IsAuthenticated]

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
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)  # assuming Task has user field
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=400)

    def put(self, request, pk):
        """Update an existing task"""
        task = self.get_object(pk)
        if not task:
            return Response({"error": "Task not found"}, status=404)
        serializer = TodoSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        """Delete a task"""
        task = self.get_object(pk)
        if not task:
            return Response({"error": "Task not found"}, status=404)
        task.delete()
        return Response({"message": "Task deleted"}, status=204)