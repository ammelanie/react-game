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
import { Glyphicon } from 'react-bootstrap';

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
            showModal: true
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
                color: ( this.state.isGameEnded ) ? ( ( this.state.havePlayersWon ) ? 'green' : 'red' ) : 'green'
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
        } else {
            // Initialisation du contenu de la modale initiale
            title = "À L'AUBE D'UNE NOUVELLE AVENTURE...";
            text = <div>Vous voilà enfin depuis le temps ! La situation est urgente, nous vous avions prévenus, les virus
                {GameConstants.VIRUS_A} et {GameConstants.VIRUS_B} ont déjà commencé à sévir ! <br /><br />
                      Voici quelques précautions de base que vous devez savoir avant même de commencer à essayer de trouver les antidotes :
                      <ul>
                          <li>Vous n'avez que <strong>{GameConstants.NB_ACTIONS} actions par tour</strong> et les virus, eux, ne cessent de se propager !
                              Chacun de vous doit participer, la cohésion du groupe est primordiale ! Vous pouvez donc pour une action :
                              <ul>
                                  <li>Vous déplacer d'une ville à une autre ville directement liée</li>
                                  <li>Échanger la carte d'une ville où vous êtes tous les deux</li>
                                  <li>Guérir un niveau de virus dans la ville où vous êtes</li>
                                  <li>Découvrir un antidote, si vous avez {GameConstants.NB_CARD_FOR_ANTIDOTES} cartes villes du même virus et que vous êtes à Toulouse</li>
                              </ul>
                          </li>
                          <li>Vous ne pouvez <strong>pas avoir plus de {GameConstants.NB_CARD_PER_PLAYER} cartes dans votre main</strong> !</li>
                      </ul>
                      Lors de votre aventure, n'hésitez pas à me demander si vous avez besoin d'aide...
                      Je suis toujours disponible pour vous rappeler les règles de base, il vous suffit de cliquer sur l'icône (?) en cas de doute ! <br/><br />

                      Une fois les {GameConstants.NB_VIRUS} antidotes trouvés, nous pourrons considérer que la France sera sauvée... <br /><br />

                      Bon courage... Nous comptons TOUS sur vous !
                    </div>;
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
                        {text}
                    </Modal.Body>
                    <Modal.Footer>
                        {extraButton}
                        <Button onClick={this.hideModal}>Fermer</Button>
                    </Modal.Footer>
                </Modal>
                <Button bsStyle="info"><Glyphicon glyph="question-sign" /> Aide</Button>
            </div>
        );
    }
}

export default Game;