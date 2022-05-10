import React, { Component } from 'react';
import './Incrementer.scss';
import FlipCard from '../FlipCard/FlipCard';

class Incrementer extends Component<any, any> {
  private intId: any;
  readonly flipCardRef: React.RefObject<FlipCard>;
  // set the state with default counter value and the interval duration in milliseconds
  state = {
    counter: 0,
    incrementInterval: 500
  };

  constructor(props: any) {
    super(props);

    // get a element reference to the FlipCard element
    this.flipCardRef = React.createRef();
  }

  componentWillUnmount() {
    // clear the interval on component removal
    this.onPause();
  }

  onPause = () => {
    // pause by clearing the interval
    clearInterval(this.intId);
  }

  onPlay = () => {
    // clear current interval if intId is set, to prevent that more than one interval is
    // running and incrementing the state (i.e. when clicking the play button several times)
    if (this.intId) this.onPause();
    this.intId = setInterval(() => {
      this.increment();
    }, this.state.incrementInterval);
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
        <button className="button" onClick={this.onPlay}>Start</button>
        <button className="button" onClick={this.onReset}>Reset</button>
        <button className="button" onClick={this.onPause}>Stop</button>
      </div>
    </div>;
  }
}

export default Incrementer;
