from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.middleware.csrf import get_token as get_csrf_token

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
	csrf_token = get_csrf_token(request)
	print('csrf token: {}'.format(csrf_token))
	
	start_time = request.POST['start_time']
	end_time = request.POST['end_time']
	productivity = request.POST['productivity']
	focus = request.POST['focus']
	satisfaction = request.POST['satisfaction']
	calm = request.POST['calm']
	task_urgency = request.POST['task_urgency']
	task_familiarity = request.POST['task_familiarity']
	arousal = request.POST['arousal']

	returns_to_work = request.POST.getlist('returns_to_work[]')
	todos = []
	for item in request.POST.items():
		if 'todos' in item[0]:
			todos.append(request.POST.getlist(item[0]))

	WorkSession.objects.create(
		user=request.user,
		start_time=start_time,
		end_time=end_time,
		return_to_work_times=returns_to_work,
		todos=todos,
		productivity=productivity,
		focus=focus,
		satisfaction=satisfaction,
		calm=calm,
		task_urgency=task_urgency,
		task_familiarity=task_familiarity,
		arousal=arousal
	)

	return HttpResponse(status=200)
