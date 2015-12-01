/**
 * Created by melanie on 30/11/15.
 */

import React from 'react';

export default class AreaMap extends React.Component {

    constructor(props) {
        super(props);

        this.name = props.name;
        this.d = props.d;
        this.stroke = props.stroke || "#000000";
        this.strokeWidth = props.strokeWidth || 1;
        this.strokeLinecap = props.strokeLinecap || "round";
        this.strokeLinejoin = props.strokeLinejoin || "round";
        this.strokeOpacity = props.strokeOpacity || 0.25;
        this.fill = props.fill;
        this.fillOpacity = props.fillOpacity || 1;
    }

    render() {
        return (
            <path d={this.d}
                  stroke={this.stroke}
                  strokeWidth={this.strokeWidth}
                  strokeLinecap={this.strokeLinecap}
                  strokeLinejoin={this.strokeLinejoin}
                  strokeOpacity={this.strokeOpacity}
                  fill={this.fill}
                  fillOpacity={this.fillOpacity}>
            </path>
        );
    }
}

AreaMap.propTypes = {
    d: React.PropTypes.string.isRequired,
    stroke: React.PropTypes.string,
    strokeWidth: React.PropTypes.number,
    strokeLinecap: React.PropTypes.string,
    strokeLinejoin: React.PropTypes.string,
    strokeOpacity: React.PropTypes.number,
    fill: React.PropTypes.string.isRequired,
    fillOpacity: React.PropTypes.number,
    name: React.PropTypes.string.isRequired
};