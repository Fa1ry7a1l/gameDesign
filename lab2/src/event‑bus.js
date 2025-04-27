export default class EventBus {
    constructor() {
        this._sub = Object.create(null);  // {event → Set<fn>}
    }

    on(event, fn) {
        (this._sub[event] ||= new Set).add(fn);
    }

    off(event, fn) {
        this._sub[event]?.delete(fn);
    }

    emit(event, payload) {
        this._sub[event]?.forEach(fn => fn(payload));
    }
}