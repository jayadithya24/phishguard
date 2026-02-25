from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import pickle

# Sample dataset
texts = [
    "verify your bank account urgently",
    "click here to claim loan",
    "congratulations you won money",
    "government scheme apply now",
    "meeting scheduled tomorrow",
    "project deadline extended",
    "team lunch tomorrow",
    "submit assignment before friday"
]

labels = [1,1,1,1,0,0,0,0]  # 1 = phishing, 0 = legit

vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(texts)

model = LogisticRegression()
model.fit(X, labels)

pickle.dump(model, open("model.pkl", "wb"))
pickle.dump(vectorizer, open("vectorizer.pkl", "wb"))

print("Model trained and saved.")