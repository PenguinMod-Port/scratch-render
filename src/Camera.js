class Camera {
    static default() {
        return {
            pos: [0, 0],
            size: [100, 100],
            rotation: 90
        }
    }

    constructor(renderer) {
        this._renderer = renderer;

        this.defaultName = Symbol("default");
        this.unbindedName = Symbol("unbinded");

        this.states = {
            [this.defaultName]: Camera.default(),
            [this.unbindedName]: Camera.default()
        }
    }

    _updateCamera(name) {
        let drawableFound = false;
        this._renderer._allDrawables.forEach(drawable => {
            if (drawable.cameraState === name) {
                drawable._transformDirty = true;
                drawable._rotationTransformDirty = true;
                drawableFound = true;
            }
        });
        if (!drawableFound) return;
        this._renderer.dirty = true;
    }

    getState(name = this.defaultName, safe = false) {
        return this.states[name] || (safe && this.states[this.unbindedName]);
    }

    createState(name, state = {}) {
        if (typeof name === "symbol") return;
        return (this.states[name] = Object.assign(Camera.default(), state));
    }

    removeState(name) {
        if (typeof name === "symbol") return;
        delete this.states[name];
    }

    getPosition(name = this.defaultName) {
        let state = this.getState(name, true);
        return state.pos;
    }

    setPosition(x, y, name = this.defaultName) {
        let state = this.getState(name);
        if (!state) return;
        state.pos = [x, y];
        this._updateCamera(name);
    }

    getSize(name = this.defaultName) {
        let state = this.getState(name, true);
        return state.size;
    }

    setSize(width, height, name = this.defaultName) {
        let state = this.getState(name);
        if (!state) return;
        state.size = [width, height];
        this._updateCamera(name);
    }

    getRotation(name = this.defaultName) {
        let state = this.getState(name, true);
        return state.rotation;
    }

    setRotation(rotation, name = this.defaultName) {
        let state = this.getState(name);
        if (!state) return;
        state.rotation = rotation;
        this._updateCamera(name);
    }
}

module.exports = Camera;