/**
 * Created by melanie on 10/01/16.
 */

import React from 'react';

import CleanVirusActions from './CleanVirusActions'

/**  Classe représentant la barre d'action du jeu */
class ActionBar extends React.Component {

    /**
     * Permet de rendre la barre d'action
     * @returns {ReactElement}
     */
    render() {

        return (
            <div>
                <h3>Actions</h3>
                <CleanVirusActions />
            </div>
        );
    }
}

export default ActionBar;