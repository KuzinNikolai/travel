from django.shortcuts import render
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework import generics

from .models import *
from .serializers import *


class SupportListView(generics.ListAPIView):
    queryset = Support.objects.all()
    serializer_class = SupportListSerializer

    def get_serializer_context(self):
        return {'request': self.request}
