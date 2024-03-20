import numpy as np
import tensorflow as tf
from tensorflow.keras import layers , activations , models , preprocessing , utils
import pandas as pd

lines = pd.read_table('./mar-eng/mar.txt', names=['eng', 'mar'])
lines.reset_index(level=0, inplace=True)
lines.rename(columns={'index' : 'eng', 'eng' : 'mar', 'mar' : 'c'}, inplace = True)
lines = lines.drop(columns=['c'])
lines = lines.iloc[ 10000 : 20000 ] 
lines.head()

eng_lines = list()
for line in lines.eng:
  eng_lines.append( line )

tokenizer = preprocessing.text.Tokenizer()
tokenizer.fit_on_texts(eng_lines)
tokenized_eng_lines = tokenizer.texts_to_sequences(eng_lines)

length_list = list()
for token_seq in tokenized_eng_lines:
  length_list.append(len(token_seq))
max_input_length = np.array(length_list).max()
print( 'English max length is {}'.format( max_input_length ))

padded_eng_lines = preprocessing.sequence.pad_sequences( tokenized_eng_lines , maxlen=max_input_length , padding='post' )
encoder_input_data = np.array( padded_eng_lines )
print('Encoder input data shape -> {}'.format(encoder_input_data.shape))

eng_word_dict = tokenizer.word_index
num_eng_tokens = len(eng_word_dict)+1
print('Number of Encoder tokens = {}'.format(num_eng_tokens))

mar_lines = list()
for line in lines.mar:
    mar_lines.append('start ' + line + ' end')  # Adding 'start' and 'end' tokens to each Marathi sentence

tokenizer = preprocessing.text.Tokenizer()
tokenizer.fit_on_texts(mar_lines)
tokenized_mar_lines = tokenizer.texts_to_sequences(mar_lines)

length_list = list()
for token_seq in tokenized_mar_lines:
    length_list.append( len( token_seq ))
# Update max_output_length considering 'start' and 'end' tokens
max_output_length = np.array(length_list).max() + 2  # Add 2 for 'start' and 'end' tokens
print( 'Marathi max length is {}'.format( max_output_length ))

padded_mar_lines = preprocessing.sequence.pad_sequences( tokenized_mar_lines , maxlen=max_output_length, padding='post' )
decoder_input_data = np.array( padded_mar_lines )
print( 'Decoder input data shape -> {}'.format( decoder_input_data.shape ))

mar_word_dict = tokenizer.word_index
num_mar_tokens = len( mar_word_dict )+1
print( 'Number of Marathi tokens = {}'.format( num_mar_tokens))

decoder_target_data = list()
for token_seq in tokenized_mar_lines:
    decoder_target_data.append( token_seq[ 1 : ] ) 
    
padded_mar_lines = preprocessing.sequence.pad_sequences( decoder_target_data , maxlen=max_output_length, padding='post' )
onehot_mar_lines = utils.to_categorical( padded_mar_lines , num_mar_tokens )
decoder_target_data = np.array( onehot_mar_lines )
print( 'Decoder target data shape -> {}'.format( decoder_target_data.shape ))

encoder_inputs = tf.keras.layers.Input(shape=( None , ))
encoder_embedding = tf.keras.layers.Embedding( num_eng_tokens, 256 , mask_zero=True ) (encoder_inputs)
encoder_outputs , state_h , state_c = tf.keras.layers.LSTM( 128 , return_state=True  )( encoder_embedding )
encoder_states = [ state_h , state_c ]

decoder_inputs = tf.keras.layers.Input(shape=( None ,  ))
decoder_embedding = tf.keras.layers.Embedding( num_mar_tokens, 256 , mask_zero=True) (decoder_inputs)
decoder_lstm = tf.keras.layers.LSTM( 128 , return_state=True , return_sequences=True)
decoder_outputs , _ , _ = decoder_lstm ( decoder_embedding , initial_state=encoder_states )
decoder_dense = tf.keras.layers.Dense( num_mar_tokens , activation=tf.keras.activations.softmax ) 
output = decoder_dense ( decoder_outputs )

model = tf.keras.models.Model([encoder_inputs, decoder_inputs], output )
model.compile(optimizer=tf.keras.optimizers.RMSprop(), loss='categorical_crossentropy')

model.summary()

# model.fit([encoder_input_data , decoder_input_data], decoder_target_data, batch_size=250, epochs=50 ) 
# model.save( 'model.h5' ) 

def make_inference_models():
    
    encoder_model = tf.keras.models.Model(encoder_inputs, encoder_states)
    
    decoder_state_input_h = tf.keras.layers.Input(shape=( 128 ,))
    decoder_state_input_c = tf.keras.layers.Input(shape=( 128 ,))
    
    decoder_states_inputs = [decoder_state_input_h, decoder_state_input_c]
    
    decoder_outputs, state_h, state_c = decoder_lstm(
        decoder_embedding , initial_state=decoder_states_inputs)
    decoder_states = [state_h, state_c]
    decoder_outputs = decoder_dense(decoder_outputs)
    decoder_model = tf.keras.models.Model(
        [decoder_inputs] + decoder_states_inputs,
        [decoder_outputs] + decoder_states)
    
    return encoder_model , decoder_model

def str_to_tokens(sentence: str):
    tokens_list = []
    words = sentence.lower().split()
    for word in words:
        if word in eng_word_dict:
            tokens_list.append(eng_word_dict[word])
        else:
            tokens_list.append(0)  # Use 0 for out-of-vocabulary words
    return preprocessing.sequence.pad_sequences([tokens_list], maxlen=max_input_length, padding='post')




enc_model , dec_model = make_inference_models()

for epoch in range( encoder_input_data.shape[0] ):
    states_values = enc_model.predict( str_to_tokens( input( 'Enter eng sentence : ' ) ) )
    #states_values = enc_model.predict( encoder_input_data[ epoch ] )
    empty_target_seq = np.zeros( ( 1 , 1 ) )
    empty_target_seq[0, 0] = mar_word_dict['start']
    stop_condition = False
    decoded_translation = ''
    while not stop_condition :
        dec_outputs , h , c = dec_model.predict([ empty_target_seq ] + states_values )
        sampled_word_index = np.argmax( dec_outputs[0, -1, :] )
        sampled_word = None
        for word , index in mar_word_dict.items() :
            if sampled_word_index == index :
                decoded_translation += ' {}'.format( word )
                sampled_word = word
        
        if sampled_word == 'end' or len(decoded_translation.split()) > max_output_length:
            stop_condition = True
            
        empty_target_seq = np.zeros( ( 1 , 1 ) )  
        empty_target_seq[ 0 , 0 ] = sampled_word_index
        states_values = [ h , c ] 

    print( decoded_translation )