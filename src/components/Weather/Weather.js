import React, { PropTypes, Component } from 'react';
import { css } from 'aphrodite';
import styles from './Weather.styles.js';

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: props.theme,
    };
  };

  handleOnClick = () => {
    console.log(this.state.theme);
    const theme = this.state.theme === "light" ? "dark" : "light";
    this.setState({
      theme: theme,
    });
  }

  render() {
    const theme = (this.state.theme === "light") ? css(styles.light) : css(styles.dark);
    return (
      <div className={theme}>
        <WeatherTitle title="I am the weather title" />
        Hows the Weather?
        <a href="#" onClick={this.handleOnClick}>{this.props.theme}</a>
      </div>
    );
  }
}

Weather.propTypes = {
  theme: PropTypes.string,
};

const WeatherTitle = ({title}) => <h2>{title}</h2>;

export default Weather;
