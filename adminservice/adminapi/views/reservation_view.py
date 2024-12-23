from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.pagination import PageNumberPagination
from ..models import Reservations
from ..serializers import ReservationSerializer

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class ReservationListView(ListAPIView):
    queryset = Reservations.objects.select_related('room', 'user').filter(is_deleted=False)
    serializer_class = ReservationSerializer
    pagination_class = StandardResultsSetPagination

class ReservationDetailView(RetrieveAPIView):
    queryset = Reservations.objects.select_related('room', 'user').filter(is_deleted=False)
    serializer_class = ReservationSerializer
