from python:3.12-slim

RUN apt-get update
RUN apt-get install git -y

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

CMD ["fastapi", "run", "app.py"]

EXPOSE 8000