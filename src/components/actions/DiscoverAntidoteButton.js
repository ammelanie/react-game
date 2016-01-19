/**
 * Created by melanie on 17/01/16.
 */

import React from 'react';

import {GameConstants} from '../../constants/GameConstants';

import GameActions from '../../actions/GameActions';

import GameStore from '../../stores/GameStore';

import ButtonAction from './ButtonAction';

import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

/**  Classe représentant un bouton d'antidote pour un virus */
class DiscoverAntidoteButton extends React.Component {

    /**
     * Constructeur du bouton
     * @param props
     */
    constructor(props) {
        super(props);

        // Ajout de l'état d'activation du bouton en tant qu'état
        this.state = {
            disabled: false,
            isModalVisible: false
        };

        this.onChange = this.onChange.bind(this);
        this.onPlayerChangePosition = this.onPlayerChangePosition.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.showModal = this.showModal.bind(this);
        this.discoverAntidoteForVirus = this.discoverAntidoteForVirus.bind(this);
    }

    /**
     * Permet de lancer la découverte d'un antidote, pour un virus donné
     */
    discoverAntidoteForVirus() {
        GameActions.discoverAntidoteForVirus(this.props.name);
        this.hideModal();
    }

    /**
     * Changement d'état permettant la fermeture de la modale
     */
    hideModal() {
        this.setState({isModalVisible: false});
    }

    /**
     * Changement d'état permettant l'ouverture de la modale
     */
    showModal() {
        this.setState({isModalVisible: true});
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
        if (!GameStore.hasAntidoteBeenDiscovered(this.props.name))
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

        var title = "Découverte de l'antidote pour le virus " + this.props.name;
        var text = <p>Alors, comme ça vous avez trouvé tous les éléments nécessaires à la création de l'antidote pour le virus {this.props.name} ? <br />
                      N'oubliez pas qu'il vous faut <strong>{GameConstants.NB_CARD_FOR_ANTIDOTES} cartes villes de la couleur du virus</strong> pour pouvoir trouver un anditote ! <br />
                      Êtes-vous sûr de bien les avoir ? L'avenir de la France en dépend ! </p>;

        return (
            <div>
                <ButtonAction
                    text={"Antidote pour le virus " + this.props.name + " trouvé"}
                    backgroundColor={GameConstants.VIRUS_A === this.props.name ? GameConstants.VIRUS_A_COLOR : GameConstants.VIRUS_B_COLOR}
                    disabled={this.state.disabled}
                    onClickEvent={this.showModal}
                />
                <Modal
                    show={this.state.isModalVisible}
                    onHide={this.hideModal}
                    dialogClassName="custom-modal"
                    bsSize="large"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {text}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="danger" onClick={this.hideModal}>Hum, en fait, il me manque quelque chose...</Button>
                        <Button bsStyle="success" onClick={this.discoverAntidoteForVirus}>J'ai tout ce qu'il me faut</Button>
                    </Modal.Footer>
                </Modal>
            </div>
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