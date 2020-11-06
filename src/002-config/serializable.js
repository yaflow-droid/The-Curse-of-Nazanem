/**
 * Base class for any other class
 * 
 * @class
 * @name App.Entity.Serializable
 */
App.Entity.Serializable = class {
	/**
	 * Returns the name of the class including namespaces
	 * @returns {string}
	 */
	get className() { return "App.Entity.Serializable"; }

	/**
	 * Updates saved data in case of changes to the class.
	 * NOTE: new attributes do NOT need to be added here, as they are automatically added with default values.
	 *
	 * @param {object} config
	 * @protected
	 */
	static _cleanupConfigScheme(config) {}

	/**
	 * @returns {App.Entity.Serializable}
	 */
	clone() {
		return (new App.Entity.Serializable())._init(this);
	}

	/**
	 * @param {object} config
	 * @param {boolean} clean
	 * @returns {App.Entity.Serializable}
	 * @protected
	 */
	_init(config, clean = false) {
		if (clean) {
			this.constructor._cleanupConfigScheme(config);
		}

		// Clone the given object's own properties into our own properties.
		deepAssign(this, config);

		// Return `this` to make usage easier.
		return this;
	}

	/**
	 * @returns {string} revive wrapper
	 */
	toJSON() {
		const ownData = {};
		deepAssign(ownData, this);
		return JSON.reviveWrapper(`(new ${this.className}())._init($ReviveData$, true)`, ownData);
	}

	/**
	 * @returns {object}
	 */
	getData() {
		var ownData = {};
		deepAssign(ownData, this);
		return ownData;
	}
};
