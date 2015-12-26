/**
 * Created by melanie on 25/12/15.
 */

import React from 'react';

import FranceMap from './areas/FranceMap';
import Paths from './paths/Paths';
import Players from './players/Players';


/**  Classe représentant l'ensemble du jeu */
class Game extends React.Component {

    /**
     * Permet de rendre l'ensemble du jeu
     * @returns {ReactElement}
     */
    render() {

        return (
            <div>
                <svg id="game-container" width="1000px" height="1000px">
                    <FranceMap />
                    <Paths />
                </svg>

                <Players />
            </div>
        );
    }
}

export default Game;