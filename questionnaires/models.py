from django.db import models
from django.contrib.postgres.fields import ArrayField


class MentalFatigue(models.Model):
	user = models.ForeignKey(to='users.User')
	questionnaire_responses = ArrayField(base_field=models.DecimalField(max_digits=2, decimal_places=1))
	score = models.DecimalField(max_digits=3, decimal_places=1)

class AttentionRelatedCognitiveError(models.Model):
	user = models.ForeignKey(to='users.User')
	questionnaire_responses = ArrayField(base_field=models.SmallIntegerField())
	score = models.SmallIntegerField()

class DaydreamFrequency(models.Model):
	user = models.ForeignKey(to='users.User')
	questionnaire_responses = ArrayField(base_field=models.SmallIntegerField())
	score = models.SmallIntegerField()

class MindfulAttentionAwareness(models.Model):
	user = models.ForeignKey(to='users.User')
	questionnaire_responses = ArrayField(base_field=models.SmallIntegerField())
	score = models.SmallIntegerField()

class Chronotype(models.Model):
	user = models.ForeignKey(to='users.User')