import React, { Component } from 'react';
import './Incrementer.scss';
import FlipCard from '../FlipCard/FlipCard';

class Incrementer extends Component<any, any> {
  private intId: any;
  readonly flipCardRef: React.RefObject<FlipCard>;
  state = {
    counter: 0,
    incrementInterval: 500
  };

  constructor(props: any) {
    super(props);

    this.flipCardRef = React.createRef();
  }

  componentWillUnmount() {
    // clear the interval on component removal
    this.onPause();
  }

  increment = () => {
    // increment the state counter
    this.setState({counter: this.state.counter + 1});
    this.flipCardRef.current?.flip(this.state.counter);
  }

  onPause = () => {
    // pause by clearing the interval
    clearInterval(this.intId);
  }

  onPlay =  () => {
    if (this.intId) this.onPause();
    this.intId = setInterval(() => {
      this.increment();
    }, this.state.incrementInterval);
  }

  onReset = () => {
    this.flipCardRef.current?.flip(this.state.counter, 0);
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
