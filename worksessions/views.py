from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required

from .models import WorkSession


@login_required
def home(request):
	return render(request, 'worksessions/home.html')

@login_required
def session(request):
	if request.method == 'POST':
		return save_session_data(request)
	else:
		return HttpResponse(status=404)

def save_session_data(request):
	start_time = request.POST['start_time']
	end_time = request.POST['end_time']
	mind_wanders = request.POST.getlist('mind_wanders[]')
	distractions = request.POST.getlist('distractions[]')
	productivity = request.POST['productivity']
	focus = request.POST['focus']
	task_importance = request.POST['task_importance']
	satisfaction = request.POST['satisfaction']
	mood = request.POST['mood']
	task_urgency = request.POST['task_urgency']
	task_complexity = request.POST['task_complexity']
	task_familiarity = request.POST['task_familiarity']
	arousal = request.POST['arousal']
	fatigue = request.POST['fatigue']

	WorkSession.objects.create(
		user=request.user,
		start_time=start_time,
		end_time=end_time,
		mind_wander_times=mind_wanders,
		distraction_times=distractions,
		productivity=productivity,
		focus=focus,
		task_importance=task_importance,
		satisfaction=satisfaction,
		mood=mood,
		task_urgency=task_urgency,
		task_complexity=task_complexity,
		task_familiarity=task_familiarity,
		arousal=arousal,
		fatigue=fatigue
	)

	return HttpResponse(status=200)
