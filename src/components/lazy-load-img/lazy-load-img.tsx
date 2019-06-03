import React, { Component } from 'react';
import './lazy-load-img.scss';
import LazyLoad from 'react-lazy-load';

export interface LazyLoadImgInterface {
  img: string,
  alt: string,
  classe?: string
}

class LazyLoadImg extends Component<LazyLoadImgInterface> {

  render() {

    return (
      <LazyLoad>
        <img src={this.props.img} alt={this.props.alt} className={this.props.classe}/>
      </LazyLoad>
    );

  }

}

export default LazyLoadImg;
