from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Donor
from .serializers import DonorSerializer

class DonorViewSet(viewsets.ModelViewSet):
    queryset = Donor.objects.all()
    serializer_class = DonorSerializer

    def get_queryset(self):
        blood_group = self.request.query_params.get('blood_group')
        if blood_group:
            return Donor.objects.filter(blood_group=blood_group)
        return Donor.objects.all()
