import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.scss';
import Layout from "./layout/layout.tsx";
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    fas, faArrowLeft, faArrowRight,
    faSignOutAlt, faClock, faRetweet,
    faHeart, faComment, faSpinner, faSkullCrossbones
} from '@fortawesome/free-solid-svg-icons'

library.add(
    fas, faSignOutAlt, faArrowLeft, faArrowRight, faClock,
    faRetweet, faHeart, faComment, faSpinner, faHeart,
    faSkullCrossbones
);

ReactDOM.render(
    <Layout />,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
