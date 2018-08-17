import React, { Component } from 'react';
import io from 'socket.io-client';
import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: null,
        time: null
    };

    const socket = io.connect('http://localhost:8080');
    socket.on('server-msg-time', (data) => {
          const date = new Date(data.time);
          this.setState({ time: `${date.getHours()} - ${date.getMinutes()} - ${date.getSeconds()}` })
      });
    socket.on('server-msg', (data) => {
          console.log(' Socket ', data);
      });
    socket.emit('client-msg', ' Soccket is going on client ');

  }

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    return (
      <div>
        <header>
            {
                this.state.username
                  ? <h1>Hello {this.state.username}</h1>
                  : <h1>Loading.. please wait!</h1>
            }
        </header>

        <div>
            Time from Socket.IO : { this.state.time }
        </div>

        <div>
          <button onClick={this.getAggregatedData}> Get </button>
        </div>

      </div>
    );
  }

  getAggregatedData = () => {
      fetch('/api/getAggregatedData')
          .then(res => res.json())
          .then(data => {
              console.log( data);
          });
  }

}
