import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      status: 'off',
      time: 0,
      timer: null,
    };
  }

  formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) seconds = '0' + seconds;
    if (minutes < 10) minutes = '0' + minutes;
    return minutes + ':' + seconds;
  };

  playBell = () => {
    const sound = new Audio('./sounds/bell.wav')
    sound.play();
  }

  startTimer = () => {
    this.setState({
      status: 'work',
      time: 1200,
      timer: setInterval(this.step, 1000),
    });
  }

  step = () => {
    this.setState({
      time: this.state.time - 1,
    });

    if (this.state.time === 0) {
      if (this.state.status === 'work') {
        this.playBell();
        this.setState({
          status: 'rest',
          time: 20,
        });
      } else {
        this.setState({
          status: 'work',
          time: 1200,
        });
      }
    }
    return this.state.time;
  };



  stopTimer = () => {
    clearInterval(this.state.timer);
    this.setState({
      status: 'off',
      time: 0,
    })
  } 

  closeApp = () => {
    window.close();
  }


  render() {
    const {status} = this.state;
      return (
        <div>
          <h1>Protect your eyes</h1>
          {(status === 'off') && 
          <div>
            <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
            <p>This app will help you track your time and inform you when it's time to rest.</p>
          </div>
          }

          {(status === 'work') && <img src="./images/work.png" />}
          {(status === 'rest') && <img src="./images/rest.png" />}
          {(status !== 'off') && <div className="timer">
            {this.formatTime(this.state.time)}
          </div>}
          {(status === 'off') && <button className="btn" onClick={this.startTimer}>Start</button>}
          {(status !== 'off') && <button className="btn" onClick={this.stopTimer}>Stop</button>}
          <button className="btn btn-close" onClick={this.closeApp}>X</button>
        </div>
      )
  }
};

render(<App />, document.querySelector('#app'));
