from transformers import pipeline
import pandas as pd
import plotly.express as px
import re

#"Today started off a little slow, but I managed to make it productive. I woke up later than I wanted to, but I decided not to let it affect my mood. After breakfast, I got to work on the tasks I set for myself the night before. I had a couple of meetings that went smoothly. My afternoon was focused on a project I've been chipping away at for a few weeks. It’s finally starting to come together, and that gave me a sense of accomplishment."
string = "I am sad! Today started off a little slow, but I managed to make it productive. I woke up later than I wanted to, but I decided not to let it affect my mood? After breakfast, I got to work on the tasks I set for myself the night before. I had a couple of meetings that went smoothly. My afternoon was focused on a project I've been chipping away at for a few weeks. It’s finally starting to come together, and that gave me a sense of accomplishment."
string = re.split('([.!?])', string)
dataset = {"text": [x+y for x,y in zip(string[0::2], string[1::2])]}
df = pd.DataFrame(dataset)

# download pre-trained emotion classification model
model = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", top_k=None)

# compute the emotion of each tweet using the model
all_texts = df["text"].values.tolist()
all_emotions = model(all_texts)
print(all_emotions)
df["emotion_label"] = [d["label"] for d in all_emotions]
df["emotion_score"] = [d["score"] for d in all_emotions]
print(df)

# plot emotions found in tweets
plot_title = f"Emotions found in tweets"
fig = px.histogram(df, x="emotion_label", template="plotly_dark",
                   title=plot_title, color="emotion_label")
fig.update_layout(showlegend=False)
fig.show()