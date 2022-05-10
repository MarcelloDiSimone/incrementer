import React, { Component } from 'react';
import FlipCard from '../FlipCard/FlipCard';
import './Incrementer.scss';

class Incrementer extends Component<any, any> {
  private intId: any;
  readonly flipCardRef: React.RefObject<FlipCard>;
  // set the state with default counter value and the interval duration in milliseconds
  state = {
    isPlaying: false,
    counter: 0,
    incrementInterval: 500
  };

  constructor(props: any) {
    super(props);

    // get an element reference to the FlipCard element
    this.flipCardRef = React.createRef();
  }

  componentWillUnmount() {
    // clear the interval on component removal
    this.onPause();
  }

  onPause = () => {
    // pause by clearing the interval
    if (this.intId) {
      clearInterval(this.intId);
    }
    this.setState({isPlaying: false});
  }

  onPlay = () => {
    // clear current interval if there is one. Prevent multiple intervals from
    // running and incrementing the state (i.e. when clicking the play button several times)
    this.onPause();
    this.intId = setInterval(() => {
      this.increment();
    }, this.state.incrementInterval);
    this.setState({isPlaying: true});
  }

  increment = () => {
    // increment the state counter
    this.setState({counter: this.state.counter + 1});
    // call the FlipCard component with the actual counter state
    this.flipCardRef.current?.flip(this.state.counter);
  }

  onReset = () => {
    // call FlipCard component to reflect the reset by animating to zero
    this.flipCardRef.current?.flip(this.state.counter, 0);
    // reset the state
    this.setState({counter: 0});
  }

  render() {
    return <div className="incrementer-container">
      <FlipCard ref={this.flipCardRef} startWith={this.state.counter} />

      <div className="button-container">
        <button className={`button ${this.state.isPlaying ? 'active' : ''}`} onClick={this.onPlay}>Start</button>
        <button className="button" onClick={this.onReset}>Reset</button>
        <button className={`button ${this.state.isPlaying ? '' : 'active'}`} onClick={this.onPause}>Stop</button>
      </div>
    </div>;
  }
}

export default Incrementer;
