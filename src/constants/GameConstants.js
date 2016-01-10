/**
 * Created by melanie on 23/12/15.
 */

'use strict';

export const GameConstants = {
    NUMBER_OF_ALLOWED_ACTIONS: 2,
    WEBSOCKET_SERVER_URL: '192.168.0.29:9090',
    NB_VIRUS: 2,
    VIRUS_A: "virus 1",
    VIRUS_B: "virus 2",
    VIRUS_A_COLOR: "#FFEB3B",
    VIRUS_B_COLOR: "#4CAF50",
    DEFAULT_PROPAGATION_BASE_LEVEL: 2,
    EPIDEMIC_NUMBER: 4,
    EPIDEMIC_TAG: "EPIDEMIC",
    MAX_LEVEL_VIRUS_PER_CITY: 3,
    PROPAGATION_INCREASE: 1,
    EPIDEMIC_INCREASE: 3,

    // Actions
    TOGGLE_PATHS: "toggle_paths",
    ACTIVATE_PLAYER: "activate_player",
    MOVE_PLAYER: "move_player",
    VIRUS_PROPAGATION: "virus_propagation",
    VIRUS_CLEANING: "virus_cleaning",

    // Events
    PATHS_CHANGE_EVENT: "paths_change_event",
    PLAYERS_CHANGE_EVENT: "players_change_event",
    CITIES_CHANGE_EVENT: "cities_change_event",

    // Style
    HEIGHT_MAP: "700px",
    ACTION_BAR_PADDING: "50px",
    ACTION_BAR_WIDTH: "150px",
    MARGIN_LEFT_MAP: (100 + 150) + "px" // 100 +  ACTION_BAR_WIDTH
};