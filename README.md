# JustVent
Mindfulness & Journaling App with Prompts
## Core Idea
A self-reflection app that helps users with guided journaling based on mindfulness principles. It provides daily prompts to help users reflect on their day and set goals for emotional, mental, and spiritual growth.
## Features
- Daily or weekly journaling prompts
- Mood tracker (connected to journal entries)
- Personalized affirmations based on previous entries
- Visual data representation (e.g., charts showing emotional growth)
## How it works
We used a J Hartmann's fine tuned model Emotion English DistilRoBERTa-base to classify text into emotions [[1]](#1). This model can classify text into 7 different emotions based on a score:
1. Anger
2. Disgust
3. Fear
4. Joy
5. Neutral
6. Sadness
7. Surprise

We split each journal entry by sentence, then classify each emotion detected by the model. Using the emotions detected we can keep track of the users progress and what main emotions they felt each day. The goal is for as users continue using this model they will tend to feel more positive emotions and less negative emotions overtime. This is thanks to gratitude. We expect each user at the end of their journal entry to write one thing they are thankful for that day. Research has shown that people who tend to focus more on what they're thankful for tend to be happier [[2]](#2).

## References
<a id="1">[1]<a>
https://huggingface.co/j-hartmann/emotion-english-distilroberta-base 

<a id="2">[2]<a>
https://www.health.harvard.edu/healthbeat/giving-thanks-can-make-you-happier#:~:text=In%20positive%20psychology%20research%2C%20gratitude,express%20gratitude%20in%20multiple%20ways
