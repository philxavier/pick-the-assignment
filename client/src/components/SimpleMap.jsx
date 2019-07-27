import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import TemplateConsulate from "./TemplateConsulate.jsx";
import TemplateEmbassy from "./TemplateEmbassy.jsx";
import TemplateMission from "./TemplateMission.jsx";
import Axios from "axios";
import { connect } from "react-redux";
import { setFullListOfPosts } from "../../../store/actions/SimpleMapAction.jsx";
import { Popup } from "semantic-ui-react";

class SimpleMap extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //AS SOON AS THE MAP RENDERS, WE GET ALL THE POSTS AND SEND IT TO STATE
    Axios.get("/posts")
      .then(result => {
        this.props.setFullListOfPosts(result.data);
      })
      .catch(err => {
        console.log("there was an error in component did mount", err);
      });
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div
        style={{
          height: "80vh",
          width: "90%",
          margin: "0 auto",
          background: "#38304C",
          paddingLeft: "5%",
          paddingRight: "5%"
        }}
      >
        <GoogleMapReact
          //PROVIDE THE GOOGLE API KEY TO THIS PROPERTY. THAT IS HOW THE COMPONENT WORKS
          bootstrapURLKeys={{ key: process.env.google_api }}
          //SET THE INITIAL CENTER AND ZOOM OF THE MAP
          center={this.props.center}
          zoom={this.props.zoom}
        >
          {/* THE COMPONENT IS GOING TO LOOP THROUGH FILTEREDLISTOFPOSTS ARRAY AND RENDER THE POSTS ACCORDING TO THE TYPE */}
          {this.props.filteredListOfPosts.map((ele, ind) => {
            if (ele.type.includes("c")) {
              return (
                <TemplateConsulate
                  src={`https://s3-us-west-1.amazonaws.com/mvp-sprint/${
                    ele.name
                  }.jpg`}
                  key={ind}
                  nameOfCity={ele.name}
                  lat={ele.lat}
                  lng={ele.lng}
                  classPost={ele.class}
                  cost={ele.cost}
                  boss={ele.boss}
                  photos={ele.photos}
                />
              );
            } else if (ele.type === "e") {
              return (
                <TemplateEmbassy
                  src={`https://s3-us-west-1.amazonaws.com/mvp-sprint/${
                    ele.name
                  }.jpg`}
                  key={ind}
                  nameOfCity={ele.name}
                  lat={ele.lat}
                  lng={ele.lng}
                  classPost={ele.class}
                  cost={ele.cost}
                  boss={ele.boss}
                  photos={ele.photos}
                />
              );
            } else {
              return (
                <TemplateMission
                  src={`https://s3-us-west-1.amazonaws.com/mvp-sprint/${
                    ele.name
                  }.jpg`}
                  key={ind}
                  nameOfCity={ele.name}
                  lat={ele.lat}
                  lng={ele.lng}
                  classPost={ele.class}
                  cost={ele.cost}
                  boss={ele.boss}
                  photos={ele.photos}
                />
              );
            }
          })}
        </GoogleMapReact>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    filters: state.filters,
    postFromSearchbar: state.postFromSearchbar,
    center: state.center,
    zoom: state.zoom,
    type: state.filters.type,
    classOfPost: state.filters.classOfPost,
    currentRates: state.filters.currentRates,
    filteredListOfPosts: state.filteredListOfPosts,
    fullListOfPosts: state.fullListOfPosts
  };
};
const mapDispatchToProps = dispatch => {
  return {
    reRenderMap: resultArray => {
      dispatch(reRenderMap(resultArray));
    },
    setFullListOfPosts: fullListOfPosts => {
      dispatch(setFullListOfPosts(fullListOfPosts));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SimpleMap);
