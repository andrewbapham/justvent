import random
import requests
from datetime import datetime, timedelta, timezone

def generate_random_emotions():
    emotions = {}
    for emotion in ["anger", "fear", "joy", "sadness", "surprise"]:
        emotions[emotion] = random.randint(0, 12)
    return emotions

def generate_random_timestamp():
    return str(datetime.now(timezone.utc) + timedelta(days=random.randint(0, 20)))

def generate_random_user_id():
    return str(random.randint(0, 10))

def generate_random_content():
    return " ".join([random.choice(["hello", "world", "this", "is", "a", "test"]) for _ in range(random.randint(1, 10))])

def generate_random_journal():
    return {
        "user_id": generate_random_user_id(),
        "content": generate_random_content(),
        "emotions": generate_random_emotions(),
        "date": generate_random_timestamp()
    }

def generate_test_data(num_records):
    data = [generate_random_journal() for _ in range(num_records)]
    for record in data:
        requests.post("http://localhost:8000/api/v1/journals", json=record)

if __name__ == "__main__":
    generate_test_data(100)