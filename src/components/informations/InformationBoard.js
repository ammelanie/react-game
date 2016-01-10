/**
 * Created by melanie on 10/01/16.
 */

'use strict';

import React from 'react';

import GameStore from '../../stores/GameStore';

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
        this.state = {news: GameStore.getAllNews()};

        this.onChange = this.onChange.bind(this);
    }

    /**
     * Callback appelé lorsque le store emet un changement
     * Cela va mettre à jour l'état du composant et donc rafraichir le journal de bord
     */
    onChange() {
        this.setState({news: GameStore.getAllNews()});
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
     * Permet de rendre la zone d'information
     * @returns {ReactElement}
     */
    render() {

        var messages = [];
        for (let message of this.state.news) {
            messages.unshift(<p>{message}</p>);
        }

        var board_style = {
            width: "600px",
            height: "400px",
            overflowY: "auto"
        };

        return (
            <div>
                <h3>Journal de bord</h3>
                <div style={board_style}>
                    {messages}
                </div>
            </div>
        );
    }
}

export default InformationBoard;