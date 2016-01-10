/**
 * Created by melanie on 10/01/16.
 */

import React from 'react';

import CleanVirusButton from './CleanVirusButton';

/**  Classe représentant les boutons de soins d'un virus sur une ville */
class CleanVirusActions extends React.Component {

    /**
     * Permet de rendre les boutons d'action de soins
     * @returns {ReactElement}
     */
    render() {

        return (
            <div>
                <CleanVirusButton />
            </div>
        );
    }
}

export default CleanVirusActions;