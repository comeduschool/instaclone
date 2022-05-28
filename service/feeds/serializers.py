# python modules
import uuid

# drf modules
from rest_framework import serializers

from feeds.models import (
    Feed,
    Image
)


class FeedSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)
    images = serializers.SerializerMethodField()

    class Meta:
        model = Feed
        fields = (
            'pk',
            'user',
            'images',
            'like',
            'content',
            'updated'
        )

    def get_user(self, feed):
        return feed.user.username

    def get_images(self, feed):
        images = feed.feed_images.all()
        print(images)
        return [self.context['request'].build_absolute_uri(image.image.url) for image in images]

    def create(self, validated_data):
        image_files = self.context['request'].FILES.getlist('images')
        feed = Feed.objects.create(
            **validated_data
        )
        for image_file in image_files:
            if 'image' not in image_file.content_type:
                raise ValueError("ValueError: 이미지파일이 아닙니다. 이미지 파일을 업로드해주세요.")
            
            ext = image_file.content_type.split("/")[-1]

            image = Image(feed=feed)
            image.image.save(f"{uuid.uuid4()}.{ext}", image_file)
            image.save()

            print(image)
            print(image_file)
            print(image.feed)

        return feed