/**
 * Created by melanie on 25/12/15.
 */

'use strict';

import React from 'react';

import FranceMap from './areas/FranceMap';
import Paths from './paths/Paths';
import Players from './players/Players';
import Viruses from './viruses/Viruses';
import ActionBar from './actions/ActionBar';
import InformationBoard from './informations/InformationBoard';

import {GameConstants} from '../constants/GameConstants';


/**  Classe représentant l'ensemble du jeu */
class Game extends React.Component {

    /**
     * Permet de rendre l'ensemble du jeu
     * @returns {ReactElement}
     */
    render() {

        var styles = {
            map: {
                float: "left",
                marginLeft: GameConstants.ACTION_BAR_PADDING
            },
            map_elements: {
                position: "absolute",
                top: "0px",
                left: GameConstants.MARGIN_LEFT_MAP
            },
            action_bar: {
                float: "left",
                height: GameConstants.HEIGHT_MAP,
                borderRight: "1px solid black",
                paddingRight: GameConstants.ACTION_BAR_PADDING,
                width: GameConstants.ACTION_BAR_WIDTH
            },
            information_board: {
                float: "left",
                height: GameConstants.HEIGHT_MAP,
                borderLeft: "1px solid black",
                paddingLeft: GameConstants.ACTION_BAR_PADDING,
            }
        };

        return (
            <div>
                <div style={styles.action_bar}>
                    <ActionBar />
                </div>
                <div style={styles.map}>
                    <svg id="game-container" width={GameConstants.WIDTH_MAP} height={GameConstants.HEIGHT_MAP}>
                        <FranceMap />
                        <Paths />
                    </svg>

                    <Players style={styles.map_elements} />
                    <Viruses style={styles.map_elements} />
                </div>
                <div style={styles.information_board}>
                    <InformationBoard />
                </div>
            </div>
        );
    }
}

export default Game;