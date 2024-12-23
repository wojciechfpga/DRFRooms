from django.urls import path
from . import views

urlpatterns = [
   path('rooms/', views.RoomListCreateView.as_view(), name='room-list-create'), 
   path('rooms/<int:pk>/', views.RoomDetailView.as_view(), name='room-detail'), 
   path('reservations/', views.ReservationListView.as_view(), name='reservation-list'),  
]
