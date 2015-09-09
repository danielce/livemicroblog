from django.core import serializers
from django.http import HttpResponse
from django.views.generic.list import ListView
from django.shortcuts import render
from rest_framework import generics

from .models import Update
from .serializers import UpdateSerializer
# Create your views here.


class UpdateListView(ListView):
    model = Update
    template_name = "home.html"


def update_list(request, id):
    response = HttpResponse()
    response['Content-Type'] = "text/javascript"
    items = Update.objects.filter(pk__gt=id)

    response.write(
        serializers.serialize("json",
                              Update.objects.filter(pk__gt=id))
    )
    return response


class UpdateListAPI(generics.ListAPIView):
    serializer_class = UpdateSerializer

    def get_queryset(self):
        update_id = self.kwargs['update_id']
        queryset = Update.objects.filter(pk__gt=update_id)
        return Update.objects.filter(pk__gt=update_id)


class ListAPI(generics.ListAPIView):
    serializer_class = UpdateSerializer
    model = Update
    queryset = Update.objects.all()


class CreateAPIView(generics.CreateAPIView):
    serializer_class = UpdateSerializer
    model = Update
