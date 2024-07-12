from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.core.mail import send_mail
from django.conf import settings
from .models import *
from rest_framework.permissions import IsAuthenticated
from permissions import IsOwnerOrderOnly
from rest_framework import status, views
from .serializers import UserRegistrationSerializer, BecomeGuideSerializer, StaticPageSerializer, GuideProfileSerializer, GuideOrderSerializer
from tour.models import Order
from tour.serializers import OrderSerializer


class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        
        # Отправка email пользователю для подтверждения
        mail_subject_user = 'Подтвердите ваш аккаунт'
        message_user = f'Ваш код подтверждения: {user.email_verification_code}'
        send_mail(mail_subject_user, message_user, settings.DEFAULT_FROM_EMAIL, [user.email])
        
        # Отправка email администратору о новом зарегистрированном пользователе
        mail_subject_admin = 'Новый зарегистрированный пользователь'
        message_admin = f'Новый пользователь зарегистрирован:\n\nUsername: {user.username}\nEmail: {user.email}\nИмя: {user.first_name}\nФамилия: {user.last_name}'
        send_mail(mail_subject_admin, message_admin, settings.DEFAULT_FROM_EMAIL, [settings.ADMIN_EMAIL], fail_silently=False)
        

class VerifyEmailView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            code = request.data.get('email_verification_code')
            if code is None:
                return Response({'error': 'Код подтверждения отсутствует'}, status=status.HTTP_400_BAD_REQUEST)
            
            user = User.objects.get(email_verification_code=code)
            user.is_active = True
            user.email_verification_code = ''
            user.save()
            return Response({'message': 'Email успешно подтвержден'}, status=status.HTTP_200_OK)
        
        except User.DoesNotExist:
            return Response({'error': 'Неверный код подтверждения'}, status=status.HTTP_400_BAD_REQUEST)
            
            
            
            
            
class BecomeGuideView(APIView):

    def post(self, request, *args, **kwargs):
        user = request.user
        serializer = BecomeGuideSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Теперь вы гид!'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
        
        

class StaticPageListView(generics.ListAPIView):
    queryset = StaticPage.objects.all()
    serializer_class = StaticPageSerializer   
        
        
        
class StaticPageDetailView(generics.RetrieveAPIView):
    queryset = StaticPage.objects.all()
    serializer_class = StaticPageSerializer
    lookup_field = 'slug'        
    
    
    
class GuideProfileView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = GuideProfileSerializer
    lookup_field = 'pk'



class GuideOrdersView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsOwnerOrderOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.is_staff:
            return Order.objects.filter(tour__author=user)
        return Order.objects.none()  # Возвращаем пустой QuerySet для неаутентифицированных пользователей или не гидов

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if queryset.exists():
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        return Response({'detail': 'У вас нет заказов.'}, status=status.HTTP_404_NOT_FOUND)