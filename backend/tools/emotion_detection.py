from transformers import pipeline
import pandas as pd
import plotly.express as px
import re

class EmotionDetection:

    def __init__(self):
        # download pre-trained emotion classification model
        self.model = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base") # Pytorch 
        self.df = pd.DataFrame() # Pandas Dataframe

    def processText(self, text: str) -> None:
        # Returns None.
        # This processes the text by removing splitting the text by sentences.
        text = re.split('[.!?]', text)
        dataset = {"text": text[:-1]}
        self.df = pd.DataFrame(dataset)

    def detectEmotions(self, text: str) -> None:
        # Returns None.
        # This uses the model to detect the emotions from the text.
        self.processText(text)
        # compute the emotion of each tweet using the model
        all_texts = self.df["text"].values.tolist()
        all_emotions = self.model(all_texts)
        self.df["emotion_label"] = [d["label"] for d in all_emotions]
        self.df["emotion_score"] = [d["score"] for d in all_emotions]
        print(self.df)

    def getEmotions(self, text: str=None) -> list[dict[int]] | None:
        # This returns the emotions stored in the dataframe
        # if the dataframe is empty it will return None.
        if text:
            self.detectEmotions(text)

        if self.df.empty:
            return None

        percentage_dist = self.df["emotion_label"].value_counts(normalize=True)
        return {emotion: percentage for emotion, percentage in percentage_dist.items()}

    def plotEmotions(self) -> None:
        # Plots the emotions detected by the model.
        if self.df.empty:
            return None

        plot_title = f"Emotions found in journal"
        fig = px.histogram(self.df, x="emotion_label", template="plotly_dark",
                        title=plot_title, color="emotion_label")
        fig.update_layout(showlegend=False)
        fig.show()

# detector = EmotionDetection()
# string = "I am sad! Today started off a little slow, but I managed to make it productive. I woke up later than I wanted to, but I decided not to let it affect my mood? After breakfast, I got to work on the tasks I set for myself the night before. I had a couple of meetings that went smoothly. My afternoon was focused on a project I've been chipping away at for a few weeks. It’s finally starting to come together, and that gave me a sense of accomplishment."
# detector.detectEmotions(string)
# detector.plotEmotions()