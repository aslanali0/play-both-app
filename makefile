.PHONY: api
VENV = .venv
ifeq ($(OS),Windows_NT)
   UVICORN := $(VENV)/Scripts/uvicorn 
else
    UVICORN := $(VENV)/bin/uvicorn
endif


api:
	cd backend && ./$(UVICORN) app.main:app --reload

web:
	cd frontend && npm run dev


install:
	cd frontend && npm install
	cd backend && python -m venv .venv && $(VENV)/bin/pip install -r requirements.txt
