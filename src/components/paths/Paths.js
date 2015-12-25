/**
 * Created by melanie on 25/12/15.
 */

import React from 'react';

import CityStore from '../../stores/CityStore';
import PathStore from '../../stores/PathStore';

import Path from './Path';

/**  Classe représentant l'ensemble des chemins du jeu */
class Paths extends React.Component {

    constructor(props) {
        super(props);

        this.state = {paths: PathStore.getAll()};

        this.onChange = this.onChange.bind(this);
    }

    /**
     * Callback appelé lorsque le store des chemins change
     * Cela va mettre à jour l'état du composant
     */
    onChange() {
        this.setState({ paths: PathStore.getAll() });
    }

    /**
     * Callback déclenché lorsque le composant est monté
     */
    componentDidMount() {
        PathStore.addChangeListener(this.onChange);
    }

    /**
     *
     */
    componentWillUnmount() {
        PathStore.removeChangeListener(this.onChange);
    }

    render() {

        var paths = [];

        // Affichage des chemins sur la carte
        for ( let key in this.state.paths) {
            let path = this.state.paths[key];

            // Récupération des villes d'extrémité du chemin
            let cityA = CityStore.findByName(path.cityA);
            let cityB = CityStore.findByName(path.cityB);

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