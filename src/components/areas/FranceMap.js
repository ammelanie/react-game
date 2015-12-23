/**
 * Created by melanie on 01/12/15.
 */

import React from 'react';
import BigAreaMap from './BigAreaMap';
import AreaStore from '../../stores/AreaStore';

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
                />
            );
        }

        return (
            <svg id="france-map" width="1000px" height="1000px">
                <g>
                    {areas}
                </g>
            </svg>
        );
    }
}

export default FranceMap;