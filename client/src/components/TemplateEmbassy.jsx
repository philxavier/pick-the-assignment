import React, { Component } from 'react'
import EmbassyImg from './EmbassyImg.jsx';


export default class TemplateEmbassy extends Component {

  constructor(props) {
        super(props)
        this.state = {   
        }
  }

  render() {
    let {classPost, src, nameOfCity, boss, cost, photos} = this.props;
    return (
      <div> 
         <EmbassyImg photos={photos} nameOfCity={nameOfCity} classPost={classPost} boss={boss} cost={cost} src={src}/>
      </div>
    )
  }
}


