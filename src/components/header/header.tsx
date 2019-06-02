import React, {Component} from 'react';
import './header.scss';

interface HeaderInterface {
  left?: any,
  right?: any,
}

class Header extends Component<HeaderInterface> {

  render() {
    return (
      <div className="row-header">
        <p>
          {this.props.left}
        </p>
        <p>
          {this.props.right}
        </p>
      </div>
    );
  }

}

export default Header;
