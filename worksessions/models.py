from django.db import models
from django.contrib.postgres.fields import ArrayField


class WorkSession(models.Model):
	user = models.ForeignKey(to='users.User')
	start_time = models.BigIntegerField()
	end_time = models.BigIntegerField()

	return_to_work_times = ArrayField(base_field=models.BigIntegerField())
	todos = ArrayField(base_field=ArrayField(base_field=models.CharField(max_length=50))) # [[(string)name, (bool)completed], ...]

	productivity = models.SmallIntegerField()
	focus = models.SmallIntegerField()
	satisfaction = models.SmallIntegerField()
	calm = models.SmallIntegerField()
	task_urgency = models.SmallIntegerField()
	task_familiarity = models.SmallIntegerField()
	arousal = models.SmallIntegerField()