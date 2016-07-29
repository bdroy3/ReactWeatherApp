import React, { PropTypes, Component } from 'react';
import { css } from 'aphrodite';
import styles from './Weather.styles.js';
import $ from "jQuery";

/*UNDO MARK*/

class Weather extends Component {

  // This is Async yo!!! Nysnc is my fav band. Jt rulez!!!
  componentDidMount() {
    document.getElementById('locField').style.visibility = "hidden";
    console.log("DidMount");
    this.getInfo();
    // request stuffz

    // once you get stuff from callback


    /*this.setState({}, () => {

    });*/
  }

  constructor(props) {
    super(props);
    console.log("constructing");
    this.state = {
      theme: props.theme,
      myLocation: "04469",
      temp: 18,
      fieldDisplay: "hidden",
      tempType: "C",
      imgFile: "http://www.iconsdb.com/icons/preview/white/dust-xxl.png",
      day: "FLAG",
      weatherText: "Clear-FLAG",
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
      console.log("HLFC myLoc-"+myLocation);
      this.setState({
        myLocation:myLocation,
      });
      console.log("HLFC myLoc-"+myLocation+" state-"+this.state.myLocation);
      if (this.state.myLocation===myLocation) {
        this.getInfo();
      }
      else {
        console.log("HOW?!?!?!");
      }
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
    var resp = 0;
    console.log("GI-"+this.state.myLocation);
    $.ajax({
      type: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather?q='+this.state.myLocation+'&APPID=915c38a0592ead8651fde1713cceec09',
      async: false,
      dataType: 'json',
      success: function(response) {
        resp = response;
      },
      error: function() {
        console.log('ERROR');
      }
    });

    const day = new Date();
    const hours = day.getHours();
    //this.state.theme === "day"
    var isDay = (6<hours<18);
    //isDay=false;
    if (isDay===true) {
      this.setState({
        day: true,
      });
    }
    else {
      this.setState({
        day: false,
      });
    }
    var weatherCode = resp.weather[0].id;

    //weatherCode=901;

    if (200<=weatherCode && weatherCode<=232){
      this.setState({
        imgFile: "http://www.iconsdb.com/icons/preview/white/storm-xxl.png",
        weatherText: "Storms",
      });
    }
    else if (300<=weatherCode && weatherCode<=321){
      this.setState({
        imgFile: "http://www.iconsdb.com/icons/preview/white/little-rain-xxl.png",
        weatherText: "Drizzle",
      });
    }
    else if (500<=weatherCode && weatherCode<=531){
      this.setState({
        imgFile: "http://www.iconsdb.com/icons/preview/white/rain-xxl.png",
        weatherText: "Rain",
      });
    }
    else if (600<=weatherCode && weatherCode<=622){
      this.setState({
        imgFile: "http://www.iconsdb.com/icons/preview/white/snow-xxl.png",
        weatherText: "Snow",
      });
    }
    else if (weatherCode===711 || weatherCode===751 || weatherCode===761 | weatherCode===762){
      this.setState({
        imgFile: "http://www.iconsdb.com/icons/preview/white/dust-xxl.png",
      });
      if (weatherCode===711){
        this.setState({
          weatherText: "Smoke",
        });
      }
      else if (weatherCode===751){
        this.setState({
          weatherText: "Sand",
        });
      }
      else if (weatherCode===761 || weatherCode===731){
        this.setState({
          weatherText: "Dust",
        });
      }
      else if (weatherCode===762){
        this.setState({
          weatherText: "Ash",
        });
      }
    }
    else if (700<=weatherCode && weatherCode<=771){
      if (this.state.day) {
        this.setState({
          imgFile: "http://www.iconsdb.com/icons/preview/white/fog-day-xxl.png",
        });
      }
      else {
        this.setState({
          imgFile: "http://www.iconsdb.com/icons/preview/white/fog-night-xxl.png",
        });
      }
      if (weatherCode===701){
        this.setState({
          weatherText: "Mist",
        });
      }
      else if (weatherCode===721){
        this.setState({
          weatherText: "Haze",
        });
      }
      else if (weatherCode===741){
        this.setState({
          weatherText: "Fog",
        });
      }
    }
    else if (weatherCode===800){
      if (this.state.day) {
        this.setState({
          imgFile: "http://www.iconsdb.com/icons/preview/white/sun-xxl.png",
          weatherText: "Clear",
        });
      }
      else {
        this.setState({
          imgFile: "http://www.iconsdb.com/icons/preview/white/moon-4-xxl.png",
          weatherText: "Clear",
        });
      }
    }
    else if (weatherCode===801 || weatherCode===802){
      this.setState({
        imgFile: "http://www.iconsdb.com/icons/preview/white/partly-cloudy-day-xxl.png",
        weatherText: "Partly Cloudy",
      });
    }
    else if (weatherCode===803 || weatherCode===804){
      this.setState({
        imgFile: "http://www.iconsdb.com/icons/preview/white/clouds-xxl.png",
        weatherText: "Cloudy",
      });
    }
    else if ((900<=weatherCode && weatherCode<=902) || weatherCode===781 || weatherCode===961 || weatherCode===959 || weatherCode===958){
      this.setState({
        imgFile: "http://www.iconsdb.com/icons/preview/white/cloud-lighting-xxl.png",
        weatherText: "Severe Storm",
      });
    }
    else if (weatherCode===906){
      this.setState({
        imgFile: "http://www.iconsdb.com/icons/preview/white/hail-xxl.png",
      });
    }

    console.log("GI 2-"+this.state.myLocation+" "+this.state.weatherText);

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
    return (
      <div id="main">
        <p id="loc" onClick={this.handleLocClick}>{this.state.myLocation}</p>
        <textarea maxlength="5" rows="1" cols="5" id="locField" defaultValue={this.state.myLocation} onChange={this.handleLocFieldChange}></textarea><br/>
        <img src={this.state.imgFile} height="128" width="128"/>
        <p id="weatherText">{this.state.weatherText}</p>
        <div id="tempwrapper">
        <p id="temptext" onClick={this.TempClick}>{this.state.temp} º {this.state.tempType}</p>
        </div>
        <p id='refresh' onClick={this.getInfo}>refresh</p>
        <p id="credits">powered by <a href="http://openweathermap.org/" target="_blank">OpenWeatherMap.org</a><br/>Icons provided by <a target="_blank" href="https://icons8.com/">Icons8.com</a></p>
      </div>
    );
  }
}

Weather.propTypes = {
  theme: PropTypes.string,
};

const WeatherTitle = ({title}) => <h2>{title}</h2>;

export default Weather;
