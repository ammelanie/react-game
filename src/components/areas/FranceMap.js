/**
 * Created by melanie on 01/12/15.
 */

'use strict';

import React from 'react';

import BigAreaMap from './BigAreaMap';
import Path from '../paths/Path';

import Data from '../../utils/data'

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

        this.areas = Data.areas();
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
            <g>
                {areas}
            </g>
        );
    }
}

export default FranceMap;