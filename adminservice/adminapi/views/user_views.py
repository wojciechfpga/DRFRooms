from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import SearchFilter
from ..models import Users
from ..serializers import UserSerializer

class UsersPagination(PageNumberPagination):
    page_size = 10 
    page_size_query_param = 'page_size'
    max_page_size = 100

class UserListView(ListAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    pagination_class = UsersPagination
    filter_backends = [SearchFilter]
    search_fields = ['username']  
