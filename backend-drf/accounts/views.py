from .serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status


class RegisterUser(generics.CreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [AllowAny]
  
class LoginUser():
  pass

class Protected_view(APIView):
  permission_classes = [IsAuthenticated]
  
  def get(self, request):
    data ={
      'status': 'user is permitted',
    }
    
    return Response(data, status=status.HTTP_202_ACCEPTED)