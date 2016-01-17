/**
 * Created by melanie on 17/01/16.
 */

'use strict';

import React from 'react';

import DiscoverAntidoteButton from './DiscoverAntidoteButton';

import {GameConstants} from '../../constants/GameConstants';

/**  Classe représentant les boutons d'antidote complet */
class DiscoverAntidoteActions extends React.Component {

    /**
     * Permet de rendre les boutons d'action d'atidote
     * @returns {ReactElement}
     */
    render() {

        var discoverAntidoteButton = [];
        var viruses = [GameConstants.VIRUS_A, GameConstants.VIRUS_B];

        // Affichage des boutons d'antidote de virus sur la carte
        for ( let i = 0; i <  GameConstants.NB_VIRUS; i++) {

            discoverAntidoteButton.push(
                <DiscoverAntidoteButton
                    key={"discoverAntidoteButton-" + i}
                    name={viruses[i]}
                />
            );
        }

        return (
            <div>
                {discoverAntidoteButton}
            </div>
        );
    }
}

export default DiscoverAntidoteActions;