/**
 * Created by melanie on 23/12/15.
 */

'use strict';

export const GameConstants = {
    NUMBER_OF_ALLOWED_ACTIONS: 2,
    WEBSOCKET_SERVER_URL: '192.168.0.29:9090',
    NB_VIRUS: 2,
    NB_ACTIONS: 2,
    NB_CARD_FOR_ANTIDOTES: 4,
    NB_CARD_PER_PLAYER: 6,
    VIRUS_A: "Tegra",
    VIRUS_B: "Xenon",
    VIRUS_A_COLOR: "orange",
    VIRUS_B_COLOR: "yellow",
    DEFAULT_PROPAGATION_BASE_LEVEL: 2,
    EPIDEMIC_NUMBER: 4,
    EPIDEMIC_TAG: "EPIDEMIC",
    MAX_LEVEL_VIRUS_PER_CITY: 3,
    PROPAGATION_INCREASE: 1,
    EPIDEMIC_INCREASE: 3,
    MAX_ECLOSIONS: 5,
    START_CITY: "Toulouse",

    // Actions
    TOGGLE_PATHS: "toggle_paths",
    ACTIVATE_PLAYER: "activate_player",
    MOVE_PLAYER: "move_player",
    VIRUS_PROPAGATION: "virus_propagation",
    VIRUS_CLEANING: "virus_cleaning",
    INIT_GAME: "init_game",
    DISCOVER_ANTIDOTE: "discover_antidote",

    // Events
    PATHS_CHANGE_EVENT: "paths_change_event",
    PLAYERS_CHANGE_EVENT: "players_change_event",
    CITIES_CHANGE_EVENT: "cities_change_event",
    DISCOVER_ANTIDOTE_EVENT: "discover_antidote_event",
    GAME_CHANGE_EVENT: "game_change_event",

    // Style
    HEIGHT_MAP: "700px",
    WIDTH_MAP: "600px",
    ACTION_BAR_PADDING: "25px",
    ACTION_BAR_WIDTH: "250px",
    INFO_WIDTH: "450px",
    MARGIN_LEFT_MAP: "260px"
};