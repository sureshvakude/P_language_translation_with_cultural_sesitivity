import os
import numpy as np # type: ignore
import pandas as pd # type: ignore
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer # type: ignore
from tensorflow.keras.preprocessing.sequence import pad_sequences # type: ignore
from googletrans import Translator # type: ignore
from tensorflow.keras.models import Sequential, load_model # type: ignore
from tensorflow.keras.layers import LSTM, Dense, Embedding, RepeatVector # type: ignore

class TranslateEngToMar:
    def __init__(self) -> None:
        self.tokenizer_eng = Tokenizer()
        self.tokenizer_marathi = Tokenizer()
        self.model = None
        self.max_len_eng = None
        self.max_len_marathi = None

    def translate_sentence(self, sentence):
        # Tokenize and pad the input sentence
        seq = self.tokenizer_eng.texts_to_sequences([sentence])
        padded = pad_sequences(seq, maxlen=self.max_len_eng, padding='post')
        # Get the translation
        prediction = self.model.predict(padded)
        prediction = np.argmax(prediction, axis=-1)
        marathi_sentence = ''
        for word_index in prediction[0]:
            if word_index == 0:
                break
            word = self.tokenizer_marathi.index_word[word_index]
            marathi_sentence += word + ' '
        return marathi_sentence.strip()
        
    def translate_text(self, sentence):
        # Load dataset
        dataset_path = "EngToMar.csv"
        df = pd.read_csv(dataset_path)
        # Seperate English and Marathi sentences
        english_sentences = df["English"].tolist()
        marathi_sentences = df["Marathi"].tolist()
        # Tokenization
        self.tokenizer_eng.fit_on_texts(english_sentences)
        vocab_size_eng = len(self.tokenizer_eng.word_index) + 1
        self.max_len_eng = max(len(sentence.split()) for sentence in english_sentences)
        self.tokenizer_marathi.fit_on_texts(marathi_sentences)
        vocab_size_marathi = len(self.tokenizer_marathi.word_index) + 1
        self.max_len_marathi = max(len(sentence.split()) for sentence in marathi_sentences)
        # Encoding sequences
        eng_sequences = self.tokenizer_eng.texts_to_sequences(english_sentences)
        marathi_sequences = self.tokenizer_marathi.texts_to_sequences(marathi_sentences)
        eng_pad_sequences = pad_sequences(eng_sequences, maxlen=self.max_len_eng, padding='post')
        marathi_pad_sequences = pad_sequences(marathi_sequences, maxlen=self.max_len_marathi, padding='post')
        # Define model file path
        model_file_path = "translation_model.h5"
        # Check if model file exists
        if os.path.exists(model_file_path):
            self.model = load_model(model_file_path)
        else:
            # Define model
            self.model = Sequential()
            self.model.add(Embedding(vocab_size_eng, 256, input_length=self.max_len_eng, mask_zero=True))
            self.model.add(LSTM(256))
            self.model.add(RepeatVector(self.max_len_marathi))
            self.model.add(LSTM(256, return_sequences=True))
            self.model.add(Dense(vocab_size_marathi, activation='softmax'))
            self.model.compile(optimizer='adam', loss='sparse_categorical_crossentropy')
            # Train model
            self.model.fit(eng_pad_sequences, np.expand_dims(marathi_pad_sequences, axis=-1), batch_size=2, epochs=100)
            self.model.save(model_file_path)
        
        translator = Translator()
        transMar1 = self.translate_sentence(sentence)
        transMar2 = translator.translate(sentence, src='en', dest='mr')
        if not transMar2:
            return transMar1
        return transMar2.text
    
    def translate_English(self, sentence):
        return self.translate_text(sentence)