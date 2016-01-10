/**
 * Created by melanie on 10/01/16.
 */

'use strict';

import React from 'react';

/**  Classe représentant le fil du journal */
class NewsFeed extends React.Component {

    /**
     * La vue correspond au flux journal
     * @returns {ReactElement}
     */
    render() {

        var board_style = {
                width: "600px",
                height: "400px",
                overflowY: "auto"
        }

        // Ajout de chacun des messages au journal de bord
        var messages = [];
        for (let i in this.props.news) {
            let message = this.props.news[i];
            messages.unshift(
                <p key={"message-" + i}>
                    {message}
                </p>
            );
        }

        return (
            <div>
                <h3>Journal de bord</h3>
                <div style={board_style}>
                    {messages}
                </div>
            </div>
        );

    }
}

export default NewsFeed;

/**
 * Vérification des propriétés de l'objet
 * @type {object}
 * @property {array} news                  - Required          - l'ensemble des messages à afficher
 */
NewsFeed.propTypes = {
    news: React.PropTypes.array.isRequired
};