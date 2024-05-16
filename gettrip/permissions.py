from rest_framework import permissions


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)
    

class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Проверяет, является ли пользователь владельцем объекта или администратором.
    """
    def has_object_permission(self, request, view, obj):
        # Разрешить доступ только администраторам
        if request.user.is_staff:
            return True
        # Разрешить доступ только владельцу объекта
        return obj == request.user    
    

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user
    
# Только автор видит список туров
class IsOwnerOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        # Здесь проверяем, что текущий пользователь автором всех туров в queryset
        return request.author == request.user
    

class IsOwnerOrderOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Проверяем, является ли текущий пользователь владельцем заказа
        return obj.user == request.user
    

class IsLoggedUserOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        # Проверяем, является ли текущий пользователь аутентифицированным
        return request.user and request.user.is_authenticated    