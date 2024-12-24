from rest_framework.generics import ListAPIView
from ..models import Users
from ..serializers import UserSerializer
from rest_framework.pagination import PageNumberPagination

# Paginator dla infinite scroll
class InfiniteScrollPagination(PageNumberPagination):
    page_size = 10  # Liczba elementów na stronę
    page_size_query_param = 'page_size'
    max_page_size = 100

class UserListView(ListAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    pagination_class = InfiniteScrollPagination
