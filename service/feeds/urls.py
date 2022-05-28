# django modules
from django.urls import path

# viewsets
from .views import (
    FeedViewSet
)

feed_list = FeedViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

feed_detail = FeedViewSet.as_view({
    'put': 'partial_update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    path('', feed_list),
    path('/<int:pk>', feed_detail)
]