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

import GameActions from '../actions/GameActions';

import GameStore from '../stores/GameStore';

import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

/**  Classe représentant l'ensemble du jeu */
class Game extends React.Component {

    /**
     * Constructeur du jeu
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            isGameEnded: false,
            havePlayersWon: false,
            showModal: false
        };

        this.onChange = this.onChange.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    /**
     * Callback appelé lorsque le store emet un changement
     * Changement de l'état du jeu
     */
    onChange() {
        this.setState({
            isGameEnded: true,
            showModal: true,
            havePlayersWon: GameStore.getHavePlayersWon()
        });
    }

    /**
     * Callback déclenché lorsque le composant est monté
     * Initialisation du plateau de jeu
     */
    componentDidMount() {
        GameActions.initGame();
        GameStore.addChangeListener(GameConstants.GAME_CHANGE_EVENT, this.onChange);
    }

    /**
     * Callback déblenché lorsque le composant est démonté
     */
    componentWillUnmount() {
        GameStore.removeChangeListener(GameConstants.GAME_CHANGE_EVENT, this.onChange);
    }

    /**
     * Changement d'état permettant la fermeture de la modale
     */
    hideModal() {
        this.setState({showModal: false});
    }

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
                paddingLeft: GameConstants.ACTION_BAR_PADDING,
                width: GameConstants.ACTION_BAR_WIDTH
            },
            information_board: {
                float: "left",
                height: GameConstants.HEIGHT_MAP,
                width: GameConstants.INFO_WIDTH,
                borderLeft: "1px solid black",
                paddingLeft: GameConstants.ACTION_BAR_PADDING
            },
            overlay: {
                height: GameConstants.HEIGHT_MAP,
                position: "absolute",
                top: "0",
                left: "0",
                width: "876px",
                zIndex: "10",
                backgroundColor: "rgba(0,0,0,0.2)"
            },
            modal_title: {
                textAlign: "center",
                color: this.state.havePlayersWon ? 'green' : 'red'
            }
        };

        var overlay = null;
        var title = "";
        var text = "";
        var extraButton = null;

        if (this.state.isGameEnded) {
            overlay = <div style={styles.overlay}></div>;
            extraButton =  <Button bsStyle="success" href="/">Rejouer !</Button>;

            if (this.state.havePlayersWon) {
                title = "VICTOIRE !";
                text = <p>Bravo ! Vous êtes parvenus à sauver la France de ces {GameConstants.NB_VIRUS} virus... <br />
                         {GameConstants.VIRUS_A} et {GameConstants.VIRUS_B} font partis de ces virus dont on ne pensait jamais trouver d'antidote... <br /><br />
                         Vous avez réussi à récolter l'ensemble des éléments permettant de réaliser les antidotes, le peuple vous en est reconnaissant ! <br />
                         Les différents cas déjà contaminés seront prochainement guérris. À l'aide du vaccin, aucun nouveau cas ne devrait se manifester ! <br />
                         N'oubliez pas que nous ne sommes pas à l'abri d'autres virus... Venez sauver la France quand vous le souhaitez !</p>;
            } else {
                title = "DEFAITE...";
                text = <p>Comment ? Vous-êtes sûrs ?! Hum, il semblerait que les virus {GameConstants.VIRUS_A} et {GameConstants.VIRUS_B} soient plus virulents que jamais... <br /><br />
                          Vous n'êtes pas venus au bout de votre mission, la propagation est incroyable ! <br />
                          L'ensemble de la population semble condamné... Nous ne sommes pas en mesure de savoir combien de temps cela prendra, mais le manque d'antidote est un réel problème... <br />
                          N'abandonnez pas la France, nous pouvons retenter de vaincre de nouveaux virus avant que la population entière ne s'éteigne... !</p>;
            }
        }

        return (
            <div>
                {overlay}
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

                <Modal
                    show={this.state.showModal}
                    onHide={this.hideModal}
                    dialogClassName="custom-modal"
                    bsSize="large"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg" style={styles.modal_title}>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{text}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        {extraButton}
                        <Button onClick={this.hideModal}>Fermer</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Game;