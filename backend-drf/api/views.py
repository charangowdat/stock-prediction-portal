from cProfile import label
import keras
from rest_framework.views import APIView
from .serializers import StockPredictionSerializer
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
import yfinance as yf
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import os
from django.conf import settings
from .utils import save_plot
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model
from sklearn.metrics import mean_squared_error, r2_score

# Create your views here.
class StockPredictionAPIView(APIView):
  def post(self, request):
    serializer = StockPredictionSerializer(data=request.data)
    if serializer.is_valid():
      ticker = serializer.validated_data['ticker'].upper()
      now = datetime.now()
      start = datetime(year=now.year-10, month=now.month, day=now.day)
      end = now
      df = yf.download(ticker, start, end)
      
      if df.empty:
        return Response({"error":"No data found for the given ticker.", 'status': status.HTTP_404_NOT_FOUND})
      df = df.reset_index()
      
      #Generate Close Plot
      plt.switch_backend('AGG')
      plt.figure(figsize=(12, 5))
      plt.plot(df.Close, label='Closing Price')
      plt.title(f'Closing price of {ticker}')
      plt.xlabel('Days')
      plt.ylabel('Price')
      plt.legend()
      #Save the plot file
      plot_img_path = f'{ticker}_plot.png'
      plot_img = save_plot(plot_img_path)
      
      #100 days moving average
      plt.switch_backend('AGG')
      df['MA_100'] = df.Close.rolling(100).mean()
      plt.figure(figsize=(12,5))
      plt.plot(df.Close, label='Closing Price')
      plt.plot(df.MA_100, 'r', label='100 Days MA')
      plt.title(f'100 days moving average of {ticker}')
      plt.xlabel('Days')
      plt.ylabel('Price')
      plt.legend()
      #Save the plot file
      plot_img_path = f'{ticker}_100ma_plot.png'
      plot_100_dma = save_plot(plot_img_path)
      
      #100 days moving average
      plt.switch_backend('AGG')
      df['MA_200'] = df.Close.rolling(200).mean()
      plt.figure(figsize=(12,5))
      plt.plot(df.Close, label='Closing Price')
      plt.plot(df.MA_100, 'r', label='100 Days MA')
      plt.plot(df.MA_200, 'g', label='200 Days MA')
      plt.title(f'200 days moving average of {ticker}')
      plt.xlabel('Days')
      plt.ylabel('Price')
      plt.legend()
      #Save the plot file
      plot_img_path = f'{ticker}_200ma_plot.png'
      plot_200_dma = save_plot(plot_img_path)
      
      #Splitting data into Training and Testing dates
      data_training = pd.DataFrame(df.Close[0:int(len(df)*0.7)])
      data_testing = pd.DataFrame(df.Close[int(len(df)*0.7): int(len(df))])
      
      #Scaling down the data b/w 0 and 1
      scaler = MinMaxScaler(feature_range=(0,1))
      
      #Load ML Model
      model = load_model('stock_prediction_model.keras')
      
      #preparing test data
      past_100_days = data_training.tail(100)
      final_df = pd.concat([past_100_days, data_testing], ignore_index=True)
      input_data = scaler.fit_transform(final_df)
      
      x_test = []
      y_test = []

      for i in range(100, input_data.shape[0]):
        x_test.append(input_data[i-100:i])
        y_test.append(input_data[i, 0])
      x_test, y_test = np.array(x_test), np.array(y_test)
      
      #making predictions
      y_predicted = model.predict(x_test)
      
      #Revert Scaled values to original price
      y_predicted = scaler.inverse_transform(y_predicted.reshape(-1,1)).flatten()
      y_test = scaler.inverse_transform(y_test.reshape(-1,1)).flatten()
      
      #Plot the prediction
      plt.switch_backend('AGG')
      plt.figure(figsize=(12,5))
      plt.plot(y_test, 'b', label='Original Price')
      plt.plot(y_predicted, 'r', label='Predicted Price')
      plt.title(f'Prediction for {ticker}')
      plt.xlabel('Days')
      plt.ylabel('Price')
      plt.legend()
      #Save the plot file
      plot_img_path = f'{ticker}_final_prediction_plot.png'
      plot_prediction = save_plot(plot_img_path)  
      
      # Model Evaluation
      # Mean Square Error (MSE)
      mse = mean_squared_error(y_test, y_predicted)
      
      # Root Mean Squarred Error (RMSE)
      rmse = np.sqrt(mse)
      
      # R-Squared 
      r2 = r2_score(y_test, y_predicted)
      
      return Response({
        'status' : 'success', 
        'plot_img':plot_img, 
        'plot_100_dma':plot_100_dma, 
        'plot_200_dma':plot_200_dma,
        'plot_prediction':plot_prediction,
        'mse':mse,
        'rmse':rmse,
        'r2':r2,
        })
    return Response({'error' : 'bruh what is that🙄'})
    