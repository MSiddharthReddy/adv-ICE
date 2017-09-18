import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import axios from 'axios';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

let { width, height } =  Dimensions.get('window');
[width, height] = [width - 2, height]
const markers = `https://ireports.herokuapp.com/markers`;
const geolocation = navigator.geolocation;

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      region : {
        latitude: 33.785834,
        longitude: -120.40641,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      markers: []
    }
  }

  componentWillMount = () => {
    const that = this;
    axios.get(markers)
  .then(function (response) {
    console.log(response);
    that.setState({
      markers: response.data
    })
  })
  .catch(function (error) {
    console.log(error);
  });
    console.log('before', this.state.region)
    geolocation.getCurrentPosition(
      location => {
        this.setState({
        region : {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
      });
        console.log('after', this.state.region)
      }
    )
  }

  onRegionChange(region) {
  console.log(this);
  this.setState({ region });
}

onMapClick(e) {
axios.post(markers,{
  latitude: e.nativeEvent.coordinate.latitude,
  longitude: e.nativeEvent.coordinate.longitude,
  title: 'New Pointer',
  description: 'There is a new raid'
}).then(function (response) {
  console.log(response);
});

  console.log(e.nativeEvent);
  let markers = this.state.markers;
  markers.push({
    latlng: e.nativeEvent.coordinate,
    title: 'Pointer'
  });
  this.setState({
    markers
  })
  console.log(this.state.markers)
}


  render() {

    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{
            flex: 1,
            height,
            width
          }}
          region={this.state.region}
          onRegionChange={this.onRegionChange.bind(this)}
          onPress={this.onMapClick.bind(this)}
  >
    {this.state.markers.map(marker => (
    <MapView.Marker
      coordinate={marker.latlng}
      title={marker.title}
    />
    ))}
  </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderColor: 'black',
    borderWidth: 2
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

// AppRegistry.registerComponent('advICE', () => advICE);
