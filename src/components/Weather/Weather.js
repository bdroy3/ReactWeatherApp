import React, { PropTypes, Component } from 'react';
import { css } from 'aphrodite';
import styles from './Weather.styles.js';
import jQuery from "jQuery";


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

  LocationClick = () => {
    var myLocation = prompt("Please enter your five-digit code ZIP code!");
    var isnum = new RegExp(/^[0-9]+jQuery/)
    console.log(isnum.test(myLocation));
    while((myLocation.length===5 && isnum.test(myLocation)) === false){
      if (isnum.test(myLocation)===false)
      {
        alert("You need to enter a number!!");
      }
      else if (myLocation.length>5)
      {
        alert("That ZIP code is too long!");
      }
      else
      {
        alert("That ZIP code is too short!");
      }
      var myLocation = prompt("Enter your ZIP code");
    }
    if (myLocation === "" || myLocation === null) {
      myLocation = "04469";
    }

    this.setState({
      myLocation:myLocation,
    });
    this.getInfo();
  }

  TempClick = () => {
    var newTemp = prompt("new temp");
    this.setState({
      temp:newTemp,
    });
  }

  getInfo = () => {

    // METHOD 1
    jQuery.ajax({
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
    const refreshTheme = css(styles.refesh);
    return (
      <table className={mainTheme} width="224px"><tbody>
        <tr><canvas width="128" height="32"></canvas></tr>
        <tr className={locTheme} onClick={this.LocationClick}>{this.state.myLocation}</tr>
        <tr className={refreshTheme} onClick={this.getInfo}>refresh</tr>
        <tr><canvas width="128" height="32"></canvas></tr>
        <tr><img src="http://www.hotelesposeidon.com/sites/default/files/sun.png" height="128" width="128"/></tr>
        <tr><canvas width="128" height="32"></canvas></tr>
        <tr className={tempTheme} onClick={this.TempClick}>{this.state.temp} º C</tr>
        <tr><canvas width="128" height="32"></canvas></tr>
      </tbody></table>
    );
    //<tr><img src="http://www.hotelesposeidon.com/sites/default/files/sun.png" height="128" width="128"/></tr>
  }
}

Weather.propTypes = {
  theme: PropTypes.string,
};

const WeatherTitle = ({title}) => <h2>{title}</h2>;

export default Weather;

//responseJSON = xmlToJson(response);
