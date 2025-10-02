
from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only=True, min_length=8, style={'input_type':'password'})
  class Meta:
    model = User
    fields = ['username', 'email', 'password']
    
  def create(self, validated_data):
    user = User.objects.create_user(**validated_data)
    return user
  # another way
  # def create(self, validated_data):
  #   #User.objects.create save the password in a plain text
  #   #User.objects.create_user automatically hash the password
  #   user = User.objects.create_user(
  #   validated_data['username'],
  #   validated_data['email'],
  #   validated_data['password']
  #   )
  #  
  #   return user
  
  def validate_username(self, value):
    if not value.islower():
      raise serializers.ValidationError('username must be in lowercase')
    return value
  
  # def validate_password(self, value):
  #   import re

  #   if not re.search(r'[^A-Za-z0-9]', value):
  #     raise serializers.ValidationError("Password must contain at least one special character.")
  #   return value