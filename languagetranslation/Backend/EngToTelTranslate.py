import os
import numpy as np # type: ignore
import pandas as pd # type: ignore
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer # type: ignore
from tensorflow.keras.preprocessing.sequence import pad_sequences # type: ignore
from googletrans import Translator # type: ignore
from tensorflow.keras.models import Sequential, load_model # type: ignore
from tensorflow.keras.layers import LSTM, Dense, Embedding, RepeatVector # type: ignore

class TranslateEngToTel:
    def __init__(self) -> None:
        self.tokenizer_eng = Tokenizer()
        self.tokenizer_telugu = Tokenizer()
        self.model = None
        self.max_len_eng = None
        self.max_len_telugu = None

    def translate_sentence(self, sentence):
        # Tokenize and pad the input sentence
        seq = self.tokenizer_eng.texts_to_sequences([sentence])
        padded = pad_sequences(seq, maxlen=22, padding='post')
        # Get the translation
        prediction = self.model.predict(padded)
        prediction = np.argmax(prediction, axis=-1)
        telugu_sentence = ''
        for word_index in prediction[0]:
            if word_index == 0:
                break
            word = self.tokenizer_telugu.index_word[word_index]
            telugu_sentence += word + ' '
        return telugu_sentence.strip()
        
    def translate_text(self, sentence):
        # Load dataset
        dataset_path = "EngToTel.csv"
        df = pd.read_csv(dataset_path)
        # Seperate English and telugu sentences
        english_sentences = df["English"].tolist()
        telugu_sentences = df["Telugu"].tolist()
        # Tokenization
        self.tokenizer_eng.fit_on_texts(english_sentences)
        vocab_size_eng = len(self.tokenizer_eng.word_index) + 1
        self.max_len_eng = max(len(sentence.split()) for sentence in english_sentences)
        self.tokenizer_telugu.fit_on_texts(telugu_sentences)
        vocab_size_telugu = len(self.tokenizer_telugu.word_index) + 1
        self.max_len_telugu = max(len(sentence.split()) for sentence in telugu_sentences)
        # Encoding sequences
        eng_sequences = self.tokenizer_eng.texts_to_sequences(english_sentences)
        telugu_sequences = self.tokenizer_telugu.texts_to_sequences(telugu_sentences)
        eng_pad_sequences = pad_sequences(eng_sequences, maxlen=self.max_len_eng, padding='post')
        telugu_pad_sequences = pad_sequences(telugu_sequences, maxlen=self.max_len_telugu, padding='post')
        # Define model file path
        model_file_path = "translation_model_tel.h5"
        # Check if model file exists
        if os.path.exists(model_file_path):
            self.model = load_model(model_file_path)
        else:
            # Define model
            self.model = Sequential()
            self.model.add(Embedding(vocab_size_eng, 256, input_length=self.max_len_eng, mask_zero=True))
            self.model.add(LSTM(256))
            self.model.add(RepeatVector(self.max_len_telugu))
            self.model.add(LSTM(256, return_sequences=True))
            self.model.add(Dense(vocab_size_telugu, activation='softmax'))
            self.model.compile(optimizer='adam', loss='sparse_categorical_crossentropy')
            # Train model
            self.model.fit(eng_pad_sequences, np.expand_dims(telugu_pad_sequences, axis=-1), batch_size=2, epochs=100)
            self.model.save(model_file_path)
        
        translator = Translator()
        transTel1 = self.translate_sentence(sentence)
        transTel2 = translator.translate(sentence, src='en', dest='te')
        if not transTel2:
            return transTel1
        return transTel2.text
    
    def translate_English(self, sentence):
        return self.translate_text(sentence)