from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def index(request):
    return render(request, 'index.html')
    # return HttpResponse("<h2>Hello world</h2>")

def about(request):
    return HttpResponse("<h2>Hello world</h2>")