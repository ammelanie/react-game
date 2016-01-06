/**
 * Created by melanie on 25/12/15.
 */

import React from 'react';

import GameStore from '../../stores/GameStore';

import Path from './Path';

import {GameConstants} from '../../constants/GameConstants';

/**  Classe représentant l'ensemble des chemins du jeu */
class Paths extends React.Component {

    /**
     * Constructeur de l'ensemble des chemins
     * @param props
     */
    constructor(props) {
        super(props);

        // Ajout de chacun des chemins en tant qu'état
        this.state = {paths: GameStore.getAllPaths()};

        // Binding des fonctions du composant
        this.onChange = this.onChange.bind(this);
    }

    /**
     * Callback appelé lorsque le store des chemins émet un changement
     * Cela va mettre à jour l'état du composant et donc rafraichir l'ensemble des chemins de la carte
     */
    onChange() {
        this.setState({ paths: GameStore.getAllPaths() });
    }

    /**
     * Callback déclenché lorsque le composant est monté
     * Ajout d'un listener sur le store
     */
    componentDidMount() {
        GameStore.addChangeListener(GameConstants.PATHS_CHANGE_EVENT, this.onChange);
    }

    /**
     * Callback déblenché lorsque le composant est démonté
     * Suppression d'un listener sur le store
     */
    componentWillUnmount() {
        GameStore.removeChangeListener(GameConstants.PATHS_CHANGE_EVENT,this.onChange);
    }

    /**
     * La vue correspond à un ensemble de chemins
     * @returns {ReactElement}
     */
    render() {

        var paths = [];

        // Affichage des chemins sur la carte
        for ( let key in this.state.paths) {
            let path = this.state.paths[key];

            // Récupération des villes d'extrémité du chemin
            let cityA = GameStore.findCityByName(path.cityA);
            let cityB = GameStore.findCityByName(path.cityB);

            paths.push(
                <Path
                    key={key}
                    x1={cityA.coordinateX}
                    y1={cityA.coordinateY}
                    x2={cityB.coordinateX}
                    y2={cityB.coordinateY}
                    active={path.active}
                />
            );
        }

        return (
            <g>
                {paths}
            </g>
        );
    }
}

export default Paths;