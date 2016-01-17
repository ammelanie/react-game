/**
 * Created by melanie on 17/01/16.
 */

'use strict';

import React from 'react';

import { Button } from 'react-bootstrap';

/** classe générique représentant un bouton de la barre d'action
 *  permet la gestion de l'état d'activation du bouton **/
class ButtonAction extends React.Component {


    render() {
        var button_style = {
            backgroundColor: this.props.backgroundColor,
            color: "black",
            marginBottom: "5px",
            whiteSpace: "normal"
        };

        var buttonOptions = {};
        if (this.props.disabled) {
            buttonOptions['disabled'] = true;
            button_style['backgroundColor'] = "#CCCCCC";
            button_style['color'] = "grey";
        }

        return (
            <div>
                <Button onClick={this.props.onClickEvent} style={button_style} {...buttonOptions}>{this.props.text}</Button>
            </div>
        )
    }
}

export default ButtonAction;

/**
 * Vérification des propriétés de l'objet
 * @type {object}
 * @property {string} text                    - Required          - texte du bouton
 * @property {string} backgroundColor         - Required          - couleur du bouton
 * @property {bool} disabled                  - Required          - état du bouton
 * @property {func} onClickEvent              - Required          - fonction à appeler au clic
 */
ButtonAction.propTypes = {
    text: React.PropTypes.string.isRequired,
    backgroundColor: React.PropTypes.string.isRequired,
    disabled: React.PropTypes.bool.isRequired,
    onClickEvent: React.PropTypes.func.isRequired
};