from datetime import datetime, timedelta, timezone
import requests

data = [
    {
        "user_id": "user_001",
        "content": "Today was rough. My project didn’t go as planned, and I felt like everything was falling apart. It’s hard to stay positive when things keep going wrong.",
        "emotions": {
            "anger": 6,
            "sadness": 7,
            "neutral": 2,
            "joy": 1
        },
        "date": str(datetime.now(timezone.utc) + timedelta(days=-1))
    },
    {
        "user_id": "user_001",
        "content": "I had a great day today! I got a promotion at work, and I’m so excited to start my new role. I feel like all my hard work has finally paid off.",
        "emotions": {
            "joy": 10,
            "neutral": 2,
            "surprise": 3
        },
        "date": str(datetime.now(timezone.utc) + timedelta(days=0))
    },
    {
        "user_id": "user_002",
        "content": "I’m feeling really anxious today. I have a big presentation at work, and I’m worried I won’t do well. I wish I had more time to prepare.",
        "emotions": {
            "fear": 8,
            "anger": 4,
            "neutral": 1
        },
        "date": str(datetime.now(timezone.utc) + timedelta(days=-1))

    },
    {
        "user_id": "user_002",
        "content": "I had a great workout today! I feel so energized and ready to take on the day. Exercise always helps me feel better.",
        "emotions": {
            "joy": 6,
            "neutral": 3,
            "surprise": 2
        },
        "date": str(datetime.now(timezone.utc) + timedelta(days=0))
    },
    {
        "user_id": "user_002",
        "content": "I just got a promotion at work! It’s been such a long journey, and I’m beyond excited. I can’t wait to celebrate with my family tonight.",
        "emotions": {
            "joy": 9,
            "surprise": 5,
            "neutral": 1,
            "sadness": 0
        },
        "date": str(datetime.now(timezone.utc) + timedelta(days=1))
    },
    {
        "user_id": "user_003",
        "content": "I had a really productive day today. I got a lot of work done and checked off everything on my to-do list. It feels good to be so organized.",
        "emotions": {
            "joy": 4,
            "neutral": 6,
            "surprise": 2
        },
        "date": str(datetime.now(timezone.utc) + timedelta(days=-1))
    },
    {
        "user_id": "user_003",
        "content": "I’m feeling really overwhelmed today. I have so much to do, and I don’t know where to start. I wish I had more time in the day.",
        "emotions": {
            "sadness": 7,
            "anger": 3,
            "neutral": 2
        },
        "date": str(datetime.now(timezone.utc) + timedelta(days=0))
    },
    {
        "user_id": "user_003",
        "content": "Had a quiet day today. Nothing much happened, just the usual routine of work and rest. I guess it's one of those neutral days.",
        "emotions": {
            "neutral": 8,
            "joy": 2,
            "sadness": 1,
            "surprise": 0
        },
        "date": str(datetime.now(timezone.utc) + timedelta(days=1))
    },

    {
        "user_id": "user_004",
        "content": "I had a great day today! I spent the afternoon with friends, and we had a lot of fun. It’s nice to take a break and relax.",
        "emotions": {
            "joy": 8,
            "neutral": 4,
            "surprise": 2
        },
        "date": str(datetime.now(timezone.utc) + timedelta(days=0))
    },
    {
        "user_id": "user_004",
        "content": "I’m feeling really tired today. I didn’t get much sleep last night, and I’m struggling to stay awake. I wish I had more energy.",
        "emotions": {
            "sadness": 4,
            "neutral": 5,
            "surprise": 1
        },
        "date": str(datetime.now(timezone.utc) + timedelta(days=1))
    },
    {
        "user_id": "user_004",
        "content": "Something really strange happened today at the store. A random person complimented me, and it felt so unexpected. I didn’t know how to react!",
        "emotions": {
            "surprise": 7,
            "neutral": 4,
            "joy": 3,
            "fear": 2
        },
        "date": str(datetime.now(timezone.utc) + timedelta(days=2))
    },
    {
        "user_id": "user_005",
        "content": "I had a great day today! I went for a hike in the mountains, and the views were amazing. It’s nice to get outside and enjoy nature.",
        "emotions": {
            "joy": 7,
            "neutral": 3,
            "surprise": 2
        },
        "date": str(datetime.now(timezone.utc) + timedelta(days=0))
    },
    {
        "user_id": "user_005",
        "content": "I’m feeling really stressed today. I have a lot of deadlines coming up, and I’m worried I won’t finish everything on time. I wish I had more hours in the day.",
        "emotions": {
            "fear": 6,
            "anger": 3,
            "neutral": 2
        },
        "date": str(datetime.now(timezone.utc) + timedelta(days=2))
    },
    {
        "user_id": "user_005",
        "content": "I'm feeling uneasy about tomorrow’s presentation. I’ve been rehearsing, but the fear of messing up is still there.",
        "emotions": {
            "fear": 8,
            "neutral": 3,
            "sadness": 2,
            "joy": 1
        },
        "date": str(datetime.now(timezone.utc) + timedelta(days=3))
    },
    {
        "user_id": "user_006",
        "content": "I had a bad interaction with a coworker. It was frustrating, and now I’m trying to calm down. I hate feeling this way.",
        "emotions": {
            "anger": 7,
            "disgust": 5,
            "neutral": 2,
            "sadness": 3
        },
        "date": str(datetime.now(timezone.utc) + timedelta(days=0))
    }
]

for record in data:
    requests.post("http://localhost:8000/api/v1/journals", json=record)
