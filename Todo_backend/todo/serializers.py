from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Task
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields= ('id','username','email')
        
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields= ('username','email','password')
    def create(self , validated_data):
        user=User.objects.create_user(
              validated_data['username'],
              validated_data['email'],
              validated_data['password'],
        )
        return user   
        
class LoginSerializer(serializers.Serializer):
    username=serializers.CharField(required=True)
    password=serializers.CharField(required=True,write_only=True)
    
class TodoSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Task
        fields = '__all__'
    def create(self, validated_data):
        return Task.objects.create(**validated_data)

