import datetime
from dateutil.relativedelta import relativedelta

from django.db import models


class Person(models.Model):
    fname = models.CharField(max_length=255, verbose_name="First Name")
    lname = models.CharField(max_length=255, verbose_name="Last Name")

    date_of_birth = models.DateField()
    age = models.IntegerField(null=True, blank=True)

    def save(self, *args, **kwargs):
        self.age = self.get_age()
        super().save(*args, **kwargs)

    def __str__(self):
        return "{fname} {lname}".format(fname=self.fname, lname=self.lname)

    def get_age(self):
        now = datetime.date.today()
        age = relativedelta(now, self.date_of_birth).years
        return int(age)
