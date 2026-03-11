PYTHON=python3
VENV=.venv
UVICORN=./$(VENV)/bin/uvicorn
PIP=./$(VENV)/bin/pip

help:
	@echo "install - install frontend and backend dependencies"
	@echo "api - run api"
	@echo "client - run client"

api:
	cd backend && ./$(UVICORN) app.main:app --reload

web:
	cd frontend && npm run dev

install:
	cd frontend && npm install
	cd backend && $(PYTHON) -m venv .venv && ./.venv/bin/pip install -r requirements.txtll -r requirements.txt
