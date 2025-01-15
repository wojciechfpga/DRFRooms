from django.urls import path
from . import views

urlpatterns = [
   path('rooms/', views.RoomListCreateView.as_view(), name='room-list-create'), 
   path('rooms/<int:pk>/', views.RoomDetailView.as_view(), name='room-detail'), 
   path('reservations/', views.ReservationListView.as_view(), name='reservation-list'),  
   path('reservations/<int:pk>/', views.ReservationDetailView.as_view(), name='reservation-detail'),
   path('users/', views.UserListView.as_view(), name='user-list'),  
   path('users/<int:pk>/role/', views.UpdateUserRoleView.as_view(), name='user-update'),  
]
