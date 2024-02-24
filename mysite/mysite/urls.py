from django.urls import path

from . import views

urlpatterns = [
    path('query_response', views.process_query, name="chat-query"),
    path('upload_file', views.upload_file, name='upload-file')
]