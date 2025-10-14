from django.urls import path
from accounts import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from accounts import views as UserView
from .views import StockPredictionAPIView

urlpatterns = [
    path('register/', views.RegisterUser.as_view()),
    
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    path('protected-view/', UserView.Protected_view.as_view()),
    
    #Prediction API
    path('predict/', StockPredictionAPIView.as_view(), name='stock_prediction'),
]
