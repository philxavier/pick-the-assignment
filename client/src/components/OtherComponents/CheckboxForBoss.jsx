
import React, { Component } from 'react'

export default class CheckboxForBoss extends Component {

  constructor(props) {
      super(props)
      this.state={};
  }


  render() {
    return (
        <div id="optionsWrapper" className="floatBlock">
        <label id="labelWrapper"> 
            <input 
              id="bossOption"
              name="paymentType" 
              type="checkbox"
              onClick={() => {this.props.handleBossRateChange(this.props.rate)}}
            />  
              <span>{this.props.rate}</span>
         </label>
        </div>
    )
  }
}
