# serializers.py
from djoser.serializers import UserSerializer as BaseUserSerializer

class CustomUserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        fields = BaseUserSerializer.Meta.fields + ('id', 'first_name', 'last_name', 'age', 'photo')
