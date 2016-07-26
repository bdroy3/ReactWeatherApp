import React, { PropTypes, Component } from 'react';
import { css } from 'aphrodite';
import styles from './Weather.styles.js';
import $ from "jQuery";

/*UNDO MARK*/

class Weather extends Component {

  // This is Async yo!!! Nysnc is my fav band. Jt rulez!!!
  componentDidMount() {
    document.getElementById('locField').style.visibility = "hidden";
    this.getInfo();
    // request stuffz

    // once you get stuff from callback

    
    /*this.setState({}, () => {

    });*/
  }

  constructor(props) {
    super(props);
    this.state = {
      theme: props.theme,
      myLocation: "04469",
      temp: 18,
      fieldDisplay: "hidden",
      tempType: "C",
    };
  };

  componentDidUpdate(){
    if (this.state.temp >= 999) {
      document.getElementById('temptext').style.fontSize = "20px";
      document.getElementById('temptext').style.paddingTop = "15px";
    }
    else if (this.state.temp >= 99){
      document.getElementById('temptext').style.fontSize = "35px";
      document.getElementById('temptext').style.paddingTop = "5px";
    }
    else {
      document.getElementById('temptext').style.fontSize = "40px";
      document.getElementById('temptext').style.paddingTop = "0px";
    }
  }


  ThemeClick = () => {
    console.log(this.state.theme);
    const theme = this.state.theme === "day" ? "dusk" : "day";
    this.setState({
      theme: theme,
    });
  }

  handleLocClick = () => {
    var fieldElement = document.getElementById('locField')
    fieldElement.style.visibility = fieldElement.style.visibility === "hidden" ? null : "hidden";
  }

  handleLocFieldChange = () => {
    var myLocation = document.getElementById('locField').value;
    if (myLocation.length>5) {
      document.getElementById('locField').style.outlineColor="red";
    }
    else if (myLocation.length<5) {
      document.getElementById('locField').style.outlineColor="#b3edff";
    }
    else if ((myLocation > 1 || myLocation < 1) ===false)
    {
      document.getElementById('locField').style.outlineColor="red";
    }
    else if (myLocation.length===5)
    {
      document.getElementById('locField').style.visibility = "hidden";
      document.getElementById('locField').style.outlineColor="white";
      console.log("HLFC 1-"+myLocation);
      this.setState({
        myLocation:myLocation,
      });
      console.log("HLFC 2-"+this.state.myLocation);
      this.getInfo();
    }
  }

  TempClick = () => {
    var tType = this.state.tempType === "C" ? "F" : "C";
    var tempCalc = 0;
    if (tType === "C") {
      tempCalc = ((this.state.temp-32)/1.8).toFixed(0);
    }
    else if (tType === "F") {
      tempCalc = ((this.state.temp*1.8)+32).toFixed(0);
    }
    this.setState({
      temp:tempCalc,
      tempType:tType,
    });
  }

  getInfo = () => {
    // METHOD 1
    var resp = 0;
    console.log("GI-"+this.state.myLocation);
    $.ajax({
      type: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather?q='+this.state.myLocation+'&APPID=915c38a0592ead8651fde1713cceec09',
      async: false,
      dataType: 'json',
      success: function(response) {
        resp = response;
        /*console.log("loc- "+resp.coord.lat);
        console.log("WID- "+resp.weather[0].id);
        console.log("temp- "+resp.main.temp);
        console.log("tempC- "+(Math.trunc(resp.main.temp)-273));
        console.log("tempF- "+Math.trunc(((resp.main.temp-273)*1.8)+32));*/
      },
      error: function(error) {
        console.log('ERROR:', error);
      }
    });
    if (this.state.tempType==="C"){
      this.setState({
        temp: (Math.trunc(resp.main.temp)-273),
      });
    }
    else {
      var tempCalc = (((resp.main.temp-273)*1.8)+32);
      this.setState({
        temp: (Math.trunc(tempCalc)),
      });
    }

  }

  render() {
    const day = new Date();
    const hours = day.getHours();
    //this.state.theme === "day"
    const isNight = (hours <= 6 || hours >=20)
    const mainTheme = isNight === true ? css(styles.dusk) : css(styles.day);
    const locTheme = css(styles.loc);
    const tempTheme = css(styles.temp);
    const refreshTheme = css(styles.refresh);
    return (
      <div id="main">
        <p id="loc" onClick={this.handleLocClick}>{this.state.myLocation}</p>
        <textarea maxlength="5" rows="1" cols="5" id="locField" defaultValue={this.state.myLocation} onChange={this.handleLocFieldChange}></textarea><br/>
        <img src="http://www.hotelesposeidon.com/sites/default/files/sun.png" height="128" width="128"/>
        <div id="tempwrapper">
        <p id="temptext" onClick={this.TempClick}>{this.state.temp} º {this.state.tempType}</p>
        </div>
        <p id='refresh' onClick={this.getInfo}>refresh</p>
      </div>
    );
  }
}

Weather.propTypes = {
  theme: PropTypes.string,
};

const WeatherTitle = ({title}) => <h2>{title}</h2>;

export default Weather;
