/**
 * Created by melanie on 17/01/16.
 */

import React from 'react';

import {GameConstants} from '../../constants/GameConstants';

import GameActions from '../../actions/GameActions';

import GameStore from '../../stores/GameStore';

import ButtonAction from './ButtonAction';

/**  Classe représentant un bouton d'antidote pour un virus */
class DiscoverAntidoteButton extends React.Component {

    /**
     * Constructeur du bouton
     * @param props
     */
    constructor(props) {
        super(props);

        // Ajout de l'état d'activation du bouton en tant qu'état
        this.state = {disabled: false};

        this.onChange = this.onChange.bind(this);
        this.onPlayerChangePosition = this.onPlayerChangePosition.bind(this);
    }

    /**
     * Callback du clic sur le bouton
     */
    handleClick() {
        if ( confirm('Afin de détenir un antidote pour un virus il vous faut 5 cartes villes de cette même couleur. ' +
            'Êtes-vous sûrs de vouloir confirmer ?') ) {
            GameActions.discoverAntidoteForVirus(this.props.name);
        }
    }

    /**
     * Callback appelé lorsqu'un changement est émit par le store
     * Va désactiver le bouton de découverte d'antidote : celui-ci est considéré comme découvert
     */
    onChange() {
        this.setState({disabled: GameStore.hasAntidoteBeenDiscovered(this.props.name)});
    }

    /**
     * Callback appelé lorsqu'un changement est émit par le store au niveau du déplacement d'un joueur
     * Va activer/désactiver le bouton de découverte d'un antidote en fonction de la ville du joueur
     */
    onPlayerChangePosition() {
        this.setState({disabled: !GameStore.canAntidotesBeDiscovered()});
    }

    /**
     * Callback déclenché lorsque le composant est monté
     * Ajout d'un listener sur le store
     */
    componentDidMount() {
        GameStore.addChangeListener(GameConstants.DISCOVER_ANTIDOTE_EVENT, this.onChange);
        GameStore.addChangeListener(GameConstants.PLAYERS_CHANGE_EVENT, this.onPlayerChangePosition);
    }

    /**
     * Callback déblenché lorsque le composant est démonté
     * Suppression d'un listener sur le store
     */
    componentWillUnmount() {
        GameStore.removeChangeListener(GameConstants.DISCOVER_ANTIDOTE_EVENT, this.onChange);
        GameStore.addChangeListener(GameConstants.PLAYERS_CHANGE_EVENT, this.onPlayerChangePosition);
    }

    /**
     * Permet d'afficher un bouton permettat de mentionner qu'un antidote a été trouvé
     * @returns {ReactElement}
     */
    render() {

        return (
            <ButtonAction
                text={"Antidote pour le virus " + this.props.name + " trouvé"}
                backgroundColor={GameConstants.VIRUS_A === this.props.name ? GameConstants.VIRUS_A_COLOR : GameConstants.VIRUS_B_COLOR}
                disabled={this.state.disabled}
                onClickEvent={this.handleClick.bind(this)}
            />
        )
    }
}

export default DiscoverAntidoteButton;

/**
 * Vérification des propriétés de l'objet
 * @type {object}
 * @property {string} name                  - Required          - nom du virus
 */
DiscoverAntidoteButton.propTypes = {
    name: React.PropTypes.string.isRequired
};