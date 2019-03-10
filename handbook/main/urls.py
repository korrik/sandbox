from django.urls import path
from . import views


urlpatterns = [
    path('', views.index),
    path('create_person/', views.create_person),
    path('test/', views.test),
]
