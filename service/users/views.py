# django modules
from django.contrib.auth import authenticate
from django.contrib.auth import login

# drf modules 
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action

# models
from users.models import User

# serializers
from users.serializers import UserSerializer

# Create your views here.
class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permissions = []

    def signup(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        login(request, user)
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    def signin(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(serializer.validated_data['email'], serializer.validated_data['password'])
        login(request, user)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )