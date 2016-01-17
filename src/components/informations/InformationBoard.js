/**
 * Created by melanie on 10/01/16.
 */

'use strict';

import React from 'react';

import GameStore from '../../stores/GameStore';

import NewsFeed from './NewsFeed';
import OutbreaksCounter from './OutbreaksCounter';
import EpidemicsCounter from './EpidemicsCounter';

import {GameConstants} from '../../constants/GameConstants';

/**  Classe représentant la zone d'information du jeu */
class InformationBoard extends React.Component {

    /**
     * Constructeur de l'ensemble du centre d'informations
     * @param props
     */
    constructor(props) {
        super(props);

        // Ajout des informations en tant qu'état
        this.state = {
            news: GameStore.getAllNews(),
            outbreaksGot: GameStore.getOutbreaks(),
            epidemicsGot: GameStore.getEpidemics()
        };

        this.onChange = this.onChange.bind(this);
    }

    /**
     * Callback appelé lorsque le store emet un changement
     * Cela va mettre à jour l'état du composant et donc rafraichir le journal de bord
     */
    onChange() {
        this.setState({
            news: GameStore.getAllNews(),
            outbreaksGot: GameStore.getOutbreaks(),
            epidemicsGot: GameStore.getEpidemics()
        });
    }

    /**
     * Callback déclenché lorsque le composant est monté
     * Ajout d'un listener sur le store
     */
    componentDidMount() {
        GameStore.addChangeListener(GameConstants.PLAYERS_CHANGE_EVENT, this.onChange);
        GameStore.addChangeListener(GameConstants.CITIES_CHANGE_EVENT, this.onChange);
        GameStore.addChangeListener(GameConstants.DISCOVER_ANTIDOTE_EVENT, this.onChange);
    }

    /**
     * Callback déblenché lorsque le composant est démonté
     * Suppression d'un listener sur le store
     */
    componentWillUnmount() {
        GameStore.removeChangeListener(GameConstants.PLAYERS_CHANGE_EVENT, this.onChange);
        GameStore.removeChangeListener(GameConstants.CITIES_CHANGE_EVENT, this.onChange);
        GameStore.removeChangeListener(GameConstants.DISCOVER_ANTIDOTE_EVENT, this.onChange);
    }

    /**
     * Permet de rendre la zone d'information
     * @returns {ReactElement}
     */
    render() {

        var styles = {
            boxes:{
                width: "50px",
                height: "50px",
                borderRadius: "25px",
                border: "1px solid black",
                position: "relative",
                float: "left",
                marginRight: "5px"
            },
            text:{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform:"translate(-50%,-50%)",
                color: "white"
            }
        };

        return (
            <div>
                <NewsFeed
                    news={this.state.news}
                />

                <OutbreaksCounter
                    outbreaksGot={this.state.outbreaksGot}
                    styles={styles}
                />

                <EpidemicsCounter
                    epidemicsGot={this.state.epidemicsGot}
                    styles={styles}
                />
            </div>
        );
    }
}

export default InformationBoard;