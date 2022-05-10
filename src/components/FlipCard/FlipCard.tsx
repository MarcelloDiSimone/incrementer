import React, { Component } from 'react';
import './FlipCard.scss';

class FlipCard extends Component<any, any> {
  readonly root: any = null;
  constructor(props: any) {
    super(props);

    this.root = React.createRef();
  }

  componentDidMount() {
    this.root.current?.style.setProperty('--counter', '' + this.props.startWith);
    this.root.current?.style.setProperty('--counter-next', '' + (this.props.startWith + 1));
  }

  flip(current: number, next?: number) {
    this.root.current?.classList.remove('play');
    this.root.current?.style.setProperty('--counter', '' + current);
    this.root.current?.style.setProperty('--counter-next', '' + ((next !== undefined)? next: (current + 1)));
    let flipCard = document.querySelector('.active');
    let flipCardBack = document.querySelector('.before');

    flipCard?.classList.toggle('before');
    flipCard?.classList.toggle('active');
    flipCardBack?.classList.toggle('active');
    flipCardBack?.classList.toggle('before');

    this.root.current?.classList.add('play');
  }

  render() {
    return <div ref={this.root} className="flip-container">
      <div className="flip">
        <div className="front active">
          <div className="top"></div>
          <div className="bottom"></div>
        </div>
        <div className="back before">
          <div className="top"></div>
          <div className="bottom"></div>
        </div>
      </div>
    </div>;
  }
}

export default FlipCard;
