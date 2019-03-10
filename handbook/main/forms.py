from django import forms
from .models import Person


class AddForm(forms.ModelForm):
    class Meta:
        model = Person
        exclude = ['age', 'date_of_birth']

