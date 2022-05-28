# djgno modules
from django.core.files.storage import default_storage

# drf modules
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

# models
from feeds.models import Feed

# serializers
from feeds.serializers import FeedSerializer

# Create your views here.
class FeedViewSet(ModelViewSet):
    queryset = Feed.objects.all()
    serializer_class = FeedSerializer
    permission_classes = [ IsAuthenticated ]

    def create(self, request):
        print(request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        feed = serializer.save(user=request.user)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )