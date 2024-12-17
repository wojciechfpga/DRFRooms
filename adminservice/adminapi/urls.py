from django.urls import path
from . import views

urlpatterns = [
   path('rooms/', views.RoomListCreateView.as_view(), name='room-list-create'),  # Lista i tworzenie
   path('rooms/<int:pk>/', views.RoomDetailView.as_view(), name='room-detail'),  # Szczegóły, aktualizacja, usuwanie
]
