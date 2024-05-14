import os
import numpy as np # type: ignore
import pandas as pd # type: ignore
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer # type: ignore
from tensorflow.keras.preprocessing.sequence import pad_sequences # type: ignore
from googletrans import Translator # type: ignore
from tensorflow.keras.models import Sequential, load_model # type: ignore
from tensorflow.keras.layers import LSTM, Dense, Embedding, RepeatVector # type: ignore

class TranslateEngToHin:
    def __init__(self) -> None:
        self.tokenizer_eng = Tokenizer()
        self.tokenizer_hindi = Tokenizer()
        self.model = None
        self.max_len = None

    def translate_sentence(self, sentence):
        # Tokenize the input sentence
        seq = self.tokenizer_eng.texts_to_sequences([sentence])
        
        # Pad the sequence to the maximum length
        padded = pad_sequences(seq, maxlen=22, padding='post')
        
        # Get the translation
        prediction = self.model.predict(padded)
        prediction = np.argmax(prediction, axis=-1)
        hindi_sentence = ''
        for word_index in prediction[0]:
            if word_index == 0:
                break
            word = self.tokenizer_hindi.index_word[word_index]
            hindi_sentence += word + ' '
        return hindi_sentence.strip()
        
    def translate_text(self, sentence):
        # Load dataset
        dataset_path = "EngToHindi.csv"
        df = pd.read_csv(dataset_path)
        # Separate English and Hindi sentences
        english_sentences = df["English"].tolist()
        hindi_sentences = df["Hindi"].tolist()
        # Tokenization
        self.tokenizer_eng.fit_on_texts(english_sentences)
        vocab_size_eng = len(self.tokenizer_eng.word_index) + 1
        self.tokenizer_hindi.fit_on_texts(hindi_sentences)
        vocab_size_hindi = len(self.tokenizer_hindi.word_index) + 1
        # Find the maximum length among both languages
        self.max_len = max(
            max(len(sentence.split()) for sentence in english_sentences),
            max(len(sentence.split()) for sentence in hindi_sentences)
        )
        # Encoding sequences
        eng_sequences = self.tokenizer_eng.texts_to_sequences(english_sentences)
        hindi_sequences = self.tokenizer_hindi.texts_to_sequences(hindi_sentences)
        eng_pad_sequences = pad_sequences(eng_sequences, maxlen=self.max_len, padding='post')
        hindi_pad_sequences = pad_sequences(hindi_sequences, maxlen=self.max_len, padding='post')
        # Define model file path
        model_file_path = "translation_model_hin.h5"
        # Check if model file exists
        if os.path.exists(model_file_path):
            self.model = load_model(model_file_path)
        else:
            # Define model
            self.model = Sequential()
            self.model.add(Embedding(vocab_size_eng, 256, input_length=self.max_len, mask_zero=True))
            self.model.add(LSTM(256))
            self.model.add(RepeatVector(self.max_len))
            self.model.add(LSTM(256, return_sequences=True))
            self.model.add(Dense(vocab_size_hindi, activation='softmax'))
            self.model.compile(optimizer='adam', loss='sparse_categorical_crossentropy')
            # Train model
            self.model.fit(eng_pad_sequences, np.expand_dims(hindi_pad_sequences, axis=-1), batch_size=2, epochs=100)
            self.model.save(model_file_path)
        
        translator = Translator()
        transHin1 = self.translate_sentence(sentence)
        transHin2 = translator.translate(sentence, src='en', dest='hi')
        if not transHin2:
            return transHin1
        return transHin2.text
    
    def translate_English(self, sentence):
        return self.translate_text(sentence)