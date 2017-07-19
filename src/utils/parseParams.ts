export default function parseParam(value: parseParamValue, { applet, ingredients, config, context }: CONTEXT): any {
    if (typeof value == "function") {
        return value({ applet, ingredients, config, context })
    }

    return value
}

type parseParamValue = (context: CONTEXT) => ANY_OBJECT | ANY_OBJECT

type parseParam = (value: parseParamValue, { applet, ingredients, config, context }: CONTEXT) => any