type ACTION<T> = {
    id: string
    service: SERVICE
    name: string
    exec: ({ applet, payload }: { applet: APPLET<any>, payload: T }) => void
}

type PAYLOAD_CALLBACK = <T, P>({ applet, ingredients, scheduler, action }: CONTEXT<T, P>) => P
type CONFIG_CALLBACK<T, P> = ({ applet, ingredients, scheduler, action }: CONTEXT<T, P>) => P

type CONTEXT<T, P> = { applet: APPLET<T>, ingredients: T, scheduler?: any, action: ACTION<P> }

type IOS_PUSH_PAYLOAD = {
    token: string
    message: string
}