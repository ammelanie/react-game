/**
 * Created by melanie on 30/11/15.
 */

import React from 'react';

export default class AreaMap extends React.Component {

    render() {
        return (
            <path
                d={this.props.d}
                stroke={this.props.stroke}
                strokeWidth={this.props.strokeWidth}
                strokeLinecap={this.props.strokeLinecap}
                strokeLinejoin={this.props.strokeLinejoin}
                strokeOpacity={this.props.strokeOpacity}
                fill={this.props.fill}
                fillOpacity={this.props.fillOpacity}>
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

AreaMap.defaultProps = {
    stroke: "#000000",
    strokeWidth: 1,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeOpacity: 0.25,
    fillOpacity: 1
};