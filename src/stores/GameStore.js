/**
 * Created by melanie on 06/01/16.
 */

'use strict';

import EventEmitter from 'events';

import Data from '../utils/data';
import Utils from '../utils/utils';

import GameDispatcher from '../dispatcher/GameDispatcher';

import {GameConstants} from '../constants/GameConstants';

/**
 * Représentation des éléments du jeu
 */
class GameStore extends EventEmitter {

    /**
     * Construction du store avec l'ensemble des données du jeu
     * @constructor
     */
    constructor(props) {
        super(props);

        this._players = Data.players();
        this._cities = Data.cities();
        this._paths = Data.paths();
        this._news = [];

        // Object permettant de gérer la découverte d'un virus
        this._antidotes = {};
        this._antidotes[GameConstants.VIRUS_A] = false;
        this._antidotes[GameConstants.VIRUS_B] = false;

        // Permet de savoir si les joueurs ont gagné ou perdu
        this._havePlayersWon = false;

        /*****************************************************************
         * Variables permettant la gestion des propagations et épidémies *
         *****************************************************************/

        // Niveau de propagation du virus
        this._propagationVirusLevel = GameConstants.DEFAULT_PROPAGATION_BASE_LEVEL;

        // Nombre d'épidémies ayant déjà eu lieu
        this._numberOfEpidemicGetted = 0;

        // Nombre de propagation ayant eu lieu
        this._numberOfPropagationsGetted = 0;

        // Nombre d'éclosion ayant eu lieu
        this._numberOfOutbreaksGetted = 0;

        // Tableau [ [ "villeA", "virusA"] ... ] contenant l'ensemble des villes / virus déjà prises en compte
        this._alreadyInfectedCitiesByVirus = [];

        // Tableau [ [ "villeA", "virusA"] ... ] contenant toutes les villes non infectées à un temps t
        this._nonInfectedCitiesByVirus = [];

        for (let cityName in this._cities) {
            this._nonInfectedCitiesByVirus.push([cityName, GameConstants.VIRUS_A]);
            this._nonInfectedCitiesByVirus.push([cityName, GameConstants.VIRUS_B]);
        }

        // mélange du tableau
        Utils.shuffle(this._nonInfectedCitiesByVirus);


        // Tableau contenant l'ensemble des index provoquant des épidémies
        this._epidemicIndexes = [];

        // Définition du nombre de paquet de cartes nécessaires pour avoir X (définit dans la configuration) épidémie
        // réparties de façon équitable
        var nbCardsPerArray = this._nonInfectedCitiesByVirus.length / GameConstants.EPIDEMIC_NUMBER;

        // Découpage de la pile de cartes en X tas
        for (let i = 0, j = this._nonInfectedCitiesByVirus.length; i < j; i += nbCardsPerArray) {
            // Le -1 permet de réaliser des tableaux équitables : 0 -> X / X + 1 -> Y / etc.
            let tempCardArray = this._nonInfectedCitiesByVirus.slice(i , i + nbCardsPerArray - 1);

            // Ajout de l'évènement d'épidémie et mélange
            tempCardArray.push(GameConstants.EPIDEMIC_TAG);
            Utils.shuffle(tempCardArray);

            // Détermination des positions des épidémies : tag épidémie + index de début du mini tableau
            this._epidemicIndexes.push(i + tempCardArray.indexOf(GameConstants.EPIDEMIC_TAG));
        }

        console.info("Pile de cartes - Villes non infectées : ");
        console.info(this._nonInfectedCitiesByVirus);
        console.info("Épidémie index : " + this._epidemicIndexes);
    }

    /**
     * Récupère l'ensemble des informations du jeu
     * @returns {Array}
     */
    getAllNews() {
        return this._news;
    }

    /**
     * Récupère le nombre d'éclosions
     * @returns {number}
     */
    getOutbreaks() {
        return this._numberOfOutbreaksGetted;
    }

    /**
     * Récupère le nombre d'épidémies déjà tombées
     * @returns {number}
     */
    getEpidemics() {
        return this._numberOfEpidemicGetted;
    }

    /**
     * Permet de savoir si les joueurs ont gagné
     * @returns {boolean}
     */
    getHavePlayersWon() {
        return this._havePlayersWon;
    }


    /*********************************************
     *   Méthodes liées uniquement aux joueurs   *
     *********************************************/

    /**
     * Récupère l'ensemble des joueurs
     * @returns {Array}
     */
    getAllPlayers() {
        return this._players;
    }

    /**
     * Retourne le joueur selectionné s'il existe
     * @returns {string/null}   retourne le joueur selectionné ou null
     */
    getSelectedPlayer() {
        for (var player of this._players) {
            if (player.selected) {
                return player;
            }
        }
        return null;
    }

    /**
     * Active l'état de selection du joueur passé en paramètre et désactive les autres
     * @param name  nom du joueur
     */
    activatePlayer(name) {
        for (let player of this._players) {
            player.selected = (player.name === name);
        }
    }

    /**
     * Déplacement du joueur selectionné sur une ville cliquée
     * @param currentPlayer  le joueur qui doit se déplacer
     * @param cityName  le nom de la ville où le joueur doit se rendre
     */
    movePlayerToCity(cityName, currentPlayer = this.getSelectedPlayer()) {
        if (currentPlayer === null)
            return;

        var currentPlayerName = "";

        // Récupération du nom du joueur à partir de l'objet joueur ou de son nom directement
        if (typeof currentPlayer === 'object')
            currentPlayerName = currentPlayer.name;
        else
            currentPlayerName = currentPlayer;

        console.info("Déplacement du joueur " + currentPlayerName + " vers la ville " + cityName);

        for (let player of this._players) {
            if (player.name === currentPlayerName) {
                player.cityName = cityName;
            }
        }
    }



    /*********************************************
     *    Méthodes liées uniquement aux villes   *
     *********************************************/

    /**
     * Permet de récupérer l'ensemble des villes pouvant être infectées
     * @returns {Object}
     */
    getAllInfectableCities() {
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
    findCityByName(cityName) {
        return this._cities[cityName];
    }



    /*********************************************
     *   Méthodes liées uniquement aux chemins   *
     *********************************************/

    /**
     * Permet de récupérer l'ensemble des chemins
     * @returns {Array}
     */
    getAllPaths() {
        return this._paths;
    }

    /**
     * Permet de désactiver l'ensemble des chemins et de n'activer que les chemins ayant un lien avec la ville cliquée
     * Le lien s'établie à l'aide de la constante NUMBER_OF_ALLOWED_ACTIONS et vaut 2. Ainsi, tous les chemins à
     * une distance de 2 de la ville seront activés
     * @param cityName nom de la ville dont il faut activer/désactiver les chemins
     */
    togglePathsForCity(cityName) {
        // Recherche des chemins à activer
        var pathsToActivate = this.searchPathsToActivate(cityName, this._paths);

        // Mise à jour du store local avec les nouveaux chemins
        this._paths = this.activatePaths(pathsToActivate);
    }

    /**
     * Permet de rechercher, parmi tous les chemins, les chemins à activer pour la ville donnée en paramètre
     * @param cityName      nom de la ville dont on cherche les chemins accessibles
     * @param paths         l'ensemble des chemins existants
     * @param cpt           compteur de récursivité
     * @returns {Array}     l'ensemble des chemisn à activer pour cette ville
     */
    searchPathsToActivate(cityName, paths, cpt = 0) {
        var pathsToActivate = [];

        cpt++;

        for ( let path of paths ) {

            // Si le chemin est concerné on devra l'activer
            if ( ( path.cityA === cityName || path.cityB === cityName ) && cpt <= GameConstants.NUMBER_OF_ALLOWED_ACTIONS) {

                pathsToActivate.push(path);

                // Determination de la ville qu'il faut par la suite analyser
                var cityToTest = ( path.cityA === cityName ) ? path.cityB : path.cityA;

                // Ajout des chemins trouvés pour la nouvelle ville
                pathsToActivate = pathsToActivate.concat(this.searchPathsToActivate(cityToTest, paths, cpt));
            }
        }

        return pathsToActivate;
    }

    /**
     * Permet d'activer les chemins passés en paramètre sur le carte. Tous les autres chemisn sont désactivés
     * @param pathsToActivate   tableau des chemins à activer
     * @returns {Array}         l'ensemble des chemins, de la carte, mis à jour
     */
    activatePaths(pathsToActivate) {
        var allPaths = this._paths;

        // Passage de l'ensemble des chemins à l'état désactiver
        for ( let path of allPaths ) {
            path.active = false;
        }

        // Activation des chemins à activer
        for ( let path of allPaths ) {

            for ( let activatePath of pathsToActivate ) {

                // Un chemin est à activer si sa ville de départ/arrivé correspond aux villes de départ/arrivé d'une
                // ville désignée comme devant être activée
                if ( ( activatePath.cityA === path.cityA || activatePath.cityA === path.cityB ) &&
                    ( activatePath.cityB === path.cityB || activatePath.cityB === path.cityA ) )  {
                    path.active = true;
                    break;
                }

            }
        }

        return allPaths;
    }

    /**
     * Récupère l'ensemble des villes liées à une ville en particulier
     * @param cityName  le nom de la ville dont on cherche les villes liées
     * @returns {Array} l'ensemble des noms de villes liées
     */
    getLinkedCities(cityName) {
        var cities = [];

        for (var path of this._paths) {
            if (path.cityA === cityName && cities.indexOf(cityName) === -1) {
                cities.push(path.cityB);
            } else if (path.cityB === cityName && cities.indexOf(cityName) === -1) {
                cities.push(path.cityA);
            }
        }

        return cities;
    }



    /*********************************************
     *   Méthodes liées à la propagation virus   *
     *********************************************/

    /**
     * Fonction d'initialisation du jeu
     * 3x3 cartes sont tirées du paquets de cartes des villes non contaminées
     * 3 premières : 3 cubes
     * 3 suivantes : 2 cubes
     * 3 dernières : 1 cube
     */
    initGame() {
        this._news.push("Initialisation du jeu avec une infection des villes de niveau 3");
        for (let i = 1, levelVirus = 3; i <= 9; i++) {

            this.classicPropagation(levelVirus);

            if ( i % 3 === 0 ) {
                levelVirus--;
                if ( levelVirus != 0 )
                    this._news.push("Initialisation du jeu avec une infection des villes de niveau " + levelVirus);
            }
        }
    }

    /**
     * Gestion de la propagation du virus à chaque tour de joueur
     * La propagation peut être :
     *  - une propagation classique : infection d'une ville avec un cran de virus
     *  - une épidémie : récupération de la dernière carte de la pile : ajout de 3 virus, remise dans la pile de toutes les villes
     */
    propagateVirus(cityName) {
        if (this.getSelectedPlayer() === null || cityName === this.getSelectedPlayer().cityName)
            return;

        console.info("Niveau de propagation : " + this._propagationVirusLevel);

        // Ajout de X virus en fonction du niveau de propagation actuel
        for (var i = 0; i < this._propagationVirusLevel; i++) {

            console.info("Propagation n° : " + ( this._numberOfPropagationsGetted + 1 ));

            // Afin de savoir s'il s'agit d'une épidémie  ou d'une simple propagation on vérifie que le nombre de
            // propagation déjà effectué correspond à un index d'épidémie.
            if (this._epidemicIndexes.indexOf(this._numberOfPropagationsGetted) === -1) {
                this.classicPropagation();

            } else {
                // Gestion de l'épidémie
                this.epidemicPropagation();
            }

            // Augmentation du nombre de propagation à chaque propagation
            this._numberOfPropagationsGetted++;

            console.info(this._nonInfectedCitiesByVirus);
            console.info(this._alreadyInfectedCitiesByVirus);
        }
    }

    /**
     * Gestion d'une propagation classique
     *  - Récupération de la dernière ville de la pile des "Villes pouvant être infectées" : ajout d'un cran de virus
     *  @param increaseVirusLevelBy     default GameConstants.PROPAGATION_INSCREASE - nombre de cubes virus à propager
     */
    classicPropagation(increaseVirusLevelBy = GameConstants.PROPAGATION_INCREASE) {
        if (this._nonInfectedCitiesByVirus.length > 0) {
            // récupération de la ville et virus à propager sous la forme ["villeA","virus1"]
            var newInfectedCityByVirus = this._nonInfectedCitiesByVirus.pop();

            this._alreadyInfectedCitiesByVirus.push(newInfectedCityByVirus);

            var cityName = newInfectedCityByVirus[0];
            var virusName = newInfectedCityByVirus[1];

            console.info("Propagation du virus " + virusName + " sur la ville " + cityName);
            this._news.push("Propagation du virus " + virusName + " sur la ville " + cityName);

            // Mise à jour du niveau d'infection par le virus pour la ville si elle peut être infecté
            var city = this.findCityByName(cityName);

            if (city.canBeInfected) {
                this.increaseVirusLevelForCity(city, cityName, virusName, increaseVirusLevelBy);
            }
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
        this._news.push("Nouvelle épidémie !");

        this.audioEpidemic = new Audio(GameConstants.AUDIO_PATH + 'epidemic.mp3');
        this.audioEpidemic.play();

        var cityToInfectData;
        var cityToInfect;

        // Tirage de la dernière carte du paquet des villes non infectés et augmentation du niveau de 3 crans
        for (let i = 0; i < this._nonInfectedCitiesByVirus.length; i++) {
            cityToInfect = this.findCityByName(this._nonInfectedCitiesByVirus[i][0]);

            if (cityToInfect.canBeInfected) {
                cityToInfectData = this._nonInfectedCitiesByVirus.splice(i, 1)[0];
                break;
            }
        }

        this._alreadyInfectedCitiesByVirus.push(cityToInfectData);

        var cityName = cityToInfectData[0];
        var virusName = cityToInfectData[1];

        console.info("Épidémie du virus " + virusName + " sur la ville " + cityName);
        this._news.push("Épidémie du virus " + virusName + " sur la ville " + cityName);

        this.increaseVirusLevelForCity(cityToInfect, cityName, virusName, GameConstants.EPIDEMIC_INCREASE);

        this.resetNonInfectedCitiesList();
    }

    /**
     * Vérification du potentiel d'éclosion sur une ville donnée
     * @param city  la ville à analyser
     * @param virusName le nom du virus à propager
     * @param numVirusToAdd le nombre de virus à propager
     * @returns {boolean} vrai si une éclosion va avoir lieu
     */
    isPropagationOutbreaking(city, virusName, numVirusToAdd) {
        // vérification de la condition d'éclosion
        return ( city.viruses[virusName].level + numVirusToAdd ) > GameConstants.MAX_LEVEL_VIRUS_PER_CITY
    }

    /**
     * Propagation d'une éclosion vers les villes voisines
     * @param currentCityName la ville subissant l'éclosion
     * @param virusName le nom du virus incriminé
     * @param alreadyInfectedCities tableau des villes déjà infectées par cette éclosion (réaction en chaine)
     */
    propagateVirusToLinkedCities(currentCityName, virusName, alreadyOutbreakedCities) {
        // Réccupération de l'ensemble des villes liées à la ville en éclosion
        var citiesToInfect = this.getLinkedCities(currentCityName);

        for (let cityNameToInfect of citiesToInfect) {

            // Vérification d'une condition indispensable dans le cas d'une réaction en chaine :
            // Lors de la même réaction en chaine, une ville ne peut pas être en éclosion deux fois.
            if (alreadyOutbreakedCities.indexOf(cityNameToInfect) !== -1) {
                console.info("La ville " + cityNameToInfect + " a déjà été traitée !");
                continue;
            }

            var city = this.findCityByName(cityNameToInfect);

            // Vérification du niveau de l'éclosion pour la ville en cours d'infection
            if (this.isPropagationOutbreaking(city, virusName, GameConstants.PROPAGATION_INCREASE)) {

                this._numberOfOutbreaksGetted++;
                console.info("Éclosion n° " + this._numberOfOutbreaksGetted + " en cours dans la ville de " + cityNameToInfect + " pour le virus " + virusName + " !");
                this._news.push("Éclosion n° " + this._numberOfOutbreaksGetted + " en cours dans la ville de " + cityNameToInfect + " pour le virus " + virusName + " !");

                alreadyOutbreakedCities.push(cityNameToInfect);

                // Récursivité en conservant la ville initiale, et en passant à ville précedente la ville qui vient de subit une éclosion
                this.propagateVirusToLinkedCities(cityNameToInfect, virusName, alreadyOutbreakedCities);
            } else {
                var newVirusLevelForCity = ++city.viruses[virusName].level;
                console.info("Infection de la ville " + cityNameToInfect + " passage du niveau de virus à " + newVirusLevelForCity);
                this._news.push("Infection de la ville " + cityNameToInfect + " passage du niveau de virus à " + newVirusLevelForCity);
            }
        }
    }

    /**
     * Permet d'augmenter le nombre de virus pour une ville donnée en fonction du contexte : éclosion ou simple propagation
     * @param city  la ville subissant l'invasion de virus
     * @param cityName  le nom de la ville
     * @param virusName le nom du virus
     * @param numVirusToAdd le nombre de virus à ajouter à la ville
     */
    increaseVirusLevelForCity(city, cityName, virusName, numVirusToAdd) {
        // Vérification de l'éclosion de la propagation
        if (this.isPropagationOutbreaking(city, virusName, numVirusToAdd)) {
            // Ajout d'une éclosion à l'ensemble du jeu
            this._numberOfOutbreaksGetted++;
            console.info("Éclosion n° " + this._numberOfOutbreaksGetted + " en cours dans la ville de " + cityName + " pour le virus " + virusName + " !");
            this._news.push("Éclosion n° " + this._numberOfOutbreaksGetted + " en cours dans la ville de " + cityName + " pour le virus " + virusName + " !");

            var alreadyOutbreakedCities = [cityName];

            // La limite a été dépassée : éclosion : on est donc au maximum de virus
            city.viruses[virusName].level = GameConstants.MAX_LEVEL_VIRUS_PER_CITY;
            this.propagateVirusToLinkedCities(cityName, virusName, alreadyOutbreakedCities);

        } else {
            city.viruses[virusName].level = city.viruses[virusName].level + numVirusToAdd;
            console.info("Niveau de propagation pour la ville " + cityName + " : " + city.viruses[virusName].level);
        }
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



    /*******************************************
     *   Méthodes liées aux boutons d'actions  *
     *******************************************/

    /**
     * Permet de savoir si une ville peut être soignée d'un virus : elle doit donc avoir au moins un virus du type voulu
     * @param virusName le nom du virus à soigner
     * @returns {boolean}
     */
    canCleanVirus(virusName) {
        var currentPlayer = this.getSelectedPlayer();
        if (currentPlayer === null)
            return false;

        var currentCity = this.findCityByName(currentPlayer.cityName);

        return currentCity.viruses[virusName].level > 0;
    }

    /**
     * Permet de soigner d'un cube virus la ville courante
     * @param virusName nom du virus à soigner
     */
    cleanVirus(virusName) {
       var currentPlayer = this.getSelectedPlayer();

        var currentCity = this.findCityByName(currentPlayer.cityName);

        console.info("Soin du virus " + virusName + " sur la ville de " + currentPlayer.cityName);
        this._news.push("Soin du virus " + virusName + " sur la ville de " + currentPlayer.cityName);
        currentCity.viruses[virusName].level--;
    }

    /**
     * Permet de signaler la découverte d'un antidote pour un virus donné
     * @param virusName nom du virus concerné
     */
    discoverAntidoteForVirus(virusName) {
        this._antidotes[virusName] = true;
        console.info("Découverte de l'antidote pour le virus " + virusName);
        this._news.push("Découverte de l'antidote pour le virus " + virusName);
    }

    /**
     * Permet de savoir si l'antidote a été découvert pour un virus donné
     * @param virusName nom du virus
     * @returns {Boolean}
     */
    hasAntidoteBeenDiscovered(virusName) {
        return this._antidotes[virusName];
    }

    /**
     * Permet de savoir si les antidotes peuvent être découvert
     * Condition : être sur la ville de départ du jeu
     * @returns {boolean}
     */
    canAntidotesBeDiscovered() {
        return this.getSelectedPlayer().cityName === GameConstants.START_CITY;
    }


    /********************************************
     *          Gestion des évènements          *
     ********************************************/

    /**
     * Indique aux composants enregistrés qu'un changement a eu lieu au sein du store
     * @param eventTag  nom de l'evenement concerné
     */
    emitChange(eventTag) {
        this.emit(eventTag);
    }

    /**
     * Enregistre un callback pour un composant qui sera déclenché lorsqu'un changement sera émi
     * @param callback  fonction à appeler lors de l'ajout du listener
     * @param eventTag  nom de l'evenement concerné
     */
    addChangeListener(eventTag, callback) {
        this.on(eventTag, callback);
    }

    /**
     * Supprime le callback d'un composant pour ne plus recevoir les changements émis
     * @param callback  fonction à appeler lors de la suppression du listener
     * @param eventTag  nom de l'evenement concerné
     */
    removeChangeListener(eventTag, callback) {
        this.off(eventTag, callback);
    }



    /********************************************
     *        Gestion des conditions fin        *
     ********************************************/

    /**
     * Détermine si les joueurs ont gagné
     * Condition de victoire : trouver les antidotes pour les virus du jeu
     * @returns {boolean}
     */
    havePlayersWon() {
        if (this._antidotes[GameConstants.VIRUS_A] && this._antidotes[GameConstants.VIRUS_B]) {
            this._news.push("VICTOIRE ! Vous êtes venus à bout des virus ! La France est sauvée !");
            this._havePlayersWon = true;
        }

        return this._havePlayersWon;
    }

    /**
     * Détemrine si les joueurs ont perdu
     * Condition de perte : plus de carte dans la pile OU nombre d'éclosions trop important
     * @returns {boolean}
     */
    havePlayersLost() {
        if (this._nonInfectedCitiesByVirus.length === 0 || this._numberOfOutbreaksGetted >= GameConstants.MAX_ECLOSIONS) {
            this._news.push("DEFAITE ! Les virus ont vaincu...");
            return true;
        }

        return false;
    }

    /**
     * Permet de savoir si le jeu est fini
     * @returns {boolean}
     */
    isGameEnded() {
        return this.havePlayersLost() || this.havePlayersWon();
    }

}

let _GameStore = new GameStore();
export default _GameStore;

/**
 * Enregistrement des actions à écouter en provenance du Dispatcher
 */
GameDispatcher.register((action) => {

    switch(action.type) {

        /***************************************
         * Evenements en lien avec les joueurs *
         ***************************************/

        // Lorsque les joueurs doivent subir un changement d'état de selection
        case GameConstants.ACTIVATE_PLAYER:
            _GameStore.activatePlayer(action.playerName);
            _GameStore.emitChange(GameConstants.PLAYERS_CHANGE_EVENT);
            break;

        // Lorsque un joueur doit être déplacé
        case GameConstants.MOVE_PLAYER:
            _GameStore.movePlayerToCity(action.cityName, action.playerName);
            _GameStore.emitChange(GameConstants.PLAYERS_CHANGE_EVENT);
            break;


        /***************************************
         * Evenements en lien avec les villes  *
         ***************************************/

        // Lancement d'une propagation de virus
        case GameConstants.VIRUS_PROPAGATION:
            _GameStore.propagateVirus(action.cityName);
            _GameStore.emitChange(GameConstants.CITIES_CHANGE_EVENT);
            if (_GameStore.isGameEnded())
                _GameStore.emitChange(GameConstants.GAME_CHANGE_EVENT);
            break;

        // Soin d'un virus sur la ville courante
        case GameConstants.VIRUS_CLEANING:
            _GameStore.cleanVirus(action.virusName);
            _GameStore.emitChange(GameConstants.CITIES_CHANGE_EVENT);
            break;

        // Initialisation du jeu avec propagation du virus sur 9 villes
        case GameConstants.INIT_GAME:
            _GameStore.initGame();
            _GameStore.emitChange(GameConstants.CITIES_CHANGE_EVENT);
            break;


        /***************************************
         * Evenements en lien avec les chemins  *
         ***************************************/

        // Lorsque les chemins doivent subir un changement d'état d'activation
        case GameConstants.TOGGLE_PATHS:
            _GameStore.togglePathsForCity(action.cityName);
            _GameStore.emitChange(GameConstants.PATHS_CHANGE_EVENT);
            break;


        /***************************************
         *   Evenements en lien avec antidote  *
         ***************************************/

        // Découverte d'un antidote pour un virus en pariculier
        case GameConstants.DISCOVER_ANTIDOTE:
            _GameStore.discoverAntidoteForVirus(action.virusName);
            _GameStore.emitChange(GameConstants.DISCOVER_ANTIDOTE_EVENT);
            if (_GameStore.isGameEnded())
                _GameStore.emitChange(GameConstants.GAME_CHANGE_EVENT);
            break;

        default:
            break;
    }
});
