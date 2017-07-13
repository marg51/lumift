const { every } = require("lodash")

// is data matching this applet filters?
export default (applet: APPLET, data: any) => {
    const { _filters, filters } = applet.config.webhook

    const all_filters = [].concat(_filters).concat(filters)

    const is_valid = every(all_filters, (fn: any) => !fn || fn(data))

    return is_valid
}
