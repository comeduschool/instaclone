# django modules
from django.urls import path

# viewsets
from .views import UserViewSet

signup = UserViewSet.as_view({'post': 'signup'})
signin = UserViewSet.as_view({'post': 'signip'})

urlpatterns = [
    # path("pk"),
    # path(),
    path('signup', signup),
    path('signin', signin)
]