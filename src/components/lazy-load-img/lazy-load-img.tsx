import React, { Component } from 'react';
import './lazy-load-img.scss';
import LazyLoad from 'react-lazy-load';

export interface LazyLoadImgInterface {
  img: string,
  alt: string,
}

class LazyLoadImg extends Component<LazyLoadImgInterface> {

  constructor(props: any){
    super(props);
  }

  render() {

    return (
      <LazyLoad>
        <img src={this.props.img} alt={this.props.alt}/>
      </LazyLoad>
    );

  }

}

export default LazyLoadImg;
