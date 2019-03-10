import datetime
from dateutil.relativedelta import relativedelta

from django.db import models


class Person(models.Model):
    fname = models.CharField(max_length=255, verbose_name="First Name")
    lname = models.CharField(max_length=255, verbose_name="Last Name")

    course = models.ForeignKey('Course', on_delete=models.CASCADE, blank=True)
    progress = models.FloatField(default=0.00)

    date_of_birth = models.DateField(blank=True, null=True)
    age = models.IntegerField(null=True, blank=True)

    def save(self, *args, **kwargs):
        self.age = self.get_age()
        super().save(*args, **kwargs)

    def __str__(self):
        return "{fname} {lname}".format(fname=self.fname, lname=self.lname)

    def get_age(self):
        if self.date_of_birth:
            now = datetime.date.today()
            age = relativedelta(now, self.date_of_birth).years
        else:
            age = 20
        return int(age)


class Course(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title

