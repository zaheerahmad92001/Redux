import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList } from 'react-native';
import ListItem from './src/components/ListItem';
import { connect } from 'react-redux';
import {addPlace} from './src/actions/place' 


class App extends Component {
  
 constructor(props){
super(props)

 }

  state = {
    placeName: '',
   // places: []
  }

  placeSubmitHandler = () => {
    
    if(this.state.placeName.trim() === '') {
      return;
    }
      console.log("aaa",this.props)
     this.props.add(this.state.placeName);
     console.log("bbb",this.props)
}

placeNameChangeHandler = (value) => {
  this.setState({
    placeName: value
  });    
}

placesOutput = () => {
   return (
    <FlatList style = { styles.listContainer }
      data = { this.props.placesdata }
      keyExtractor={(item, index) => index.toString()}
      renderItem = { info => (
        <ListItem 
          placeName={ info.item.value }
        />
      )}
    />
  )
}

render() {
  return (
    <View style={ styles.container }>
      <View style = { styles.inputContainer }>
        <TextInput
          placeholder = "Seach Places"
          style = { styles.placeInput }
          value = { this.state.placeName }
          onChangeText = { this.placeNameChangeHandler }
        ></TextInput>
        <Button title = 'Add' 
          style = { styles.placeButton }
          onPress = { this.placeSubmitHandler }
        />
        </View>
        <View style = { styles.listContainer }>
          { this.placesOutput() }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  placeInput: {
    width: '70%'
  },
  placeButton: {
    width: '30%'
  },
  listContainer: {
    width: '100%'
  }
});

const mapStateToProps = state => {
  return {
    placesdata: state.InsideStoreReducerName.places
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    add: (name) => {
      dispatch(addPlace(name))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)