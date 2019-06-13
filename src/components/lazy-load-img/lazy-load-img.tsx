import React, { Component } from 'react';
import './lazy-load-img.scss';

export interface LazyLoadImgInterface {
  img: string,
  alt: string,
  classe?: string
}

class LazyLoadImg extends Component<LazyLoadImgInterface> {

  render() {

    return (
      <img src={this.props.img} alt={this.props.alt} className={this.props.classe}/>
    );

  }

}

export default LazyLoadImg;
