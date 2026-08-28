import sys
import os

# Add the current directory to sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from services.ml_service import train_xgboost_model

if __name__ == "__main__":
    result = train_xgboost_model()
    print(result)
