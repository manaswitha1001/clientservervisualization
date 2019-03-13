from flask import Flask
from flask_restful import Resource, Api
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from sklearn.metrics import roc_curve
import pandas as pd
import numpy as np
from flask_cors import CORS


app = Flask(__name__)
api = Api(app)
CORS(app)
class ROC(Resource):
	def get(self, preprocessing, c):
		if preprocessing == 'StandardScaling':
			scaler=StandardScaler()

		if preprocessing == 'Min-MaxScaling':
			scaler=MinMaxScaler()
		#scaler=MinMaxScaler()
		scaler.fit(X_train)
		X_scale_train=scaler.transform(X_train)
		X_scale_test=scaler.transform(X_test)
		clf = LogisticRegression(C=float(c)).fit(X_scale_train, y_train)
		pred= clf.predict_proba(X_scale_test)[:,1]
		fpr, tpr, thresholds = roc_curve(y_test, pred, pos_label=1)
		l=[]
		for i in range(len(tpr)):
			v={}
			v['tpr']= tpr[i]
			v['fpr']=fpr[i]
			v['threshold'] = thresholds[i]
			l.append(v)
		# you need to preprocess the data according to user preferences (only fit preprocessing on train data)
		# fit the model on the training set
		# predict probabilities on test set
		return l
		# return the false positives, true positives, and thresholds using roc_curve()
		

api.add_resource(ROC, '/api/<string:preprocessing>/<string:c>')
# Here you need to add the ROC resource, ex: api.add_resource(HelloWorld, '/')
# for examples see 
# https://flask-restful.readthedocs.io/en/latest/quickstart.html#a-minimal-api

if __name__ == '__main__':
	# load data
	df = pd.read_csv('./transfusion.data.txt')
	print(df.shape)
	xDf = df.loc[:, df.columns != 'Donated']
	y = df['Donated']
	# get random numbers to split into train and test
	np.random.seed(1)
	r = np.random.rand(len(df))
	# split into train test
	X_train = xDf[r < 0.8]
	X_test = xDf[r >= 0.8]
	y_train = y[r < 0.8]
	y_test = y[r >= 0.8]
	app.run(debug=True)