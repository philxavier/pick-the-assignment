import React, { Component } from 'react'; //Always need in JSX files
import SwitchExample from "./Switch.jsx";
import Button from "./Button.jsx"
import CheckboxOption from './CheckboxOption.jsx'
import CheckboxForBoss from './CheckboxForBoss.jsx'

// Create the HTML to return for the input
class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      typeOfPost:['Embassy', 'Consulate', 'Other'],
      bossRatings:["A", "B", "C", "D", "E", "F"]
    };
  }

  render() {

    return (
      <div className="sidebar">
        <div id="sideBarText"> 
           <h3>Filters</h3>
        </div>
        <div id="categoria">
          <h4 id="categoriaTitle">Post Class</h4>
          <div id="containerButtonSwitch">
            <div id="containerSwitch">
              <SwitchExample textValue={'a'} handleSwitchClassChange={this.props.handleSwitchClassChange}/>
            </div>
              <Button textValue = 'A' />
          </div>
          <div id="containerButtonSwitch">
            <div id="containerSwitch">
              <SwitchExample textValue={'b'} handleSwitchClassChange={this.props.handleSwitchClassChange} />
            </div>
              <Button textValue = 'B' />
          </div>
          <div id="containerButtonSwitch">
            <div id="containerSwitch">
              <SwitchExample textValue={'c'} handleSwitchClassChange={this.props.handleSwitchClassChange}/>
            </div>
              <Button textValue = 'C' />
          </div>
          <div id="containerButtonSwitch">
            <div id="containerSwitch">
              <SwitchExample textValue={'d'} handleSwitchClassChange={this.props.handleSwitchClassChange} />
            </div>
              <Button textValue = 'D' />
          </div>
        </div>
        <div className="wrapper">
          <h4 id="typeOfPost">Type of Post</h4>
          <ul>
            {this.state.typeOfPost.map((ele, ind) => {
              return <CheckboxOption handleTypeChange={this.props.handleTypeChange} key={ind} typeOfPost={ele}/>
            })} 
          </ul>
        </div>
        <div className="bossReview">
          <h4 id="bossReview">Boss Review</h4>
          <div id="boxContainers" name="paymentContainer" className="paymentOptions">
                {this.state.bossRatings.map((ele, ind) => {
                  return <CheckboxForBoss key = {ind} rate={ele} handleBossRateChange={this.props.handleBossRateChange} />
                })}
          </div>
        </div>
      </div>
    );
  }
}

// SideBar.protoTypes = {
//   callback : PropTypes.func,
// }

//We need to export to index.js to display
export default SideBar;