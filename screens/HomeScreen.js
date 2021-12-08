import React from 'react';
import { StyleSheet,Text, View,TextInput,TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import dictionary from '../database';
import dictonary from '../database';

export default class HomeScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            text: '',
            isSearchPressed: false,
            word: "",
            lexicalCategory:'',
            examples: [],
            definition: ""
        }
    }

    getWord=(word)=>{
        var text=word.toLowerCase()
        try{
        var word = dictionary[text]["word"]
        var lexicalCategory = dictionary[text]["lexicalCategory"]
        var definition = dictionary[text]["definition"]
        
        this.setState({
            "word": word,
            "definition": definition,
            "lexicalCategory": lexicalCategory
        })
    }
    catch(e){
        alert("This Word Is Not In Our Database")
        this.setState({
            'text': "",
            'isSearchPressed':false
        })
    }
    }

    render(){
        return(
            <View>
                <Text style={{textAlign:'center', fontSize: 30, fontStyle: 'bold', margin: 3}}> THE Offline Dictionary</Text>
                <View>
                    <TextInput style={styles.inputBox} onChangeText={text => {
                            this.setState({
                                text:text,
                                isSearchPressed: false,
                                word: "Loading...",
                                lexicalCategory:'',
                                examples: [],
                                definition: ""
                            });
                        }}
                        value={this.state.text}
                    />
                    <TouchableOpacity style={styles.searchButton} onPress={() => {
                        this.setState({ isSearchPressed:true });
                        this.getWord(this.state.text);
                    }}>
                        SEARCH
                    </TouchableOpacity>
                </View>

            <View style={{flex: 1,}}>
                <View style={styles.detailsContainer}>
                    <Text style={{marginLeft: 30, fontSize:18}}>
                        Word: {this.state.word} 
                    </Text>
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={{marginLeft: 30, fontSize:18}}>
                        Type: {this.state.lexicalCategory}
                    </Text>
                </View>

                <View style={{flexDirection:'row',flexWrap: 'wrap'}}>
                    <Text style={{marginLeft: 30, fontSize:18}}>
                        Definition: {this.state.definition}
                    </Text>
                </View>
            </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    detailsContainer: {
        flex: 1,
    },
    inputBox: {
        width: '80%',
        alignSelf: 'center',
        height: 40,
        justifyContent: 'center',
        backgroundColor: "lightgray",
        borderWidth: 6,
        marginTop:60,
        textAlign: 'center',
    },
    inputBoxContainer: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    searchButton: {
        alignSelf: 'center',
        justifyContent: 'center',
        height: 40,
        width: '5%',
        borderWidth: 3,
        textAlign: 'center',
        flexWrap: 'wrap',
        backgroundColor: 'lightblue',
        margin: 7
    }
})