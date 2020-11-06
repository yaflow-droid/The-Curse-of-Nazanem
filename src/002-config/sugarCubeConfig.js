/* eslint-disable no-undef */
"use strict";
/* Main SugarCube configuration file. */

/* Set description used by Save, for all passages, to give some decent information about game state. */
Config.passages.descriptions = function () {
	let sv = State.variables;
	return "The Curse of Nazanem V" + Config.saves.version
};

/* Disable forward/back buttons in panel. */
Config.history.controls = true;

/* Set Autosaves. */
Config.saves.autosave = true;

/* Save only one game state. */
Config.history.maxStates = 100;

/* Set to 'true' to enable SugarCube's debug mode.
Note: This is an 'engine level' debug mode, completely separate from the game's debug mode. */
//Config.debug = false;

/* Set maximum loop iterations. Among other things, this controls the maximum number of slaves the player can own. */
Config.macros.maxLoopIterations = 5000;

Config.saves.autoload = "prompt";
