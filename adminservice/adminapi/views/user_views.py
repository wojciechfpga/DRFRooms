from rest_framework.generics import ListAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import SearchFilter
from rest_framework.exceptions import NotFound
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

class UpdateUserRoleView(UpdateAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        user_id = self.kwargs.get('pk')
        try:
            return Users.objects.get(pk=user_id)
        except Users.DoesNotExist:
            raise NotFound("User not found")
        
class RetrieveUserView(RetrieveAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        user_id = self.kwargs.get('pk')
        try:
            return Users.objects.get(pk=user_id)
        except Users.DoesNotExist:
            raise NotFound("User not found")
        
