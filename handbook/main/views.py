from django.http import JsonResponse
from django.shortcuts import render


def index(request):
    return render(request, 'index.html', {})


def test(request):
    responseData = {
        'name': 'Max Power',
    }

    return JsonResponse(responseData)

