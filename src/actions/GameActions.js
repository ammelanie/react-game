/**
 * Created by melanie on 25/12/15.
 */

'use strict';

import GameDispatcher from '../dispatcher/GameDispatcher';
import {GameConstants} from '../constants/GameConstants';

export default {

    togglePathsForCity(cityName) {

        GameDispatcher.dispatch({
            type: GameConstants.TOGGLE_PATHS,
            cityName: cityName
        });
    }
}