/**
 * Created by melanie on 10/01/16.
 */

'use strict';

import React from 'react';

import CleanVirusButton from './CleanVirusButton';

import {GameConstants} from '../../constants/GameConstants';

/**  Classe représentant les boutons de soins d'un virus sur une ville */
class CleanVirusActions extends React.Component {

    /**
     * Permet de rendre les boutons d'action de soins
     * @returns {ReactElement}
     */
    render() {

        var cleanVirusButtons = [];
        var viruses = [GameConstants.VIRUS_A, GameConstants.VIRUS_B];

        // Affichage des boutons de guérison de virus sur la carte
        for ( let i = 0; i <  GameConstants.NB_VIRUS; i++) {

            cleanVirusButtons.push(
                <CleanVirusButton
                    key={"cleanVirusButton-" + i}
                    name={viruses[i]}
                />
            );
        }

        return (
            <div>
                {cleanVirusButtons}
            </div>
        );
    }
}

export default CleanVirusActions;