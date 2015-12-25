/**
 * Created by melanie on 02/12/15.
 */

import React from 'react';

import AreaMap from './AreaMap';
import City from '../City';

import CityStore from '../../stores/CityStore';

/**
 * Classe représentant une nouvelle région de France
 */
class BigAreaMap extends React.Component {

    /**
     * La vue correspond aux nouvelles régions, composés de l'ensemble des petites régions, de la ville capitale et des chemins
     * @returns {ReactElement}
     */
    render() {

        var areas = [];

        // Parcours des anciennes régions pour pouvoir toutes les ajouter à la vue
        for (let key in this.props.areas) {
            let area = this.props.areas[key];

            areas.push(
                <AreaMap
                    key={key}
                    name={area.name}
                    d={area.d}
                    stroke={area.stroke}
                    strokeWidth={area.strokeWidth}
                    strokeLinecap={area.strokeLinecap}
                    strokeLinejoin={area.strokeLinejoin}
                    strokeOpacity={area.strokeOpacity}
                    fill={this.props.fill}
                    fillOpacity={area.fillOpacity}
                />
            );
        }

        var capital = CityStore.findByName(this.props.capital);

        return (
            <g>
                {areas}
                <City
                    cx={capital.coordinateX}
                    cy={capital.coordinateY}
                    fill={this.props.fill}
                    name={this.props.capital}
                />
            </g>
        );
    }
}

export default BigAreaMap;

/**
 * Vérification des propriétés de l'objet
 * @type {object}
 * @property {array}  areas             - Required          - tableau d'objet représentant des {@link AreaMap} - sans l'attribut fill
 * @property {string} fill              - Required          - couleur de la région, reprise pour la création des {@link AreaMap} - champ fill (uniformisation)
 * @property {string} capital           - Required          - nom de la capitale de région
 */
BigAreaMap.propTypes = {
    areas: React.PropTypes.array.isRequired,
    fill: React.PropTypes.string.isRequired,
    capital: React.PropTypes.string.isRequired
};