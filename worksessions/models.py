from django.db import models
from django.contrib.postgres.fields import ArrayField


class WorkSession(models.Model):
	user = models.ForeignKey(to='users.User')
	start_time = models.BigIntegerField()
	end_time = models.BigIntegerField()

	mind_wander_times = ArrayField(base_field=models.BigIntegerField())
	distraction_times = ArrayField(base_field=models.BigIntegerField())

	productivity = models.SmallIntegerField()
	focus = models.SmallIntegerField()
	task_importance = models.SmallIntegerField()
	satisfaction = models.SmallIntegerField()
	mood = models.SmallIntegerField()
	task_urgency = models.SmallIntegerField()
	task_complexity = models.SmallIntegerField()
	task_familiarity = models.SmallIntegerField()
	arousal = models.SmallIntegerField()
	fatigue = models.SmallIntegerField()