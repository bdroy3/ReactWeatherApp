import React, { PropTypes, Component } from 'react';
import { css } from 'aphrodite';
import styles from './Weather.styles.js';

/*UNDO MARK*/

class Weather extends Component {

  componentDidMount() {
    this.getInfo();
  }

  constructor(props) {
    super(props);
    this.state = {
      theme: props.theme,
      myLocation: "04469",
      temp: 18,
      tempType: "C",
      imgFile: "http://www.iconsdb.com/icons/preview/white/dust-xxl.png",
      day: "FLAG",
      weatherText: "ERROR",
      dataJson:{},
      lastCheck: 0,
      newLoc: true,
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

  handleLocClick = () => {
    var fieldElement = document.getElementById('locField')
    fieldElement.style.visibility = fieldElement.style.visibility === "hidden" ? null : "hidden";
  }

  handleLocFieldChange = () => {
    var rememberLoc = this.state.myLocation;
    var NewLocation = document.getElementById('locField').value;
    if ((NewLocation > 1 || NewLocation < 1)===false)
    {
      document.getElementById('locField').style.outline="2px solid #f00";
    }
    else{
      document.getElementById('locField').style.outline="none";
      if (NewLocation.length>5) {
        //document.getElementById('locField').style.outlineColor="red";
        document.getElementById('locField').value=rememberLoc;
        document.getSelection().removeAllRanges();
      }
      else if (NewLocation.length<3) {
        //document.getElementById('locField').style.outlineColor="#b3edff";
      }
      else if (NewLocation.length===5 && Number(NewLocation) != Number(this.state.myLocation)) {
        this.state.myLocation=NewLocation;
        document.getSelection().removeAllRanges();
        this.state.newLoc = true;
        if (this.state.myLocation===NewLocation) {
          this.getInfo();
        }
        else {
          console.log("ERROR");
        }
      }
    }
  }

  TempClick = () => {
    var tType = this.state.tempType === "C" ? "F" : "C";
    var tempCalc = 0;
    if (tType === "C") {
      tempCalc = ((this.state.temp-32)/1.8);
    }
    else if (tType === "F") {
      tempCalc = ((this.state.temp*1.8)+32);
    }
    this.setState({
      temp:Math.round(tempCalc),
      tempType:tType,
    });
  }


  readData = () => {
    var resp = this.state.dataJson;
    //resp.cod=404;
    if (Number(resp.cod)===404){
      this.state.imgFile="http://www.iconsdb.com/icons/preview/white/storm-xxl.png";
      this.state.weatherText="ERROR";
      this.state.temp="404";
    }
    else {
      if (this.state.day===true) {
        document.getElementById('main').backgroundColor="#00bfff";
        document.getElementById('locField').backgroundColor="#00bfff";
        document.getElementById('main').style.boxShadow="10px 10px #0099ff";
      }
      else {
        document.getElementById('main').style.backgroundColor="#0099cc";
        document.getElementById('locField').style.backgroundColor="#0099cc";
        document.getElementById('main').style.boxShadow="10px 10px #006bb3";
      }
      var weatherCode = resp.weather[0].id;


      //weatherCode=222;
      if (200<=weatherCode && weatherCode<=232){
        this.state.imgFile="http://www.iconsdb.com/icons/preview/white/storm-xxl.png";
        this.state.weatherText="Storms";
      }
      else if (300<=weatherCode && weatherCode<=321){
        this.state.imgFile="http://www.iconsdb.com/icons/preview/white/little-rain-xxl.png";
        this.state.weatherText="Drizzle";
      }
      else if (500<=weatherCode && weatherCode<=531){
        this.state.imgFile="http://www.iconsdb.com/icons/preview/white/rain-xxl.png";
        this.state.weatherText="Rain";
      }
      else if (600<=weatherCode && weatherCode<=622){
        this.state.imgFile="http://www.iconsdb.com/icons/preview/white/snow-xxl.png";
        this.state.weatherText="Snow";
      }
      else if (weatherCode===711 || weatherCode===751 || weatherCode===761 | weatherCode===762){
        this.state.imgFile="http://www.iconsdb.com/icons/preview/white/dust-xxl.png";
        if (weatherCode===711){
          this.state.weatherText="Smoke";
        }
        else if (weatherCode===751){
          this.state.weatherText="Sand";
        }
        else if (weatherCode===761 || weatherCode===731){
          this.state.weatherText="Dust";
        }
        else if (weatherCode===762){
          this.state.weatherText="Ash";
        }
      }
      else if (600<=weatherCode && weatherCode<=622){
        if (this.state.day){
          this.state.imgFile="http://www.iconsdb.com/icons/preview/white/fog-day-xxl.png";
        }
        else {
          this.state.imgFile="http://www.iconsdb.com/icons/preview/white/fog-night-xxl.png";
        }
      }
      else if (700<=weatherCode && weatherCode<=771){
        if (this.state.day) {
          this.state.imgFile="http://www.iconsdb.com/icons/preview/white/fog-day-xxl.png";
        }
        else {
          this.state.imgFile="http://www.iconsdb.com/icons/preview/white/fog-night-xxl.png";
        }
        if (weatherCode===701){
          this.state.weatherText="Mist";
        }
        else if (weatherCode===721){
          this.state.weatherText="Haze";
        }
        else if (weatherCode===741){
          this.state.weatherText="Fog";
        }
        else {
          this.state.weatherText="Fog";
        }
      }
      //
      else if (weatherCode===800){
        this.state.weatherText="Clear";
        if (this.state.day) {
          this.state.imgFile="http://www.iconsdb.com/icons/preview/white/sun-xxl.png";
        }
        else {
          this.state.imgFile="http://www.iconsdb.com/icons/preview/white/moon-4-xxl.png";
        }
      }
      //
      else if (weatherCode===801 || weatherCode===802){
        this.state.weatherText="Partly Cloudy";
        if (this.state.day) {
          this.state.imgFile="http://www.iconsdb.com/icons/preview/white/partly-cloudy-day-xxl.png";
        }
        else {
          this.state.imgFile="http://www.iconsdb.com/icons/preview/white/partly-cloudy-night-xxl.png";
        }
      }
      else if (weatherCode===803 || weatherCode===804){
        this.state.imgFile="http://www.iconsdb.com/icons/preview/white/clouds-xxl.png";
        this.state.weatherText="Cloudy";
      }
      else if ((900<=weatherCode && weatherCode<=902) || weatherCode===961 || weatherCode===959 || weatherCode===958){
        this.state.imgFile="http://www.iconsdb.com/icons/preview/white/cloud-lighting-xxl.png";
        this.state.weatherText="Severe Storm";
      }
      else if (weatherCode===906){
        this.state.imgFile="http://www.iconsdb.com/icons/preview/white/hail-xxl.png";
        this.state.weatherText="Hail";
      }
      if (this.state.tempType==="C"){
        this.setState({
          temp: (Math.round(resp.main.temp)-273),
        });
      }
      else {
        var tempCalc = (((resp.main.temp-273)*1.8)+32);
        this.setState({
          temp: (Math.round(tempCalc)),
        });
      }
    }
  }

  getInfo = () => {
    var mintime = 15; //SET MINUMUM TIME BEFORE REFRESHES ALLOWED
    var day = new Date();
    var hours = day.getHours();
    var isDay = (6<hours<18);
    if (isDay===true) {
      this.state.day=true;
    }
    else{
      this.state.day=false;
    }
    if ((day.getTime() - this.state.lastCheck > (mintime*1000)) || this.state.newLoc===true) {
      console.log("GOOD");
      var resp = 0;
      var xhr = new XMLHttpRequest;
      xhr.open("GET", 'http://api.openweathermap.org/data/2.5/weather?q='+this.state.myLocation+'&APPID=915c38a0592ead8651fde1713cceec09', true);
      xhr.send();
      var self = this;
      xhr.timeout=3000;
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          self.state.dataJson = JSON.parse(xhr.response);
          self.readData();
        }
      };
      xhr.ontimeout = function() {
        self.state.imgFile="http://www.iconsdb.com/icons/preview/white/dust-xxl.png";
        self.state.weatherText="Timeout";
        self.state.temp="ER";
      };
      this.state.lastCheck=day.getTime();
      this.state.newLoc = false;
    }
    else {
      console.log("please wait "+(mintime-((day.getTime()-this.state.lastCheck)/1000)).toFixed(3)+" seconds");
    }
  }

//<p id="loc" onClick={this.handleLocClick}>{this.state.myLocation}</p>

  render() {
    return (
      <div id="main">
        <textarea maxlength="5" rows="1" cols="5" id="locField" defaultValue={this.state.myLocation} onChange={this.handleLocFieldChange}></textarea><br/>
        <img src={this.state.imgFile} height="128" width="128" alt="The image isn't showing"/>
        <p id="weatherText">{this.state.weatherText}</p>
        <div id="tempwrapper">
        <p id="temptext" onClick={this.TempClick}>{this.state.temp} º {this.state.tempType}</p>
        </div>
        <p id='refresh' onClick={this.getInfo}>refresh</p>
        <p id="credits">Powered by <a href="http://openweathermap.org/" target="_blank">OpenWeatherMap.org</a><br/>Icons from <a target="_blank" href="https://icons8.com/">Icons8.com</a></p>
      </div>
    );
  }
}

Weather.propTypes = {
  theme: PropTypes.string,
};

const WeatherTitle = ({title}) => <h2>{title}</h2>;

export default Weather;
