from flask import Flask
from flask import render_template
from pymongo import MongoClient
#
import io
import random
from flask import Response
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
import matplotlib.pyplot
import numpy as np
#

client = MongoClient('mongodb://localhost:27017/')
my_database = client['expenseTracker']
my_table = my_database['transactions']

app = Flask(__name__)


@app.route("/graph")
def hello_page():
    
    return render_template('hello.html')

#
@app.route('/plot.png')
def plot_png():
    # fig = create_figure()
    # output = io.BytesIO()
    # FigureCanvas(fig).print_png(output)
    # return Response(output.getvalue(), mimetype='image/png')
    fig = create_figure()
    canvas = FigureCanvas(fig)
    img = io.BytesIO()
    fig.savefig(img)
    img.seek(0)
    return Response(img,mimetype='image/png')
def create_figure():
    fig,axis = matplotlib.pyplot.subplots()

    xs = []
    ys = []
    for i in my_table.find():
        xs.append(i['price'])
        ys.append(i['purpose'])
    axis.pie(xs,labels=ys,autopct="%1.1f%%")
    return fig
#






#python -m flask --app helloworld run