import math

from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class CustomPaginationClass(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'

    def get_paginated_response(self, data):
        total_items = self.page.paginator.count
        total_pages = math.ceil(total_items / self.get_page_size(self.request))

        return Response({
            'total_items': total_items,
            'total_pages': total_pages,
            'previous': self.get_previous_link(),
            'next': self.get_next_link(),
            'data': data
        })
