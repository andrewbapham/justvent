from transformers import pipeline
import pandas as pd
import plotly.express as px
import re

class EmotionDetection:

    def __init__(self):
        # download pre-trained emotion classification model
        self.model = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base") # Pytorch 
        self.df = pd.DataFrame() # Pandas Dataframe
    
    def translateText(self, text: str) -> None:
        text = re.split('([.!?])', string)
        dataset = {"text": [x+y for x,y in zip(text[0::2], text[1::2])]}
        self.df = pd.DataFrame(dataset)
    
    def detectEmotions(self, text) -> None:
        self.translateText(text)
        # compute the emotion of each tweet using the model
        all_texts = self.df["text"].values.tolist()
        all_emotions = self.model(all_texts)
        self.df["emotion_label"] = [d["label"] for d in all_emotions]
        self.df["emotion_score"] = [d["score"] for d in all_emotions]
    
    def getEmotions(self) -> list[dict[int]] | None:
        if self.df.empty:
            return None
        
        percentage_dist = self.df["emotion_label"].value_counts(normalize=True) * 100
        return {emotion: percentage for emotion, percentage in percentage_dist.items()}
    
    def plotEmotions(self) -> None:
        # plot emotions found in tweets
        plot_title = f"Emotions found in tweets"
        fig = px.histogram(self.df, x="emotion_label", template="plotly_dark",
                        title=plot_title, color="emotion_label")
        fig.update_layout(showlegend=False)
        fig.show()

detector = EmotionDetection()
#"Today started off a little slow, but I managed to make it productive. I woke up later than I wanted to, but I decided not to let it affect my mood. After breakfast, I got to work on the tasks I set for myself the night before. I had a couple of meetings that went smoothly. My afternoon was focused on a project I've been chipping away at for a few weeks. It’s finally starting to come together, and that gave me a sense of accomplishment."
string = "I am sad! Today started off a little slow, but I managed to make it productive. I woke up later than I wanted to, but I decided not to let it affect my mood? After breakfast, I got to work on the tasks I set for myself the night before. I had a couple of meetings that went smoothly. My afternoon was focused on a project I've been chipping away at for a few weeks. It’s finally starting to come together, and that gave me a sense of accomplishment."
detector.detectEmotions(string)
print(detector.getEmotions())