/**
 * Created by melanie on 06/01/16.
 */

'use strict';

import {GameConstants} from '../constants/GameConstants';

/************************************************
 *                                              *
 *     Définition des données brutes du jeu     *
 *                                              *
 ************************************************/

export default {

    /**
     * Définition des joueurs du jeu
     * @returns {Array} le tableau des joueurs
     */
    players() {
        var players = [
            {
                name: "PION_BLANC_1",
                color: "white"
            }, {
                name: "PION_NOIR_2",
                color: "black"
            }
        ];

        // Ajout de la ville initiale à chacun des joueurs et d'une propriété de selection
        for (let player of players) {
            player.cityName = GameConstants.START_CITY;
            player.selected = false;
        }

        return players;
    },

    /**
     * Définition de l'ensemble des villes du jeu
     * @returns {Object} objet d'objets ayant pour clé le nom de chaque ville
     */
    cities() {
        var cities = {
            "Rennes": {
                coordinateX: 120,
                coordinateY: 160,
                canBeInfected: true
            },
            "Rouen": {
                coordinateX: 240,
                coordinateY: 90,
                canBeInfected: true
            },
            "Paris": {
                coordinateX: 300,
                coordinateY: 143,
                canBeInfected: true
            },
            "Lille": {
                coordinateX: 328,
                coordinateY: 25,
                canBeInfected: true
            },
            "Strasbourg": {
                coordinateX: 515,
                coordinateY: 150,
                canBeInfected: true
            },
            "Lyon": {
                coordinateX: 400,
                coordinateY: 330,
                canBeInfected: true
            },
            "Dijon": {
                coordinateX: 390,
                coordinateY: 230,
                canBeInfected: true
            },
            "Marseille": {
                coordinateX: 400,
                coordinateY: 480,
                canBeInfected: true
            },
            "Ajaccio": {
                coordinateX: 495,
                coordinateY: 550,
                canBeInfected: true
            },
            "Toulouse": {
                coordinateX: 220,
                coordinateY: 450,
                canBeInfected: true
            },
            "Bordeaux": {
                coordinateX: 140,
                coordinateY: 350,
                canBeInfected: true
            },
            "Orléans": {
                coordinateX: 270,
                coordinateY: 190,
                canBeInfected: true
            },
            "Nantes": {
                coordinateX: 120,
                    coordinateY: 220,
                    canBeInfected: true
            },
            "A": {canBeInfected: false},
            "B": {canBeInfected: false},
            "C": {canBeInfected: false},
            "D": {canBeInfected: false},
            "E": {canBeInfected: false},
            "F": {canBeInfected: false},
            "G": {canBeInfected: false},
            "H": {canBeInfected: false},
            "I": {canBeInfected: false},
            "J": {canBeInfected: false},
            "K": {canBeInfected: false},
            "L": {canBeInfected: false},
            "M": {canBeInfected: false}
        };

        // Ajout de la notion de virus pour les 13 principales villes, pouvant être infectés
        for (let key in cities) {
            var city = cities[key];

            if ( city.canBeInfected ) {
                city['viruses'] = {};
                city['viruses'][GameConstants.VIRUS_A] = {};
                city['viruses'][GameConstants.VIRUS_B] = {};
                city['viruses'][GameConstants.VIRUS_A]['level'] = 0;
                city['viruses'][GameConstants.VIRUS_B]['level'] = 0;
            }
        }

        return cities;
    },

    /**
     * Définition de l'ensemble des chemins du jeu
     * @returns {Array} les chemins du jeu
     */
    paths() {
        var paths = [{
            cityA : "Rennes",
            cityB: "Rouen"
        }, {
            cityA: "Rennes",
            cityB : "Nantes"
        }, {
            cityA : "Rennes",
            cityB: "Paris"
        }, {
            cityA: "Rouen",
            cityB: "Lille"
        }, {
            cityA: "Paris",
            cityB: "Strasbourg"
        }, {
            cityA: "Paris",
            cityB: "Orléans"
        }, {
            cityA: "Paris",
            cityB: "Dijon"
        }, {
            cityA: "Paris",
            cityB: "Lille"
        }, {
            cityA: "Lille",
            cityB: "Strasbourg"
        }, {
            cityA: "Strasbourg",
            cityB: "Dijon"
        }, {
            cityA: "Lyon",
            cityB: "Dijon"
        }, {
            cityA: "Lyon",
            cityB: "Bordeaux"
        }, {
            cityA: "Lyon",
            cityB: "Marseille"
        }, {
            cityA: "Marseille",
            cityB: "Ajaccio"
        }, {
            cityA: "Marseille",
            cityB: "Toulouse"
        }, {
            cityA: "Toulouse",
            cityB: "Bordeaux"
        }, {
            cityA: "Bordeaux",
            cityB: "Nantes"
        }, {
            cityA: "Bordeaux",
            cityB: "Orléans"
        }];

        // Ajout de la propriété active à false par défaut pour chacun des chemins
        for (var path of paths) {
            path.active = false;
        }

        return paths;
    },

    areas() {
        return [
            {
                areas: [
                    {
                        name: "Ile De France",
                        d: "M308.04,177.68l-16.31-2.95l-3.94-9.76l-15.24,0.32l-7.77-12.18l-9.31-7.84l-0.19-8.74l-4.45-5.1l2.5-13.32l9.44-4.66l15.95-2.04l5.39,3.77l7.23-2.37l6.13,7.29l23.76,1.75l2.08-4.81l10.09,16.02l3.43,15.88l-4.76,4.2l-1.41,12.08l-13.32,0.35L308.04,177.68z"
                    }
                ],
                fill: "#FFBFBF",
                capital:  "Paris"
            }, {
                areas: [
                {
                    name: "Nord Pas De Calais",
                    d: "M327.25,61.98l-26.82-4.56l2.41-6.26l-13.89,0.61l-7.34-8.19l-10.14-0.57l-6.35-4.65l4.49-27.99l6.36-5.52l14.86-2.5L307.96,0l3.43,15.74l6.98,5.38l13.3-4.25l5.65,16.43l9.49,1.64l3.75,11.31l17.97,1.57l2.44,18.56l-5.76,4.26l-6.39-5.9l-9.93,2.61l-7.6-2.48l-9.94,3.3L327.25,61.98z"
                }, {
                    name: "Picardie",
                    d: "M323.34,117.03l-2.08,4.81l-23.76-1.75l-6.13-7.29l-7.23,2.37l-5.39-3.77l-15.95,2.04l0.36-13.6l3.78-5.62l-2.97-3.64l4.1-12.98l-2.31-8.85l-5.27-7.94l0.9-17.17l3.77-5.27l6.35,4.65l10.14,0.57l7.34,8.19l13.89-0.61l-2.41,6.26l26.82,4.56l4.11,6.19l9.94-3.3l7.6,2.48l9.93-2.61l6.39,5.9l5.76-4.26l0.38,11.07l-6.36,10.2l-3.58,15.72l-17.57,3.02l3.91,10.65l-5.72-0.76l0.7,14.48l-9.31,2.29L323.34,117.03z"
                }
                ],
                fill: "#FFFFB1",
                capital: "Lille"
            }, {
                areas: [
                    {
                        name: "Alsace",
                        d: "M490.31,170.33l-3.83-1.88l-1.6-9.52l8.04-9.13l3.24-6.89l-4.29-3.58l-6.94,2.39l-4.57-7.47l5.08-8.05l8.76,5.52l10.15-1.14l2.47-7.08l4.26-0.32l22.82,5.16l-2.9,9.28l-7.78,6.23l-14.77,41.93l1.98,4l-6.98,15.16l3.41,7.45l-7.17,9.59l-5.09,0.79l-2.5,3.53l-4.72-6.09l-1.33-4.58l-4.76-4.7l-1.11-5.09l-6.74-3.09l9.31-17l1.15-8.54L490.31,170.33z"
                    }, {
                        name: "Lorraine",
                        d: "M432.79,192.93l-8.97-9.44l2.75-2.86l-0.21-9.17l-10.34-1.69l0.72-6.42l-14.97-12.48l-5.6-2.06l-3.31-9.01l6.2,0.35l2.04-13.27l-4.91-2.44l1.56-10.68l7.95-19.88l7.78,2.16l3-2.66l4.96,1.89l9.89-1.6l10.06,7.17l11.54-3.24l4.27,3.57l5.14-0.82l11.33,16.18l6.49-4.08l10.84,6.72l8.63-3.55l6.53,1.06l0.96,6.79l-0.29,0.02l-2.47,7.08l-10.15,1.14l-8.76-5.52l-5.08,8.05l4.57,7.47l6.94-2.39l4.16,3.84l-3.11,6.63l-8.04,9.13l1.6,9.52l3.83,1.88l-6.41,6.86l-1.15,8.54l-9.31,17l-9.9-8.97l-3.17,4.82l-4.8-6.26l-10.65,2.74l-0.34-5.14L432.79,192.93z"
                    }, {
                        name: "Champagne-Ardenne",
                        d: "M383.88,184.86l0.27,0.34l-12.26,5.51l-7.63,4.2l-3.67-4.1l-11.38,1.03l-6.29-15.35l-6.72-0.94l1.02-6.6l-6.53-3.75l1.41-12.08l4.76-4.2l-3.43-15.88l9.31-2.29l-0.7-14.48l5.72,0.76l-3.91-10.65l17.57-3.02l1.11-3.83l2.47-11.9l6.36-10.2l-0.38-11.07l11.42,0.93l12.89-10.61l0.24,21.11l5.59,0.87l15.37,14.69l-3,2.66l-7.78-2.16l-7.95,19.88l-1.56,10.68l4.91,2.44l-2.04,13.27l-6.2-0.35l3.31,9.01l5.6,2.06l14.97,12.48l-0.72,6.42l10.34,1.69c0.02,0.41,0.27,8.35,0.21,9.17l-2.75,2.86l8.97,9.44l-8.02,9.82l0.52,4.75l-3.84,2.29l-2.09-2.34l-6.03,5.49l-11.73-2.05l-5.18-3.58l0.54-7.78L383.88,184.86z"
                    }
                ],
                fill: "#32CD32",
                capital:  "Strasbourg"
            }, {
                areas: [
                    {
                        name: "Rhône-Alpes",
                        d: "M383.51,298.29l3.64-4.41l2.1-13.97l17.21,0.13l2.13,3.93l-4.89,4.06l8.24,7.69l5.62-3.57l5.89,4.76l19.82-12.77l3.81,11.42l-8.38,6.76l1.31,3.54l1.27-0.07l11.14-5.75l0.16-6.38l7.16-5.43l17.17,0.96l2.49,9.02l-6.36,2.14l3.25,6.01l8.31,6.57l-1.11,7.99l-8.66,2.58l-0.44,6.36l7.76,6.27l1.6,9.54l7.09,3.72l-3.09,3.99l-0.36,9.14l-5.39,0.26l-4.81,4.17l-11.8,1l-11.23,5.06l-7.45-2.64l-0.38,5.54l7.67,3.48l-0.81,7.73l-7.16-2.77l-7.14,1.13l-3.28,2.32l-4.03,1.16l-5.39,8.58l-5.11,0.23l-3.08,3.69l4.63,2.55l-2.22,3.49l-7.37,0.42l-3.08,3.71l4.52,4.14l4.43,1.36l3.89,5.85l-2.73,3.02l-3.02-1.28l-4.26,4.08l-9.2-6.84l-8.49,3.19l5.49-8.77l-12.69,3.74l-6.85-3.31l-13.39,1.61l0.5-3.17l-5.84-1.29l-2.89,5.11l-8.48-4.09l-0.24-4.73l-4.32-2.88l-5.12-20l18.33-7.58l-0.24-4.73l3.16-0.66l1.2-5.21l4.24-0.03l1.33-6.87l-3.96-8.28l-4.28,0.59l-1.66-4.53l-13.67,1.45l2-8.5l-8.76-16.31l1.47-4.92l-4.41-5.66l6.36-6.17l1.31-14.92l4.19-0.46l4.45,4.63l10.98,1.23l10.62-10.51L383.51,298.29z"
                    }, {
                        name: "Auvergne",
                        d: "M275.33,281.76l13.94-5.32l2.2-11.54l21.8-5.58l0.19,4.94l15.01,3.62l7.68-5.47l7.37,12.7l7.9,4.33l-0.1,9.71l-3.45,5.42l-4.19,0.46l-1.31,14.92l-6.36,6.17l4.41,5.66l-1.47,4.92l8.76,16.31l-2,8.5l13.67-1.45l1.66,4.53l4.28-0.59l3.96,8.28l-1.33,6.87l-4.24,0.03l-1.2,5.21l-3.16,0.66l0.24,4.73l-18.33,7.58l-7.98-3.23l-0.26-4.32l-3.11,0.11l-2.1,5.71l-3.96,0.05l-0.46-5.58l-5.9-4.63l-8.88,5.75l-6.1,14.8l-1.03-9.64l-3.41,0.22l-5.51-10.17l-12.53,17.63l-11.79-1.08l-3.3-1.43l1.73-8.79l-5.51-1.98l1.64-9.09l4.21-5.99l1.18-4.93l4.78-3.62l1.96-7.94l9.51-2.53l0.38-9.7l2.32-4.87l-4.69-5.81l2-4.33l-4.46-4.97l9.25-3.71l1.37-10.97l-12.43-12.36L275.33,281.76z"
                    }
                ],
                fill: "#80FFFF",
                capital: "Lyon"
            }, {
                areas: [
                    {
                        name: "Franche-Compté",
                        d: "M473.44,202.73l6.74,3.09l1.11,5.09l4.76,4.7l-0.68,6.63l-5.78,1.06l-4.21,3.61l9.81,1.15l-0.28,4.14l-25.78,21.33l-1.98,8.21l-10.89,6.33l-0.21,0.97l0.78,7.12l-3.58,7.96l-19.82,12.77l-5.89-4.76l-5.62,3.57l-8.24-7.69l4.74-4.27l-1.98-3.72l0.86-9.21l-5.98-7.56l7.23-2.37l-6.91-6.53l13.07-19.23l0.87-5.97l-2.49-4.86l5.56-6.9l-5.34-4.46l6.03-5.49l2.09,2.34l3.84-2.29l-0.52-4.75l8.02-9.82l11.8-3l0.34,5.14l10.65-2.74l4.8,6.26l3.17-4.82L473.44,202.73z"
                    }, {
                        name: "Bourgogne",
                        d: "M311.82,210.72l-3.33-7.93l5.27-10.82l-0.77-13.37l-4.94-0.92l9.32-12.12l13.32-0.35l6.48,3.56l-1.02,6.6l6.72,0.94l6.29,15.35l11.37-1.03l3.68,4.09l19.89-9.71l13.08,14.66l-0.8,7.45l5.17,3.58l11.73,2.05l5.34,4.46l-5.56,6.9l2.49,4.86l-0.82,6.16l-13.07,19.23l6.91,6.53l-7.23,2.37l5.98,7.56l-0.86,9.21l-17.21-0.13l-2.1,13.97l-3.64,4.41l-9.61-8.35l-10.62,10.51l-10.98-1.23l-4.45-4.63l3.45-5.42l0.1-9.71l-7.9-4.33l-7.37-12.7l-7.68,5.47l-15.01-3.62l-0.19-4.94l0.15-6.72l-3.49-6.86l1.22-17.7l-4.64-6.37l0.64-7.7L311.82,210.72z"
                    }
                ],
                fill: "#BFBFFF",
                capital:"Dijon"
            }, {
                areas: [
                    {
                        name: "Provence-Alpes-Côte d'Azue",
                        d: "M419.99,487.29l-13.23-0.74l-4.35-2.46l4.47-3.36l-5.61-4.75l-9.49,2.25l-3.55-5.76l-5.64-0.31l-2.07,5.44l-8.9-2.16l-3.83-5.77l-9.84-0.83l0.64-5.24l8.15-1.36l-0.62-5.44l7.48-1.8l1.45-8.8l10.35-6.65l-0.97-6.34l-6.39-9.89l2.99-6.5l6.85,3.31l12.69-3.74l-5.49,8.77l8.49-3.19l9.2,6.84l4.26-4.08l3.02,1.28l2.73-3.02l-3.89-5.85l-4.43-1.36l-4.52-4.14l3.08-3.71l7.37-0.42l2.22-3.49l-4.63-2.55l3.08-3.69l5.11-0.23l5.39-8.58l4.03-1.16l3.28-2.32l7.14-1.13l7.16,2.77l0.81-7.73l-7.67-3.48l0.38-5.54l7.45,2.64l11.23-5.06l10.83,16.99l6.99,1.23l0.94,9.07l-4.48,1.29l-2.32,2.59l-2.78,7.16l4.21,4.53l-2.83,6.08l4.78,4.14l10.1,5.28l11.63,3.42l11.17-2.15l3.13,7.95l-7.5,6.24l-4.25,12.54l-11.69,1.28l-7.76,10.12l-5.47-0.17l-5.28,9.55l-6.27,0.76l-4.91,5.55l6.14,1.19l-6.5,6.42l-8.57-0.89l-2.29,4.59l-9.72-2.49l0.76,5.33l-11.92-3.45l0.78,5.04l-7.95-3.5L419.99,487.29z"
                    }
                ],
                fill: "#868686",
                capital: "Marseille"
            }, {
                areas: [
                    {
                        name: "Corse",
                        d: "M520.93,495.94l5.25,0.65l-0.26,14.49l3.85,12.02l-0.57,18.6l-6.99,6.58l0.34,5.02l-2.89,21.22l-5.52,6.35l-6.9-6.5l-8.45-0.48l1.44-3.56l-3.75-3.79l5.48-5.8l-9-1.61l3-6.92l-5.42-0.82l5.42-7.74l-6.42-0.82l-0.57-6.75l3.42-2.63l-0.04-5.46l7.04-11.83l9.2-2.26l5.77-3.51l3.95,1.83l2.8-15.95L520.93,495.94z"
                    }
                ],
                fill: "#800000",
                capital: "Ajaccio"
            }, {
                areas: [
                    {
                        name: "Languedoc-Roussillon",
                        d: "M276.37,471.41l7.04-3.72l-4.57-7.47l5.93-4.11l5.72,3.1l7.42-5l3.37,0.33l4.06-9.77l4.28,1.76l6.94-4.46l0.03-4.72l5.34-3.59l-7.21-2.98l3.08-6.7l-10.25-3.07v-16.38l-5.05-8.61l6.1-14.8l8.88-5.75l5.9,4.63l0.46,5.58l3.96-0.05l2.1-5.71l3.11-0.11l0.26,4.32l7.98,3.23l5.12,20l4.32,2.88l0.24,4.73l8.48,4.09l2.89-5.11l5.84,1.29l-0.5,3.17l13.39-1.61l-2.99,6.5l6.39,9.89l0.97,6.34l-10.35,6.65l-1.45,8.8l-7.48,1.8l0.74,5.6l-8.28,1.2l-0.64,5.24l-6.46-0.64l-2.47-5.13c-12.11-0.68-19.38,11.31-19.76,11.94c-2.79-0.72-10.17,5.21-10.56,5.51c-7.31-0.69-10.98,2.01-11.18,2.15c-11.16,6.08-10.93,22.19-10.92,23.04l1.24,14.79l3.24,2.13l3.86,5.49l-3.1,4l-3.49-2.7l-12.14-0.12l-5.51,6.07l-4.84-3.6l-5.99,4.94l-7.24-5.68l-5.12-3.62l-10.6,6.08l-7.11-10.16l16.25-10.2l-2.95-4.62l-4.87,1.18l-6.07-4.73l6.74-6.05l0.17-9.5l-10.78-9.09l0.24-8.37l5.13-0.08l0.87-4.52l6.16,2.51l4.25-2.83l8.26,4.11l0.27-3.99L276.37,471.41z"
                    }, {
                        name: "Midi-Pyrénées",
                        d: "M297.91,454.21l-7.42,5l-5.72-3.1l-5.93,4.11l4.57,7.47l-7.04,3.72l-12.7-4.31l-0.57,4.14l-8.2-4.07l-4.18,2.67l-6.16-2.51l-0.72,4.49l-5.38,0.26l-0.22,8.23l10.87,9.08l-0.17,9.5l-6.74,6.05l5.92,4.76l5.17-1.1l2.8,4.5l-16.25,10.2l-5.97-2.04l1.43-4.36l-4.59-3.04l-9.03-0.23l-3.75-7.15l-5.97,0.5l-13.71-7.55l-7.63-1.37l-0.69,9.97l-8.88-2.44l-3.96-0.28l-4.66,1.96l-4.54-3.87l-9.43,0.9l-10.72-7.86l1.43-12.53l5.32,0.7l-0.46-5.58l11.1-9.22l0.22-7.37l-3.28-1.56l-0.77-9.33l-12.4,0.62l6.05-5.25l-0.7-14.48l11.64-4.9l1.71,3.98l3.77-6.13l8.64,0.68l7.55-3.03l8.54,3.25l3.79-1.84l0.44-2.32l8.28-1.2l2.6-8.86l-3.98-3.83l0.44-2.19l7.32,0.3l-1.67-8.48l4.49-3.64l0.2-2.9l7.45-1.39l-0.21-5.16l8.87-13.93l10.56,2.01l18.09-1.13l-1.64,9.09l5.51,1.98l-1.73,8.79l3.3,1.43l11.79,1.08l12.53-17.63l5.51,10.17l3.41-0.22l1.03,9.64l5.05,8.61v16.38l10.25,3.07l-3.08,6.7l7.21,2.98l-5.34,3.59l-0.03,4.72l-6.82,4.62l-4.4-1.92l-4.06,9.77L297.91,454.21z"
                    }
                ],
                fill: "#DEB887",
                capital: "Toulouse"
            }, {
                areas: [
                    {
                        name: "Aquitaine",
                        d: "M218.03,391.29l-0.2,2.9l-4.49,3.64l1.67,8.48l-7.32-0.3l-0.44,2.19l3.98,3.83l-2.6,8.86l-8.28,1.2l-0.44,2.32l-3.79,1.84l-8.54-3.25l-7.54,2.79l-8.66-0.44l-3.77,6.13l-1.71-3.98l-11.64,4.9l0.7,14.48l-6.05,5.25l12.4-0.62l0.78,9.09l3.28,1.57l-0.24,7.6l-11.08,8.98l0.44,5.82l-5.32-0.7l-1.41,12.3l-15.21-0.85l-5.07-8.34l-20.3-8.91l-1.96-4.27l-4.55,4.46l-5.8-1.99l4.39-10.3l-3.92-4.67l-5.04,3.33l-2.48-5.14l-5.06-0.28l-1.18-3.4l7.44-1.25l6.95-4.73l6.95-8.88l7.23-18.76l6.68-35.45l1.53-5.75l9.9-0.01l-4.31-7.18l-4.51,3.92c0.15-0.66,10.17-41.46,7.97-50.09l3.64-3.68l0.75,5.59l8.95,9.38l5.41,20.02l-0.86-19.01l7.09-0.29l4.43,3.44l0.1,6.67l6.96,1.5l6.93,6.84l4.35-3.33l1.05-4.33l11.03-5.41l-0.1-6.66l6.91-1.84l4.79-11.95l8.24-4.51l10.61,6.47l9.21,12.04l4.68-0.3l-0.49,7.06l-4.68,6.4l7.9,8.49l-0.17,10.55l-8.87,13.93l0.21,5.16L218.03,391.29z"
                    }, {
                        name: "Limousin",
                        d: "M219.82,308.08l-7.1-12.68l10.92-10.77l10.13-5.22l10.49,2.29l9.31-1.12l17.31,0.39l4.46,0.8l2.83,8.21l12.43,12.36l-1.37,10.97l-9.25,3.71l4.46,4.97l-2,4.33l4.69,5.81L284.8,337l-0.38,9.7l-9.51,2.53l-1.96,7.94l-4.78,3.62l-1.18,4.93l-4.21,5.99l-18.09,1.13l-10.56-2.01l0.17-10.55l-7.9-8.49l4.68-6.4l0.49-7.06l-4.69,0.28l-9.2-12.02l-10.61-6.47L219.82,308.08z"
                    }, {
                        name: "Poitou-Charentes",
                        d: "M145.3,339.97l-5.12-10.62l-6.82-7.61l-7.56-3.59l-2.04-4.78l-9.97-6.96l-1.07-5.05l9.1,3.29l5.53,5.27l5.93-3.17l5.04-7.5l-3.58-5.48l4.62-1.4l-8.3-10.74l5.28-6.92l14.09,0.51l2.08,3.46l7.87-3.96l-3.29-3.45l-0.83-12.54l3.72-4.79l-10.43-8.63l-0.96-6.45l-10.5-9.61l19.5,5.83l5.11-4.62l22.93,0.97l6.44-2.87l8.63,3.56l0.06,10.24l10.22-2.41l9.64,12.85l6.25,1.52l-1.29,9.4l8.2,15.69l-10.13,5.22l-10.92,10.77l7.1,12.68l-12.75,12.02l-8.24,4.51l-4.79,11.95l-6.91,1.84l0.1,6.66l-11.03,5.41l-1.05,4.33l-4.35,3.33l-6.93-6.84l-6.96-1.5l-0.1-6.67l-4.43-3.44L145.3,339.97z"
                    }
                ],
                fill: "#CCCCCC",
                capital: "Bordeaux"
            }, {
                areas: [
                    {
                        name: "Centre",
                        d: "M270.86,280.97l-17.31-0.39l-9.38,0.96l-10.41-2.13l-8.2-15.69l1.29-9.4l-6.25-1.52l-9.64-12.85l-10.22,2.41l-0.06-10.24l-8.63-3.56l-1.63-6.94l6.97-4.8l1.41-16.23l18.92-1.17l0.13-7.93l8.99-5.74l0.71-11.4l5.86-0.41l-7.1-7.92l0.2-7.42l6.44-2.34l0.55-8.02l-1.19-4.02l0.64-6.06l17.88-6.74l4.45,5.1l0.33,8.95l9.17,7.63l7.77,12.18l15.24-0.32l3.94,9.76l21.25,3.87l0.77,13.37l-5.27,10.82l3.33,7.93l-4.67,3.26l-0.64,7.7l4.64,6.37l-1.22,17.7l3.49,6.86l-0.17,4.07l0.02,2.65l-21.8,5.58l-2.2,11.54l-13.94,5.32L270.86,280.97z"
                    }
                ],
                fill: "#4682B4",
                capital: "Orléans"
            }, {
                areas: [
                    {
                        name: "Pays de la Loire",
                        d: "M193.29,153.19l15.58-4.09l3.36,4.63l-0.05,4.72l7.71,2.93l6.42,4.65l7.1,7.92l-5.86,0.41l-0.59,11.58l-9.1,5.56l-0.13,7.93l-18.79,1.2l-1.54,16.2l-6.97,4.8l1.63,6.94l-6.44,2.87l-22.93-0.97l-5.11,4.62l-19.5-5.83l10.5,9.61l0.96,6.45l10.43,8.63l-3.72,4.79l0.83,12.54l3.29,3.45l-7.87,3.96l-2.08-3.46l-14.09-0.51l-8.07-1.85c-0.51-0.52-10.03-10.28-10.86-10.6c-0.82-0.32-4.31-0.51-4.48-0.52l-3.59-13.54l-10.07-9.72l4.1-2l-1.14-3.95l6.18-3.54l1.02-2.43l-8.09-5.74l3.84-6.45l14.44-0.3l-15.32-3.35l-6.44,3.24l-11.04-3.95l4.05-1.44l-1.36-4.8l5.53-4.01l7.55-2.9l3.82-8.91l8.71-0.66l4.73-3.06l7.31,0.69l6.62-5.74l7.44,4.72l5.42-7.37l0.87-4.39l7.04,0.39l0.32-4.7l-4.04-11.06l4.21-3.65l1.12-14.23l5.22,0.96l4.75,5.84l19.89-5.66l6.36,5.6L193.29,153.19z"
                    }
                ],
                fill: "#BFFFBF",
                capital: "Nantes"
            }, {
                areas: [
                    {
                        name: "Haute-Normandie",
                        d: "M263.19,99.9l-0.41,13.54l-9.44,4.66l-2.5,13.32l-17.88,6.74l-6.21-9.89l-3.18-5.44l-7.77-1.84l1.32-17l-4.7-13.87l7.48-1.81l7.04,0.39l-10.02-2.22l-3.62-0.77l-6.42-1.2l3.65-7.85l9.18-6.15l12.36-2.92l15.36-5.52l9.35-4.47l4.22-5.88l-0.48,9.14l5.21,7.87l2.31,8.85l-4.1,12.98l3.03,3.7L263.19,99.9z"
                    }, {
                        name: "Basse-Normandie",
                        d: "M223.56,122.83l9.4,15.34l-0.64,6.06l1.09,3.88l-0.55,8.02l-6.34,2.49l-0.2,7.42l-6.42-4.65l-7.71-2.93l0.05-4.72l-3.36-4.63l-15.58,4.09l-0.86-7.5l-6.43-5.67l-19.89,5.66l-4.75-5.84l-14.94-2.6l-4.36,5.86l-7.08-4.01l-0.06-6.24l8.46-0.78l-5.51-6.13l1.89-27.39l-7.93-20.16l2.4-6.25l-4.54-3.87l3.27-2.32l4.83,3.89l10.73,0.04l6.92-2.11l3.26,1.85l-0.06,4.99l-3.14,4.54l3.82,10.21l5.37,0.02l32.66,6l8.2-3.34l6.86-1.92l4.7,13.87l-1.32,17L223.56,122.83z"
                    }
                ],
                fill: "#FF80B0",
                capital: "Rouen"
            }, {
                areas: [
                    {
                        name: "Bretagne",
                        d: "M106.4,187.95l-3.82,8.91l-7.55,2.9l-14.77-0.71l-5.81-5.87l7.35-0.15l-0.33-3.35l-9.61,0.01l-5.22,1.93l-0.05,8.88l-3.11-4.06l1.58-6.57l-1.35-5.07l-6.53-3.7l-2.93,1.51L47,174.85l-12.71-2.49l-1.98-4l-8.45-0.47L24,174l-9.87-4.44c0.8-11.62-13.39-16.11-14.13-16.35l14.68,0.28l6.43-2.98l-6.34-6.46l-2.44,2.64l-1.5-2.86l-3.72-3.54l4.14-2.54l3.71,3.54l9.12-1.15l-5.32-4.74l3.61-3.12l-8.08,2.31l-10.18-0.01l-2.99-5.72l4.02-0.88l-0.22-5.01l15.63-5.23l3.18,2.96l13.74-2.56l5.29,5.29l3.83-6.45l2.94,6.56l11.52-11.29l8.45,0.47l10.28-3.19l-1.02,6.61l4.92,4.04l8.13,13.23l9.39-5.03l9.17-1.7l-0.46,6.64l5.78-1.9l2.27,2.19l3.05-0.82l-0.26-4.46l6.54-0.47l-1.29,2.16l0.94,2.82l7.98,0.04l0.06,6.24l7.08,4.01l4.36-5.86l9.72,1.65l-1.12,14.23l-4.21,3.65l4.04,11.06l-0.32,4.7l-7.04-0.39l-0.87,4.39l-5.42,7.37l-7.44-4.72l-6.62,5.74l-7.31-0.68l-4.73,3.06L106.4,187.95z"
                    }
                ],
                fill: "#FFF0F5",
                capital: "Rennes"
            }
        ]
    }
}