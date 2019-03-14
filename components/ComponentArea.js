import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native'
import { Formik } from 'formik'


export default class CommentsArea extends Component {
    state = {
        comments: ['Algo.....']
    }

    render() {
        return (
            <Formik
                initialValues={{ comment: 'Valor Inicial' }}
                validate={(values) => {
                    const errors = {}
                    if (!errors.comment)
                    {
                        errors.comment = 'o campo cometario e obrigatoro'
                    }
                }}
                onSubmit={values => {
                    console.warn(values)
                }}
            >
                {
                    (props) => {
                        return (
                            <View>
                                <TextInput
                                    onChangeText={props.handleChange('comment')}
                                    onBlur={props.handleBlur('comment')}
                                    value={props.values.comment}
                                />
                                <Button title="Enviar comentario"
                                    onPress={props.handleSubmit} />
                                {
                                    this.state.comments.map((comment, indice) => {
                                        return (
                                            <View key={indice}>
                                                <Text>Comentario: {comment}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        )
                    }
                }
            </Formik>
        )
    }
}

