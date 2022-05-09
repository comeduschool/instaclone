from rest_framework.serializers import ModelSerializer

from users.models import User

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = (
            'pk',
            'email',
            'username',
            'password',
            'updated',
        )
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }