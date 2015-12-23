/**
 * Created by melanie on 01/12/15.
 */

import React from 'react';

import BigAreaMap from './BigAreaMap';
import Path from '../Path';

import AreaStore from '../../stores/AreaStore';
import CityStore from '../../stores/CityStore';
import PathStore from '../../stores/PathStore';

/**
 * Classe représentant la carte de France
 */
class  FranceMap extends React.Component {

    /**
     * Création des 13 nouvelles régions de France
     * @constructor
     */
    constructor() {
        super();

        this.areas = AreaStore.getAll();

        var allPaths = PathStore.getAll();
        var paths = [];

        // Ajout d'une propriété active sur les chemins
        for (let path of allPaths) {
            path.active = false;
            paths.push(path);
        }

        this.state = {paths: paths};
    }

    /**
     * Permet de désactiver l'ensemble des chemins et de n'activer que les chemins ayant un lien avec la ville cliquée
     * Le lien s'établie à l'aide de la constante NUMBER_OF_ALLOWED_ACTIONS et vaut 2. Ainsi, tous les chemins à
     * une distance de 2 de la ville seront activés
     * @param cityName nom de la ville dont il faut activer/désactiver les chemins
     */
    toggleActivationPathFor(cityName) {

        // Recherche des chemins à activer
        var pathsToActivate = PathStore.searchPathsToActivate(cityName, this.state.paths);

        // Activation des bons chemins
        var activatedPaths = this.activatePaths(pathsToActivate);

        // Mise à jour de l'état avec les nouveaux chemins
        this.setState({paths: activatedPaths});
    }

    /**
     * Permet d'activer les chemins passés en paramètre sur le carte. Tous les autres chemisn sont désactivés
     * @param pathsToActivate   tableau des chemins à activer
     * @returns {Array}         l'ensemble des chemins, de la carte, mis à jour
     */
    activatePaths(pathsToActivate) {

        var allPaths = this.state.paths;

        // Passage de l'ensemble des chemins à l'état désactiver
        for ( let path of allPaths ) {
            path.active = false;
        }

        // Activation des chemins à activer
        for ( let path of allPaths ) {

            for ( let activatePath of pathsToActivate ) {

                // Un chemin est à activer si sa ville de départ/arrivé correspond aux villes de départ/arrivé d'une
                // ville désignée comme devant être activée
                if ( ( activatePath.cityA === path.cityA || activatePath.cityA === path.cityB ) &&
                ( activatePath.cityB === path.cityB || activatePath.cityB === path.cityA ) )  {
                    path.active = true;
                    break;
                }

            }
        }

        return allPaths;
    }

    /**
     * La vue correspond à la carte de France avec les nouvelles régions
     * @returns {ReactElement}
     */
    render() {

        var areas = [];

        // Parcours des nouvelles régions pour pouvoir toutes les ajouter à la carte de France
        for (let key in this.areas) {
            let bigArea = this.areas[key];

            areas.push(
                <BigAreaMap
                    key={key}
                    areas={bigArea.areas}
                    fill={bigArea.fill}
                    capital={bigArea.capital}
                    toggleActivationPathFor={this.toggleActivationPathFor.bind(this)}
                />
            );
        }

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
            <svg id="france-map" width="1000px" height="1000px">
                <g>
                    {areas}
                </g>
                <g>
                    {paths}
                </g>
            </svg>
        );
    }
}

export default FranceMap;