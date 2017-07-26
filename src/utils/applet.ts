let id = 0
export default class Applet<T> {
    private building_applet: Partial<APPLET<T>> = {
        config: {},
        actions: []
    }
    constructor(name: string, object: Partial<APPLET<T>>) {
        this.building_applet.id = "abc" + id++
        this.building_applet.name = name
        this.merge(object)
    }
    addTrigger(trigger: TRIGGER<T>, config: MATCH_PARTIAL<T>) {
        this.building_applet.trigger = trigger
        this.building_applet.service = trigger.service
        this.building_applet.config[trigger.id] = config

        return this
    }
    addAction<P>(action: ACTION<P>, config: CONFIG_CALLBACK<T, P>) {
        this.building_applet.actions.push(action)
        this.building_applet.config[action.id] = config
    }
    merge(object: Partial<APPLET<T>>) {
        this.building_applet = { ...this.building_applet, ...object }

        return this
    }
    getApplet(): any {
        return this.building_applet
    }
}