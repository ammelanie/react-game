/**
 * Created by melanie on 02/12/15.
 */

import React from 'react';
import AreaMap from './AreaMap';

/**
 * Classe représentant une nouvelle région de France
 */
class BigAreaMap extends React.Component {

    /**
     * La vue correspond aux nouvelles régions, composés de l'ensemble des petites régions et de la ville capitale
     * @returns {ReactElement}
     */
    render() {

        var areas = []

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

        return (
            <g>
                {areas}
                <circle r="5"
                        cx={this.props.capital.coordinateX}
                        cy={this.props.capital.coordinateY}
                        stroke="black"
                        strokeWidth="1"
                        fill="red"
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
 * @property {object} capital           - Required          - représentation de la capitale de la région. Required : name / coordinate X / coordinate Y
 */
BigAreaMap.propTypes = {
    areas: React.PropTypes.array.isRequired,
    fill: React.PropTypes.string.isRequired,
    capital: React.PropTypes.object.isRequired
};