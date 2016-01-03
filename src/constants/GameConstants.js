/**
 * Created by melanie on 23/12/15.
 */

export const GameConstants = {
    NUMBER_OF_ALLOWED_ACTIONS: 2,
    WEBSOCKET_SERVER_URL: '192.168.0.29:9090',
    VIRUS_A: "virus 1",
    VIRUS_B: "virus 2",
    DEFAULT_PROPAGATION_BASE_LEVEL: 2,
    EPIDEMIC_NUMBER: 4,
    EPIDEMIC_TAG: "EPIDEMIC",

    // Actions
    TOGGLE_PATHS: "toggle_paths",
    ACTIVATE_PLAYER: "activate_player",
    MOVE_PLAYER: "move_player",
    VIRUS_PROPAGATION: "virus_propagation",

    // Events
    PATHS_CHANGE_EVENT: "paths_change_event",
    PLAYERS_CHANGE_EVENT: "players_change_event",
    CITIES_CHANGE_EVENT: "cities_change_event"
};