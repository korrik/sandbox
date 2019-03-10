from django.http import JsonResponse
from django.http import HttpResponseRedirect
from django.shortcuts import render

from .models import Person, Course
from .forms import AddForm


def index(request):
    p = Person.objects.all()

    if request.method == "POST":

        form = AddForm(request.POST)

        if form.is_valid():
            form.save()

            return HttpResponseRedirect('/')

    else:
        form = AddForm()

    return render(request, 'index.html', {"person": p, "form": form})


def create_person(request):
    if request.method == 'POST':
        course_id = request.POST.get('course')

        course = Course.objects.get(id=course_id)
        fname = request.POST.get('fname')
        lname = request.POST.get('lname')
        progress = request.POST.get('progress')
        date_of_birth = request.POST.get('date_of_birth')

        response_data = {}

        person = Person(
            fname=fname,
            lname=lname,
            course=course,
            progress=progress,
            date_of_birth=date_of_birth,
        )
        person.save()

        response_data['result'] = 'Create post successful!'

        return JsonResponse(response_data)


def test(request):
    responseData = {
        'name': 'Max Power',
    }

    return JsonResponse(responseData)

