/**
 * Created by melanie on 25/12/15.
 */

import React from 'react';

import FranceMap from './areas/FranceMap';
import Paths from './paths/Paths';
import Players from './players/Players';
import Viruses from './viruses/Viruses';
import ActionBar from './actions/ActionBar';

import {GameConstants} from '../constants/GameConstants';


/**  Classe représentant l'ensemble du jeu */
class Game extends React.Component {

    /**
     * Permet de rendre l'ensemble du jeu
     * @returns {ReactElement}
     */
    render() {

        var styles = {
            map_elements: {
                position: "absolute",
                top: "0px",
                left: GameConstants.MARGIN_LEFT_MAP,
                float: "right"
            },
            action_bar: {
                float: "left",
                height: GameConstants.HEIGHT_MAP,
                borderRight: "1px solid black",
                paddingRight: GameConstants.ACTION_BAR_PADDING,
                width: GameConstants.ACTION_BAR_WIDTH
            }
        };

        return (
            <div>
                <div style={styles.action_bar}>
                    <ActionBar />
                </div>
                <div style={styles.map_elements}>
                    <svg id="game-container" width="1000px" height={GameConstants.HEIGHT_MAP}>
                        <FranceMap />
                        <Paths />
                    </svg>

                    <Players />
                    <Viruses />
                </div>
            </div>
        );
    }
}

export default Game;