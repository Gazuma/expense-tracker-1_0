from flask import Flask
from flask import render_template
from pymongo import MongoClient
#
import io
import random
from flask import Response
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
import matplotlib.pyplot as mpt
#

client = MongoClient('mongodb://localhost:27017/')
my_database = client['expenseTracker']
my_table = my_database['transactions']
print('connected')
data = my_table.find()

xs = []

for document in data:
    xs.append(document["price"])
print(xs)



#python -m flask --app helloworld run