import React, { PropTypes, Component } from 'react';
import { css } from 'aphrodite';
import styles from './Weather.styles.js';
import $ from "jQuery";


class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: props.theme,
      myLocation: "04469",
      temp: 18,
    };
  };

  ThemeClick = () => {
    console.log(this.state.theme);
    const theme = this.state.theme === "day" ? "dusk" : "day";
    this.setState({
      theme: theme,
    });
  }

  /*handleLocChange = () => {
    var myLocation = document.getElementById('locField').value;
    if ((myLocation > 1 || myLocation < 1) ===false)
    {
      alert("You need to enter a number!!");
    }
    else if (myLocation.length>5)
    {
      alert("That ZIP code is too long!");
    }
    else if (myLocation.length<5)
    {
      alert("That ZIP code is too short!");
    }
    else if (myLocation === "" || myLocation === null) {
      myLocation = "04469";
    }
    else {
      this.setState({
        myLocation:myLocation,
      });
      //this.getInfo();
    }
  }*/

  handleLocFieldChange = () => {
    var myLocation = document.getElementById('locField').value;
    if (myLocation.length===5)
    {
      if ((myLocation > 1 || myLocation < 1) ===false)
      {
        alert("You need to enter a five-digit ZIP code!");
      }
      else if (myLocation === "" || myLocation === null) {
        myLocation = "04469";
      }
      else {
        this.setState({
          myLocation:myLocation,
        });
        $('textarea').toggleClass("hiddenThing");
        //this.getInfo();
      }
    }
  }

  TempClick = () => {
    var newTemp = prompt("new temp");
    this.setState({
      temp:newTemp,
    });
  }

  getInfo = () => {
    // METHOD 1
    $.ajax({
      type: 'GET',
      url: 'https://api.forecast.io/forecast/1f5f0d431a04bf2445a7de80613696b3/68.6719,44.8831',
      async: true,
      dataType: 'json',
      success: function(response) {
        console.log(response);
      },
      error: function(error) {
        console.log('ERROR:', error);
      }
    });

    //METHOD 2
    /*jQuery.ajax({
      type: "GET",
      url: "http://api.forecast.io/forecast/1f5f0d431a04bf2445a7de80613696b3/68.6719,44.8831",
      async: false,
      dataType: 'JSONP',
      xhrFields: {
      withCredentials: true
      },
      timeout: 15000,
      success: function(data){
        console.log(data);
      },
      error: function(resultFail) {
        alert("error: " + resultFail);
      }
    });*/

    //METHOD 3
    /*
    jQuery.getJSON("http://api.forecast.io/forecast/1f5f0d431a04bf2445a7de80613696b3/68.6719,44.8831", function (data) {
      console.log(data);
    });*/

    //METHOD 4
    /*jQuery.get("http://api.forecast.io/forecast/1f5f0d431a04bf2445a7de80613696b3/68.6719,44.8831", function(data){
        console.log(data);
    });*/

    this.setState({
      currentInfo:"FILLERTEXT",
    });
    console.log(this.state);
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
        <p id="loc">{this.state.myLocation}</p>
        <textarea rows="1" cols="5" id="locField" onChange={this.handleLocFieldChange}>{this.state.myLocation}</textarea><br/>
        <img src="http://www.hotelesposeidon.com/sites/default/files/sun.png" height="128" width="128"/>
        <p id="temptext" onClick={this.TempClick}>{this.state.temp} º C</p>
        <p id='refresh' onClick={this.getInfo}>refresh</p>
      </div>
    );

    /*
    <table className={mainTheme} width="224px"><tbody>
      <tr className={locTheme} id='loc'>{this.state.myLocation}</tr>
      <tr><textarea rows="1" cols="5" id="locField" onChange={this.handleLocFieldChange}>{this.state.myLocation}</textarea></tr>
      <tr><img src="http://www.hotelesposeidon.com/sites/default/files/sun.png" height="128" width="128"/></tr>
      <tr className={tempTheme} onClick={this.TempClick}>{this.state.temp} º C</tr>
      <tr className={refreshTheme} id='refresh' onClick={this.getInfo}>refresh</tr>
    </tbody></table>
    */



    //<tr><img src="http://www.hotelesposeidon.com/sites/default/files/sun.png" height="128" width="128"/></tr>
    //<tr><canvas width="128" height="32"></canvas></tr>
    //onClick={this.LocationClick}
  }
}

Weather.propTypes = {
  theme: PropTypes.string,
};

const WeatherTitle = ({title}) => <h2>{title}</h2>;

export default Weather;

$(document).ready(function(){
  $('textarea').toggleClass("hiddenThing");
  $('#loc').click(function(){
    $('textarea').toggleClass("hiddenThing");
  });
  $('textarea').focus(function(){
    $('textarea').css('outline-color','white');
  });
  /*$.simpleWeather({
    location: 'bangor, maine',
    unit: 'f',
    success: function(weather) { console.log("you done good") },
    error: function(error) { console.log("you done screwed up") }
  });*/
});
