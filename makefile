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
