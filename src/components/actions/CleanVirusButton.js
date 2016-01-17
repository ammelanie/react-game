/**
 * Created by melanie on 10/01/16.
 */

'use strict';

import React from 'react';

import GameStore from '../../stores/GameStore';

import {GameConstants} from '../../constants/GameConstants';

import GameActions from '../../actions/GameActions';

/**  Classe représentant un bouton de soin d'un virus particulier */
class CleanVirusButton extends React.Component {

    /**
    * Constructeur du bouton
    * @param props
    */
    constructor(props) {
        super(props);

        // Ajout de l'état d'activation du bouton en tant qu'état
        this.state = {disabled: true};

        this.onChange = this.onChange.bind(this);
    }

    /**
     * Callback du clic sur le bouton
     */
    handleClick() {
        GameActions.cleanVirusForCurrentCity(this.props.name);
    }

    /**
     * Callback appelé lorsque le store emet un évènement
     * Cela va mettre à jour l'état du composant afin de pouvoir activer ou non le bouton de soin
     */
    onChange() {
        this.setState({ disabled: !GameStore.canCleanVirus(this.props.name)});
    }

    /**
     * Callback déclenché lorsque le composant est monté
     * Ajout d'un listener sur le store
     */
    componentDidMount() {
        GameStore.addChangeListener(GameConstants.PLAYERS_CHANGE_EVENT, this.onChange);
        GameStore.addChangeListener(GameConstants.CITIES_CHANGE_EVENT, this.onChange);
    }

    /**
     * Callback déblenché lorsque le composant est démonté
     * Suppression d'un listener sur le store
     */
    componentWillUnmount() {
        GameStore.removeChangeListener(GameConstants.PLAYERS_CHANGE_EVENT, this.onChange);
        GameStore.removeChangeListener(GameConstants.CITIES_CHANGE_EVENT, this.onChange);
    }

    /**
     * Permet de rendre le bouton d'action de soin
     * @returns {ReactElement}
     */
    render() {

        var button_style = {
            backgroundColor: (this.props.name === GameConstants.VIRUS_A ) ? GameConstants.VIRUS_A_COLOR : GameConstants.VIRUS_B_COLOR,
            color: "black",
            marginBottom: "5px"
        };

        var buttonOptions = {};
        if (this.state.disabled) {
            buttonOptions['disabled'] = 'disabled';
            button_style['backgroundColor'] = "#CCCCCC",
            button_style['color'] = "grey"
        }

        return (
            <div>
                <button onClick={this.handleClick.bind(this)} style={button_style} {...buttonOptions}> Soigner {this.props.name} </button>
            </div>
        );
    }
}

export default CleanVirusButton;

/**
 * Vérification des propriétés de l'objet
 * @type {object}
 * @property {string} name                  - Required          - nom du virus
 */
CleanVirusButton.propTypes = {
    name: React.PropTypes.string.isRequired
};