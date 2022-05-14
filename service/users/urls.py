# Django modules
from django.urls import path
from django.views.decorators.csrf import csrf_exempt

# viewsets
from .views import UserViewSet

signup = UserViewSet.as_view({'post': 'signup'})
signin = UserViewSet.as_view({'post': 'signin'})

authcode = UserViewSet.as_view({
    'post': 'create_authcode',
    'put': 'check_authcode'
})

password = UserViewSet.as_view({'put': 'change_lostpassword'})

urlpatterns = [
    # path("pk"),
    # path(),
    path('signup', signup),
    path('signin', signin),
    path('authcode', authcode),
    path('password', password),
]