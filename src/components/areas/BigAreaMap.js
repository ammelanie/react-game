/**
 * Created by melanie on 02/12/15.
 */

import React from 'react';
import AreaMap from './AreaMap';

/**
 * Classe représentant une nouvelle région de France
 */
export default class BigAreaMap extends React.Component {

    render() {

        var areas = []

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

BigAreaMap.propTypes = {
    areas: React.PropTypes.array.isRequired,
    fill: React.PropTypes.string.isRequired,
    capital: React.PropTypes.object.isRequired
};