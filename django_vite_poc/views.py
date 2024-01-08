from django.http import JsonResponse
from django.shortcuts import render, HttpResponse

from django.views.decorators.http import require_http_methods


import sys
import time
from googlesearch import search as g_search
# from openai import OpenAI, beta

# thread_id = 'thread_EFiHlGnnRAimnd3N6lEEQ6jc'
# a_id = 'asst_yaljsSkfASyP8ohHLgzQUHpL'

# client = OpenAI()

def do_search(q):
    search_results = list(g_search(q, num_results=4, lang='en', advanced=True))
    # m = client.beta.threads.messages.create(
    #     thread_id=thread_id,
    #     role='user',
    #     content=str(results),
    # )
    search_results = [result.__dict__ for result in search_results]
    return search_results


def home(request):
    return render(request, 'index.html')


@require_http_methods(['POST'])
def search(request):
    c = {}
    q = request.GET.get('q', '')
    if q == '':
        return JsonResponse({'error': 'Missing query'})
    

    results = do_search(q)

    return JsonResponse({'error': False, 'results': results })
    
