from transformers import pipeline
import pandas as pd
import plotly.express as px
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

class EmotionDetection:

    def __init__(self):
        # download pre-trained emotion classification model
        self.model = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", top_k=None) # Pytorch 
        self.df = pd.DataFrame() # Pandas Dataframe
        self.preprocessed_text = "" # str

    def processText(self, text: str) -> None:
        # Returns None.
        # This processes the text by removing splitting the text by sentences.
        text = text.lower()     # Convert to lowercase
        text = re.sub('[^\w\s]', '', text)    # Remove special characters and punctuation
        words = nltk.word_tokenize(text)    # Tokenization
        # Remove stop words and apply lemmatization
        lemmatizer = WordNetLemmatizer()
        words = [lemmatizer.lemmatize(word) for word in words if word not in stopwords.words('english')]
        # Join words back into a string
        self.preprocessed_text = ' '.join(words)
        # dataset = {"text": preprocessed_text}
        # self.df = pd.DataFrame(dataset, index=[6])

    def detectEmotions(self, text: str) -> None:
        # Returns None.
        # This uses the model to detect the emotions from the text.
        self.processText(text)
        # compute the emotion of each tweet using the model
        all_emotions = self.model(self.preprocessed_text)
        print(all_emotions)
        self.df["emotion_label"] = [d["label"] for d in all_emotions[0]]
        self.df["emotion_score"] = [d["score"] for d in all_emotions[0]]
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