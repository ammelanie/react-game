/**
 * Created by melanie on 17/12/15.
 */

'use strict';

import EventEmitter from 'events';

import {GameConstants} from '../constants/GameConstants';

import GameDispatcher from '../dispatcher/GameDispatcher';

import Utils from '../utils/utils';

/**
 * Représente le store des villes
 */
class CityStore extends EventEmitter {

    /**
     * Construction du store avec l'ensemble des données de villes
     * @constructor
     */
    constructor(props) {
        super(props);
        this._cities =
        {
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
        for (let key in this._cities) {
            var city = this._cities[key];

            if ( city.canBeInfected ) {
                city['viruses'] = {};
                city['viruses'][GameConstants.VIRUS_A] = {};
                city['viruses'][GameConstants.VIRUS_B] = {};
                city['viruses'][GameConstants.VIRUS_A]['level'] = 0;
                city['viruses'][GameConstants.VIRUS_B]['level'] = 0;
            }
        }

        // Tableau [ [ "villeA", "virusA"] ... ] contenant l'ensemble des villes / virus déjà pris en compte
        this._alreadyInfectedCitiesByVirus = [];

        // Tableau contenant les 13 villes majeures avec chacune virus ainsi que 13 autres villes
        this._nonInfectedCitiesByVirus = [];

        for (let cityName in this._cities) {
            this._nonInfectedCitiesByVirus.push([cityName, GameConstants.VIRUS_A]);
            this._nonInfectedCitiesByVirus.push([cityName, GameConstants.VIRUS_B]);
        }

        // mélange du tableau
        Utils.shuffle(this._nonInfectedCitiesByVirus);

        // Ajout des évènements "épidémie" à la pile de cartes selon le nombre d'épidémies prévu dans la configuration
        var nbCardsPerArray = this._nonInfectedCitiesByVirus.length / GameConstants.EPIDEMIC_NUMBER;

        this._epidemicIndexes = [];

        // Découpage de la pile de cartes en X tas
        for (let i = 0 , j = this._nonInfectedCitiesByVirus.length ; i < j; i += nbCardsPerArray) {
            let tempCardArray = this._nonInfectedCitiesByVirus.slice(i , i + nbCardsPerArray);

            // Ajout de l'évènement d'épidémie et mélange
            tempCardArray.push(GameConstants.EPIDEMIC_TAG);
            Utils.shuffle(tempCardArray);

            // Détermination des positions des épidémies : tag épidémie + index de début du mini tableau
            this._epidemicIndexes.push(i + tempCardArray.indexOf(GameConstants.EPIDEMIC_TAG));
        }

        console.info("Pile de cartes - Villes non infectées : ");
        console.info(this._nonInfectedCitiesByVirus);
        console.info("Épidémie index : " + this._epidemicIndexes);

        // Niveau de propagation du virus
        this._propagationVirusLevel = GameConstants.DEFAULT_PROPAGATION_BASE_LEVEL;

        // Nombre d'épidémies ayant déjà eu lieu
        this._numberOfEpidemicGetted = 0;

        // Nombre de propagation ayant eu lieu
        this._numberOfPropagationsGetted = 0;
    }

    /**
     * Permet de récupérer l'ensemble des villes pouvant être infectées
     * @returns {Object}
     */
    getAllInfectable() {

        var cities = {};

        for (let cityName in this._cities) {
            var city = this._cities[cityName];

            if (city.canBeInfected) {
                cities[cityName] = city;
            }
        }

        return cities;
    }

    /**
     * Permet de récupérer une ville par son nom
     * @param cityName - nom de la ville à rechercher
     * @returns {Object} - Ville retournée ou null
     */
    findByName(cityName) {
        return this._cities[cityName];
    }

    /**
     * Gestion de la propagation du virus à chaque tour de joueur
     * La propagation peut être :
     *  - une propagation classique : infection d'une ville avec un cran de virus
     *  - une épidémie : récupération de la dernière carte de la pile : ajout de 3 virus, remise dans la pile de toutes les villes
     */
    propagateVirus() {

        console.info("Niveau de propagation : " + this._propagationVirusLevel);

        // Ajout de X virus en fonction du niveau de propagation actuel
        for (var i = 0; i < this._propagationVirusLevel; i++) {

            // Augmentation du nombre de propagation à chaque propagation
            this._numberOfPropagationsGetted++;
            console.info("Propagation n° : " + this._numberOfPropagationsGetted);

            // Afin de savoir s'il s'agit d'une épidémie  ou d'une simple propagation on vérifie que le nombre de
            // propagation déjà effectué correspond à un index d'épidémie.
            if (this._epidemicIndexes.indexOf(this._numberOfPropagationsGetted) === -1) {

                this.classicPropagation();

            } else {
                // Gestion de l'épidémie
                this.epidemicPropagation();
            }

            console.info(this._nonInfectedCitiesByVirus);
            console.info(this._alreadyInfectedCitiesByVirus);
        }
    }

    /**
     * Gestion d'une propagation classique
     *  - Récupération de la dernière ville de la pile des "Villes pouvant être infectées" : ajout d'un cran de virus
     */
    classicPropagation() {
        // récupération de la ville et virus à propager sous la forme ["villeA","virus1"]
        var newInfectedCityByVirus = this._nonInfectedCitiesByVirus.pop();

        this._alreadyInfectedCitiesByVirus.push(newInfectedCityByVirus);

        var cityName = newInfectedCityByVirus[0];
        var virusName = newInfectedCityByVirus[1];

        console.info("Propagation du virus " + virusName + " sur la ville " + cityName);

        // Mise à jour du niveau d'infection par le virus pour la ville si elle peut être infecté
        var city = this.findByName(cityName);

        if (city.canBeInfected) {
            var newLevelVirusForCity = ++city.viruses[virusName].level;
            console.info("Niveau de propagation pour la ville " + cityName + " : " + newLevelVirusForCity);
        }
    }

    /**
     * Gestion d'une épidémie
     *  - Gestion du niveau de la propagation
     *  - Récupération dans la pile des villes non tirées de la dernière ville infectable : ajout de 3 virus
     *  - Passage des villes de la pile "Villes déjà infectées" à la pile "Villes pouvant être infectées"
     */
    epidemicPropagation() {
        this._numberOfEpidemicGetted++;

        this.managePropagationLevel();

        console.info("Nouvelle épidémie - épidémie n°" + this._numberOfEpidemicGetted);

        var cityToInfectData;
        var cityToInfect;

        // Tirage de la dernière carte du paquet des villes non infectés et augmentation du niveau de 3 crans
        for (let i = 0; i < this._nonInfectedCitiesByVirus.length; i++) {
            cityToInfect = this.findByName(this._nonInfectedCitiesByVirus[i][0]);

            if (cityToInfect.canBeInfected) {
                cityToInfectData = this._nonInfectedCitiesByVirus.splice(i, 1)[0];
                break;
            }
        }

        this._alreadyInfectedCitiesByVirus.push(cityToInfectData);

        var cityName = cityToInfectData[0];
        var virusName = cityToInfectData[1];

        console.info("Épidémie du virus " + virusName + " sur la ville " + cityName);

        cityToInfect.viruses[virusName].level = cityToInfect.viruses[virusName].level + 3;
        console.info("Niveau de propagation pour la ville " + cityName + " : " + cityToInfect.viruses[virusName].level);

        this.resetNonInfectedCitiesList();
    }

    /**
     * Évènement après épidémie :
     * Remise dans la liste des villes non tirées des villes préalablement infectées, de façon aléatoire
     */
    resetNonInfectedCitiesList() {
        // Mélange du tableau des villes déjà infectées afin de les ajouter au tableau
        Utils.shuffle(this._alreadyInfectedCitiesByVirus);
        for (let city of this._alreadyInfectedCitiesByVirus) {
            this._nonInfectedCitiesByVirus.push(city);
        }

        // Remise à 0 des villes déjà infectées
        this._alreadyInfectedCitiesByVirus = [];
    }

    /**
     * Augmentation du nombre de propagation par tour de joueur selon le nombre d'épidémies déjà tirées
     * 2 et 4 => +1 propagation / tour
     */
    managePropagationLevel() {
        switch(this._numberOfEpidemicGetted) {
            case 2:
            case 4:
                this._propagationVirusLevel++;
                break;
            default:
                break;
        }
    }

    /**
     * Indique aux composants enregistrés qu'un changement a eu lieu au sein du store
     */
    emitChange() {
        this.emit(GameConstants.CITIES_CHANGE_EVENT);
    }

    /**
     * Enregistre un callback pour un composant qui sera déclenché lorsqu'un changement sera émi
     * @param callback  fonction à appeler lors de l'ajout du listener
     */
    addChangeListener(callback) {
        this.on(GameConstants.CITIES_CHANGE_EVENT, callback);
    }

    /**
     * Supprime le callback d'un composant pour ne plus recevoir les changements émis
     * @param callback  fonction à appeler lors de la suppression du listener
     */
    removeChangeListener(callback) {
        this.removeListener(GameConstants.CITIES_CHANGE_EVENT, callback);
    }
}

let _CityStore = new CityStore();
export default _CityStore;

/**
 * Enregistrement des actions à écouter en provenance du Dispatcher
 */
GameDispatcher.register((action) => {

    switch(action.type) {

        // Lancement d'une propagation de virus
        case GameConstants.VIRUS_PROPAGATION:
            _CityStore.propagateVirus();
            _CityStore.emitChange();
            break;

        default:
            break;
    }
});
