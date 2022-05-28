# django modules
from django.contrib.auth import authenticate
from django.contrib.auth import login

# drf modules 
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated

# models
from users.models import User

# serializers
from users.serializers import UserSerializer

# Create your views here.
class AuthViewSet(ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [ AllowAny ]
    authentication_classes = []

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
        user = authenticate(email=request.data['email'], password=request.data['password'])
        if user is not None:
            login(request, user)
            serializer = self.get_serializer(user)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )
        else:
            try:
                user = User.objects.get(email=request.data['email'])
                message = "비밀번호를 확인하세요."
            except User.DoesNotExist:
                message = "사용자가 없습니다."

            return Response(
                {
                    "message": message
                },
                status=status.HTTP_404_NOT_FOUND
            )
    
    def create_authcode(self, request):
        email = request.data['email']
        try: 
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {
                    "message" : "해당 이메일이 존재하지 않습니다. 이메일을 확인해주세요."
                }, 
                status=status.HTTP_404_NOT_FOUND
            )
        try:
            authcode = user.create_authcode()
        except Exception as e :
            return Response(
                {
                    "message" : str(e)
                }, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        return Response(
            {
                "message" : authcode
            }, 
            status=status.HTTP_200_OK
        )

    def check_authcode(self, request):
        email = request.data.get('email', None)
        if email is None:
            return Response (
                {
                    "message": "이메일이 없습니다."
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        authcode = request.data.get('authcode', None)
        if authcode is None:
            return Response (
                {
                    "message": "인증코드를 입력해주세요."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.get(email=email)
        try: 
            result = user.check_authcode(authcode)
        except Exception as e:
            return Response (
                {
                    "message": str(e)
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if result:
            return Response (
                status=status.HTTP_200_OK
            )
        else:
            return Response (
                {
                    "message": "잘못된 인증코드입니다."
                },
                status=status.HTTP_400_BAD_REQUEST
            )
    
    def change_lostpassword(self, request):
        email = request.data.get('email', None)
        if email is None:
            return Response (
                {
                    "message": "이메일이 없습니다."
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        authcode = request.data.get('authcode', None)
        if authcode is None:
            return Response (
                {
                    "message": "인증코드를 입력해주세요."
                },
                status=status.HTTP_400_BAD_REQUEST
            )
            
        password = request.data.get('password', None)
        if password is None:
            return Response (
                {
                    "message": "잘못된 값입니다."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.get(email=email, authcode__startswith=f"{authcode}:")
        try:
            user.change_lostpassword(password)
        except Exception as e:
            return Response (
                {
                    "message": "비밀번호가 변경되지 않았습니다. 다시 시도해주세요."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response (
                status=status.HTTP_200_OK
            )
class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [ IsAuthenticated, ]

    def check_user_password(self, request, pk):
        password = request.data.get("password", None)
        if password is None:
            return Response (
                {
                    "message": "올바른 비밀번호 형식이 아닙니다. 비밀번호를 확인해주세요."
                },
                status=status.HTTP_400_BAD_REQUEST
            ) 
        if request.user.check_password(password):
            return Response (
                {},
                status=status.HTTP_200_OK
            )
        else: 
            return Response (
                {
                    "message": "올바른 비밀번호 형식이 아닙니다. 비밀번호를 확인해주세요."
                },
                status=status.HTTP_404_NOT_FOUND
            )

    def upload_profile(self, request, pk):
        profile = request.FILES.get("profile", None)
        if profile is None:
            raise Response(
                {
                    "message": "파일이 없습니다. 파일을 업로드해주세요."
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            user = request.user.upload_profile(profile)

        except Exception as e:
            return Response(
                {
                  "message": str(e)  
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(
            self.get_serializer(user).data,
            status=status.HTTP_200_OK
        )

    def remove_profile(self, request, pk):
        user = request.user.remove_profile()
        return Response(
            self.get_serializer(user).data,
            status=status.HTTP_200_OK
        )