import React, { Component } from 'react'
import MissionImg from './MissionImg.jsx';

export default class TemplateMission extends Component {

  constructor(props) {
        super(props)    
  }
        
  render() {
    let {classPost, photos, nameOfCity, boss, cost, src} = this.props;
    return (
      <div> 
         <MissionImg photos={photos} nameOfCity={nameOfCity} classPost={classPost} boss={boss} cost={cost} src={src}/>
      </div>
    )
  }
}


