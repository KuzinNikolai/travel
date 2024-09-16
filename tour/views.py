from django.http import Http404
from django.urls import is_valid_path
from rest_framework.response import Response
from django.core.exceptions import PermissionDenied
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from rest_framework import generics, viewsets
from rest_framework.generics import CreateAPIView
from rest_framework import status
from permissions import *
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import render
from rest_framework.generics import get_object_or_404
from django.core.mail import send_mail, EmailMessage
from django.conf import settings
from email.header import Header
from filter import *

from django.template.loader import render_to_string
from django.utils.html import strip_tags
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, IsAdminUser
from rest_framework.filters import SearchFilter, OrderingFilter


from .models import *
from .serializers import *


class FAQView(generics.ListAPIView):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer


class TourListView(generics.ListAPIView):
    queryset = Tour.objects.all()
    serializer_class = TourListSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = TourFilter

    def get_queryset(self):
        return Tour.published.all()


# Добавление тура
# class TourCreateView(generics.CreateAPIView):
#     queryset = Tour.objects.all()
#     serializer_class = TourCreateSerializer
#     # permission_classes = (IsAdminOrReadOnly, )

#     def get(self, request, *args, **kwargs):
#         tags = TagTour.objects.all()
#         cat = Category.objects.all()
#         type = Type.objects.all()
#         langs = LangTour.objects.all()
#         transfers = Transfer.objects.all()
#         included = Included.objects.all()
#         notincluded = NotIncluded.objects.all()
#         take = Take.objects.all()
#         faqs = FAQ.objects.all()
#         user = self.request.user

#         data = {
#             "tags": TagSerializer(tags, many=True).data,
#             "cat": CatSerializer(cat, many=True).data,
#             "type": TypeSerializer(type, many=True).data,
#             "langs": LangTourSerializer(langs, many=True).data,
#             "transfers": TransferSerializer(transfers, many=True).data,
#             "included": IncludedSerializer(included, many=True).data,
#             "notincluded": NotIncludedSerializer(notincluded, many=True).data,
#             "take": TakeSerializer(take, many=True).data,
#             "faqs": FAQSerializer(faqs, many=True).data,
#             "user": UserSerializer(user).data
#         }

#         return Response(data, status=status.HTTP_200_OK)


#     def perform_create(self, serializer):
#         tour = serializer.save()
#         user = self.request.user

#         admin_email_subject = 'Новый тур добавлен'
#         admin_email_message = (
#             f'Название тура: {tour.title}\n'
#             f'Категория: {tour.cat.name}\n'
#             f'Имя гида: {user.first_name} {user.last_name}\n'
#             f'Почта гида: {user.email}\n'
#             f'Номер телефона: {user.phone}\n'
#         )

#         user_email_subject = 'Ваш тур был добавлен'
#         user_email_message = (
#             f'Ваш тур "{tour.title}" был успешно добавлен.\n'
#             f'Категория: {tour.cat.name}\n'
#         )

#         # Отправка письма админу
#         send_mail(
#             admin_email_subject,
#             admin_email_message,
#             settings.DEFAULT_FROM_EMAIL,
#             [settings.ADMIN_EMAIL],
#         )

#         # Отправка письма текущему пользователю
#         send_mail(
#             user_email_subject,
#             user_email_message,
#             settings.DEFAULT_FROM_EMAIL,
#             [user.email],
#         )

#         super().perform_create(serializer)


class TourCreateView(generics.CreateAPIView):
    queryset = Tour.objects.all()
    serializer_class = TourCreateSerializer
    permission_classes = [IsAuthenticated, IsStaffUser]

    def perform_create(self, serializer):
        tour = serializer.save()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        tour = serializer.instance
        user = self.request.user

        admin_email_subject = "Новый тур добавлен"
        admin_email_message = (
            f"Название тура: {tour.title}\n"
            f"Категория: {tour.category.name}\n"
            f"Имя гида: {user.first_name} {user.last_name}\n"
            f"Почта гида: {user.email}\n"
            f"Номер телефона: {user.phone}\n"
        )

        user_email_subject = "Ваш тур был добавлен"
        user_email_message = f'Ваш тур "{tour.title}" был успешно добавлен.\n' f"Категория: {tour.category.name}\n"

        # Отправка письма админу
        # send_mail(
        #     admin_email_subject,
        #     admin_email_message,
        #     settings.DEFAULT_FROM_EMAIL,
        #     [settings.ADMIN_EMAIL],
        # )

        # # Отправка письма текущему пользователю
        # send_mail(
        #     user_email_subject,
        #     user_email_message,
        #     settings.DEFAULT_FROM_EMAIL,
        #     [user.email],
        # )
        # Return the serialized data and status code
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get(self, request, *args, **kwargs):
        tags = TagTour.objects.values_list("translations__tag", flat=True)
        category = Category.objects.values_list("translations__name", flat=True)
        type = Type.objects.values_list("translations__name", flat=True)
        langs = LangTour.objects.values_list("translations__name", flat=True)
        transfers = Transfer.objects.values_list("translations__name", flat=True)
        included = Included.objects.values_list("translations__name", flat=True)
        notincluded = NotIncluded.objects.values_list("translations__name", flat=True)
        take = Take.objects.values_list("translations__name", flat=True)
        faqs = FAQ.objects.values_list("translations__question", flat=True)

        data = {
            "tags": list(tags),
            "category": list(category),
            "type": list(type),
            "langs": list(langs),
            "transfers": list(transfers),
            "included": list(included),
            "notincluded": list(notincluded),
            "take": list(take),
            "faqs": list(faqs),
        }
        return Response(data, status=status.HTTP_200_OK)


# Подробная информация о туре
class TourDetailView(generics.RetrieveAPIView):
    queryset = Tour.objects.all()
    serializer_class = TourDetailSerializer
    lookup_field = "slug"

    def get_queryset(self):
        return Tour.published.all()


# Подробная информация о туре и возможность редактировать
class TourUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Tour.objects.all()
    serializer_class = TourUpdateSerializer

    # permission_classes = (IsOwnerOrReadOnly, )
    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


# Вывод туров только для автора
class MyOffersListView(generics.ListAPIView):
    queryset = Tour.objects.all()
    serializer_class = TourDetailSerializer 
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Tour.objects.all()
        if self.request.user.is_authenticated:
            queryset = queryset.filter(author=self.request.user)
        else:
            queryset = queryset.none()
        return queryset


class CategoryView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryListSerializer
    filter_backends = (DjangoFilterBackend,)


class CategoryTourView(generics.ListAPIView):
    queryset = Tour.objects.all()
    serializer_class = TourListSerializer
    filter_backends = (DjangoFilterBackend,)


# VIEWS ORDERS ------------------------------


class OrderCreateAPIView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        # Убедитесь, что пользователь в запросе соответствует текущему залогиненному пользователю
        if "user" in request.data and int(request.data["user"]) != self.request.user.id:
            return Response(
                {"error": "Вы не можете создать заказ для другого пользователя."}, status=status.HTTP_400_BAD_REQUEST
            )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = self.perform_create(serializer)

        # Отправка уведомлений
        self.send_notification_emails(order)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        return serializer.save()

    def send_notification_emails(self, order):
        trip_date = order.trip_date.strftime("%d %B %Y") if order.trip_date else "Не указана"
        tour_title = order.tour.title if order.tour else "Не указан"
        subject = f"Новый заказ экскурсии {tour_title} на дату {trip_date}"
        subject_user = "Подтверждение заказа"

        # Подготовка контекста для шаблонов
        context = {
            "order": order,
            "trip_type": order.tour.type,
            "trip_date": trip_date,
            "order_number": order.order_number,
            "full_name": order.full_name,
            "email": order.user.email,
            "phone": order.phone,
            "tour_title": tour_title,
            "program": order.program,
            "program_ad_price": order.program.adult_price,
            "program_ch_price": order.program.child_price,
            "child_free": order.tour.what_age_child_free,
            "hotel": order.hotel,
            "room_number": order.room_number,
            "quantity_adults": order.quantity_adults,
            "quantity_children": order.quantity_children,
            "quantity_infant": order.quantity_infant,
            "text": order.text,
            "transfer": order.transfer,
            "total_price_adult": order.total_price_adult,
            "total_price_child": order.total_price_child,
            "total_price": order.total_price,
            "deposit": order.deposit,
            "cash_on_tour": order.cash_on_tour,
            "currency_prefix": order.tour.country.currency_prefix,
            "user": order.tour.author.first_name,
            "phone": order.tour.author.phone,
            "email": order.tour.author.email,
        }

        # Отправка письма админу
        message_admin = render_to_string("emails/order_admin_notification.html", context)
        email_admin = EmailMessage(subject, message_admin, settings.DEFAULT_FROM_EMAIL, [settings.ADMIN_EMAIL])
        email_admin.content_subtype = "html"
        email_admin.send()

        # Отправка письма гиду
        message_guide = render_to_string("emails/order_admin_notification.html", context)
        email_guide = EmailMessage(subject, message_guide, settings.DEFAULT_FROM_EMAIL, [order.tour.author.email])
        email_guide.content_subtype = "html"
        email_guide.send()

        # Отправка письма пользователю
        message_user = render_to_string("emails/order_confirmation.html", context)
        email_user = EmailMessage(subject_user, message_user, settings.DEFAULT_FROM_EMAIL, [order.user.email])
        email_user.content_subtype = "html"
        email_user.send()


# VIEWS HELP ------------------------------
class HelpCreateAPIView(generics.CreateAPIView):
    queryset = NeedHelp.objects.all()
    serializer_class = HelpSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        # Отправка уведомлений на почту
        self.send_notification_emails(serializer.instance)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        return serializer.save()

    def send_notification_emails(self, needhelp):
        subject_admin = "Новая заявка на подбор тура"
        subject_user = "Ваша заявка на подбор тура получена"

        # Подготовка контекста для шаблонов
        context = {
            "needhelp": needhelp,
            "full_name": needhelp.full_name,
            "email": needhelp.email,
            "phone": needhelp.phone,
            "text": needhelp.text,
            # Добавьте остальные поля, которые необходимо передать в шаблоны
        }

        # Отправка письма админу
        message_admin = render_to_string("emails/help_admin_notification.html", context)
        email_admin = EmailMessage(subject_admin, message_admin, settings.DEFAULT_FROM_EMAIL, [settings.ADMIN_EMAIL])
        email_admin.content_subtype = "html"
        email_admin.send()

        # Отправка письма пользователю
        message_user = render_to_string("emails/help_user_notification.html", context)
        email_user = EmailMessage(subject_user, message_user, settings.DEFAULT_FROM_EMAIL, [needhelp.email])
        email_user.content_subtype = "html"
        email_user.send()


class MyHelpListView(generics.ListAPIView):
    queryset = NeedHelp.objects.all()
    serializer_class = HelpSerializer
    permission_classes = [IsOwnerOrderOnly]

    def get_queryset(self):
        # Фильтруем queryset, чтобы пользователь видел только свои заказы
        user = self.request.user
        if not user.is_authenticated:
            raise PermissionDenied(
                "Для просмотра обращений необходимо войти в систему"
            )  # Вызываем исключение PermissionDenied
        return NeedHelp.objects.filter(user=user)

    # Обработка исключения PermissionDenied
    def handle_permission_denied(self, exc):
        return Response({"error": str(exc)}, status=status.HTTP_403_FORBIDDEN)

    def dispatch(self, request, *args, **kwargs):
        try:
            return super().dispatch(request, *args, **kwargs)
        except PermissionDenied as exc:
            return self.handle_permission_denied(exc)


class OrderUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = (IsOwnerOrderOnly,)


# Вывод заказов только для пользователя автора
class MyOrdersListView(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsOwnerOrderOnly]

    def get_queryset(self):
        # Фильтруем queryset, чтобы пользователь видел только свои заказы
        user = self.request.user
        if not user.is_authenticated:
            raise PermissionDenied(
                "Для просмотра заказов необходимо войти в систему"
            )  # Вызываем исключение PermissionDenied
        return Order.objects.filter(user=user)

    # Обработка исключения PermissionDenied
    def handle_permission_denied(self, exc):
        return Response({"error": str(exc)}, status=status.HTTP_403_FORBIDDEN)

    def dispatch(self, request, *args, **kwargs):
        try:
            return super().dispatch(request, *args, **kwargs)
        except PermissionDenied as exc:
            return self.handle_permission_denied(exc)


# VIEWS ORDERS END ------------------------------


# VIEWS REVIEWS ------------------------------
class ReviewCreateAPIView(APIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request, pk):
        tour = get_object_or_404(Tour, pk=pk)  # Получаем экземпляр тура по его идентификатору

        # Получаем данные пользователя из запроса
        user_id = request.data.get("user")
        token = request.headers.get("Authorization").split(" ")[1] if "Authorization" in request.headers else None

        # Проверяем аутентификацию пользователя через токен
        if user_id is None or token is None:
            return Response({"error": "User id or Token not provided."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            if request.user.id != int(user_id) or request.user.auth_token.key != token:
                raise PermissionDenied("Неверные данные пользователя для оставления отзыва.")
        except ValueError:
            raise PermissionDenied("Неверные данные пользователя для оставления отзыва.")

        # Добавляем тур в данные отзыва
        review_data = request.data.copy()
        review_data["tour"] = pk

        serializer = self.serializer_class(data=review_data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TourReviewListAPIView(generics.ListAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        tour_id = self.kwargs["pk"]
        return Reviews.objects.filter(tour__id=tour_id)


# VIEWS REVIEWS END ------------------------------


# VIEWS ADD TO WISHLIST ------------------------------


class AddToWishlistView(generics.CreateAPIView):
    serializer_class = AddToWishlistSerializer
    queryset = Wishlist.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        wishlist = serializer.save()
        response_data = {"wishlist_id": wishlist.id, "tour_id": request.data["tour_id"]}
        return Response(response_data, status=status.HTTP_201_CREATED)


class WishlistListView(generics.ListAPIView):
    serializer_class = WishlistSerializer

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            raise PermissionDenied("Для просмотра сохраненных туров необходимо войти в систему")
        return Wishlist.objects.filter(user=user)


class RemoveFromWishlistView(generics.DestroyAPIView):
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer
    permission_classes = (IsOwnerOrderOnly,)

    def get_queryset(self):
        # Ограничиваем запросы только элементами вишлиста текущего пользователя
        return self.queryset.filter(user=self.request.user)


# VIEWS ADD TO WISHLIST END ------------------------------


class PhotoApiView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    queyrset = Photo.objects.all()
    serializer_class = PhotoCreateSerializer

    def get_queryset(self):
        user = self.request.user
        return self.queyrset.filter(tour__author=user)

    def check_photo_permission(self, obj):
        if obj.tour.author != self.request.user:
            raise PermissionDenied("You don't have permission!")

    def post(self, request):
        data = request.data
        ser = self.serializer_class(data=data, context={"request": request})
        if ser.is_valid(raise_exception=True):
            ser.save()
        return Response(ser.data, status=status.HTTP_200_OK)

    def delete(self, request):
        pk = self.request.query_params["id"]
        photo = Photo.objects.get(id=pk)
        self.check_photo_permission(photo)
        photo.delete()

        return Response(data={"message": "ok"}, status=status.HTTP_200_OK)


class OptionsApiView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer_methods = {
            "tags": "get_tags",
            "category": "get_categories",
            "type": "get_type",
            "langs": "get_langs",
            "transfers": "get_transfers",
            "included": "get_included",
            "notincluded": "get_notincluded",
            "take": "get_take",
            "faqs": "get_faqs",
        }
        data = {}
        serializer = OptionsSerializer({})
        options = request.query_params.get("options", "")
        if not options:
            data = serializer.data
        else:
            for option in options.split(","):
                method_name = serializer_methods.get(option, None)
                if method_name:
                    data[option] = getattr(serializer, method_name)(None)

        return Response(data, status=status.HTTP_200_OK)


class ProgramApiView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Programm.objects.all()
    serializer_class = ProgramCreateSerializer

    def get_queryset(self):
        user = self.request.user
        return self.queryset.filter(tour__author=user)

    def check_program_permission(self, obj):
        if obj.tour.author != self.request.user:
            raise PermissionDenied("You don't have permission!")

    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data=data, context={"request": request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request):
        id = self.request.query_params["id"]
        program = Programm.objects.get(id=id)
        self.check_program_permission(program)
        program.delete()
        return Response(data={"message": "ok"}, status=status.HTTP_200_OK)

    def get(self, request):
        tour_id = self.request.query_params.get("tour", "")
        queryset = self.get_queryset()
        if tour_id:
            queryset = queryset.filter(tour=tour_id)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        data = request.data
        id = request.query_params["id"]
        program = Programm.objects.get(id=id)
        serializer = self.serializer_class(program, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
