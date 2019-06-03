import * as React from 'react';
import './erro-404.scss';
import erroIMG from '../../../assets/imgs/erro_404.png';
import {Link} from "react-router-dom";
import LazyLoadImg from "../../../components/lazy-load-img/lazy-load-img";

class Erro404 extends React.Component {

  render() {

    return (
      <div className="erro-404">
          <div className="img-container">
            <LazyLoadImg img={erroIMG} alt="logo"/>
          </div>
          <Link to={"/"}>Ir para home</Link>
      </div>
    );

  }

}

export default Erro404;
