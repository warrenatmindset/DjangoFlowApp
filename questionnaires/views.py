from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.urls import reverse
import numpy as np
import decimal

from .models import MentalFatigue, AttentionRelatedCognitiveError, DaydreamFrequency, MindfulAttentionAwareness


@login_required
def home(request):
	return render(request, 'questionnaires/home.html')

@login_required
def mental_fatigue_scale(request):
	if request.method == 'GET':
		return render(request, 'questionnaires/mental_fatigue_scale.html')
	elif request.method == 'POST':
		return save_mental_fatigue_results_and_redirect(request)

@login_required
def attention_related_cognitive_error_scale(request):
	if request.method == 'GET':
		return render(request, 'questionnaires/attention_related_cognitive_error_scale.html')
	elif request.method == 'POST':
		return save_cognitive_error_results_and_redirect(request)

@login_required
def daydream_frequency_scale(request):
	if request.method == 'GET':
		return render(request, 'questionnaires/daydream_frequency_scale.html')
	elif request.method == 'POST':
		return save_daydream_frequency_results_and_redirect(request)

@login_required
def mindful_attention_awareness_scale(request):
	if request.method == 'GET':
		return render(request, 'questionnaires/mindful_attention_awareness_scale.html')
	elif request.method == 'POST':
		return save_mindful_attention_results_and_redirect(request)

def save_mental_fatigue_results_and_redirect(request):
	question_numbers = range(1, 15)
	input_names = ['q{}'.format(num) for num in question_numbers]
	questionnaire_responses = [decimal.Decimal(request.POST[name]) for name in input_names]
	score = sum(questionnaire_responses)

	MentalFatigue.objects.create(
		user=request.user,
		questionnaire_responses=questionnaire_responses,
		score=score
	)

	return HttpResponseRedirect(reverse('questionnaires:home'))

def save_cognitive_error_results_and_redirect(request):
	question_numbers = range(1, 13)
	input_names = ['q{}'.format(num) for num in question_numbers]
	questionnaire_responses = [int(request.POST[name]) for name in input_names]
	score = np.mean(questionnaire_responses)

	AttentionRelatedCognitiveError.objects.create(
		user=request.user,
		questionnaire_responses=questionnaire_responses,
		score=score
	)

	return HttpResponseRedirect(reverse('questionnaires:home'))

def save_daydream_frequency_results_and_redirect(request):
	question_numbers = range(1, 13)
	input_names = ['q{}'.format(num) for num in question_numbers]
	questionnaire_responses = [int(request.POST[name] for name in input_names)]
	score = np.mean(questionnaire_responses)

	DaydreamFrequency.objects.create(
		user=request.user,
		questionnaire_responses=questionnaire_responses,
		score=score
	)

	return HttpResponseRedirect(reverse('questionnaires:home'))

def save_mindful_attention_results_and_redirect(request):
	question_numbers = range(1, 16)
	input_names = ['q{}'.format(num) for num in question_numbers]
	questionnaire_responses = [int(request.POST[name]) for name in input_names]
	score = np.mean(questionnaire_responses)

	MindfulAttentionAwareness.objects.create(
		user=request.user,
		questionnaire_responses=questionnaire_responses,
		score=score
	)

	return HttpResponseRedirect(reverse('questionnaires:home'))