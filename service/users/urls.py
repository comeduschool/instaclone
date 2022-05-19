# Django modules
from django.urls import path
from django.views.decorators.csrf import csrf_exempt

# viewsets
from .views import (
    AuthViewSet,
    UserViewSet
)

signup = AuthViewSet.as_view({'post': 'signup'})
signin = AuthViewSet.as_view({'post': 'signin'})

authcode = AuthViewSet.as_view({
    'post': 'create_authcode',
    'put': 'check_authcode'
})

password = AuthViewSet.as_view({'put': 'change_lostpassword'})

user_detail = UserViewSet.as_view({
    'get': 'retrieve',
    'patch': 'partial_update'
})

user_password = UserViewSet.as_view({
    'post': 'check_user_password'
})

user_profile = UserViewSet.as_view({
    'patch': 'upload_profile',
    'delete': 'remove_profile',
})

urlpatterns = [
    # path("pk"),
    # path(),
    path('signup', signup),
    path('signin', signin),
    path('authcode', authcode),
    path('password', password),
    path('<int:pk>', user_detail),
    path('<int:pk>/password', user_password),
    path('<int:pk>/profile', user_profile)
]