from datetime import datetime, timedelta
from emotion_detection import EmotionDetection
from routers.journals import create_journal

detector = EmotionDetection()
start_date = datetime(2024, 8, 1)
journal_entries = [
    "I started September with a clear mind. I had a productive day at work.",
    "Went for a long walk today. It felt great to be outside.",
    "Caught up with an old friend over coffee. It was so refreshing!",
    "Had a tough day at work. Feeling a bit overwhelmed with my tasks.",
    "Took some time to relax today. I watched a movie and unwound.",
    "Finally completed the project I was working on for weeks. So satisfying!",
    "Feeling more positive today. Started planning a new hobby project.",
    "Today was hectic, but I managed to handle it all. Feeling accomplished.",
    "Spent some quality time with family. Feeling loved and grateful.",
    "A quiet day. Just enjoyed some alone time and reflection.",
    "Work was busy today, but I stayed focused and got everything done.",
    "Feeling stressed about upcoming deadlines, but I’ll manage.",
    "Had a nice dinner with friends. It was great to catch up.",
    "Feeling a bit under the weather, took it easy today.",
    "Got some great feedback at work. Feeling motivated to keep improving.",
    "Tried out a new recipe today. It turned out amazing!",
    "Feeling a bit anxious about the future, but trying to stay positive.",
    "Had a productive meeting today. I think we're making great progress.",
    "Went for a bike ride. It helped clear my mind.",
    "Today was a good day. Managed to complete all my tasks early.",
    "Feeling a bit tired, but happy with the progress I’ve made at work.",
    "Had a productive workout session today. Feeling energized.",
    "Finished reading a book I’ve been working through for a while.",
    "Today was tough. A lot of unexpected things happened at work.",
    "Grateful for the small wins today. Every step counts.",
    "Feeling a bit down, but I know tomorrow is a new day.",
    "Ended the day on a positive note with some self-care."
]

data = [{
        "user_id": "user_001",
        "content": journal_entries[i],
        "emotions": detector.getEmotions(journal_entries[i]),
        "date": str(start_date + timedelta(days=i))
    } for i in range(len(journal_entries))
]

for record in data:
   create_journal(record)
