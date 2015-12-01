/**
 * Created by melanie on 30/11/15.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import FranceMap from './components/areas/FranceMap';

(function() {
    'use strict';

    ReactDOM.render(
        <FranceMap />,
        document.getElementById('main-container')
    );
})();