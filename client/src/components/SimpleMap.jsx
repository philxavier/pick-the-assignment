import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import google_api from '../../../google_api.js';
import TemplateConsulate from './TemplateConsulate.jsx';
import TemplateEmbassy from './TemplateEmbassy.jsx';
import TemplateMission from './TemplateMission.jsx';
import Axios from 'axios';
import HelperFuncs from '../../../HelperFuncs.js';


class SimpleMap extends Component {

  constructor(props) {
    super(props) 
    this.state = {
      fullListOfPosts: [],
      filteredListOfPosts:[],
      center: this.props.center,
      zoom: this.props.zoom
    }
        
  } 

  componentDidMount() {

    Axios.get('/posts')
      .then((result) => {
        console.log('these are the results', result)
          this.setState({
            fullListOfPosts:result.data
          })
        })
      .catch((err) => {
        console.log('there was an error in component did mount', err)
      })
  }

  
  componentDidUpdate(prevProps) {
    //if props are modified, lets filter the full list of posts and make into filtered list of posts so it can be rendered
    if(prevProps !== this.props) {

      let filterOfClass = this.props.classOfPost;
      let filterOfType = this.props.type;
      let filterOfRates = this.props.currentRates;

      filterOfClass === undefined ? [] : filterOfClass;
      filterOfType === undefined ? [] : filterOfType;
      filterOfRates === undefined ? [] : filterOfRates;

      let filteredArray = this.state.fullListOfPosts.slice();

      let filteredByType = HelperFuncs.filterByType(filteredArray, filterOfType);
      let filteredByClass = HelperFuncs.filterByClass(filteredArray, filterOfClass);
      let filteredByRates = HelperFuncs.filterByRates(filteredArray, filterOfRates);

      let resultArray = HelperFuncs.mergeArrays(filteredByClass, filteredByRates, filteredByType);
           
      this.setState({
        filteredListOfPosts:resultArray
      })
    }
    
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '75vh', width: '80%', margin: '0px', background: '#282C34', paddingLeft: '7%' }}>

        <GoogleMapReact
          bootstrapURLKeys={{ key: google_api.key}}
          center={this.state.center}
          zoom={this.state.zoom}
        >

          {this.state.filteredListOfPosts.map((ele, ind) => {
            if (ele.type.includes('c')) {
              return <TemplateConsulate 
                        src={`https://s3-us-west-1.amazonaws.com/mvp-sprint/${ele.name}.jpg`}
                        key={ind} 
                        nameOfCity={ele.name} 
                        lat={ele.lat} 
                        lng={ele.lng} 
                        classPost={ele.class} 
                        cost={ele.cost} 
                        boss={ele.boss}
                        photos={ele.photos}
                      />
            
            } else if(ele.type === "e") {
              return <TemplateEmbassy
                        src={`https://s3-us-west-1.amazonaws.com/mvp-sprint/${ele.name}.jpg`}
                        key={ind} 
                        nameOfCity={ele.name} 
                        lat={ele.lat} 
                        lng={ele.lng} 
                        classPost={ele.class} 
                        cost={ele.cost} 
                        boss={ele.boss}
                        photos={ele.photos}
                      />
            } else {
              return <TemplateMission
                        src={`https://s3-us-west-1.amazonaws.com/mvp-sprint/${ele.name}.jpg`}
                        key={ind} 
                        nameOfCity={ele.name} 
                        lat={ele.lat} 
                        lng={ele.lng} 
                        classPost={ele.class} 
                        cost={ele.cost} 
                        boss={ele.boss}
                        photos={ele.photos}
                      />
            }
          })}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;