export const print = function () {
    Array.from(arguments).forEach(item => {
        if (Object.prototype.toString.call(item).slice(8, -1) === 'Object') {
            const e = [
                `%c ${item.title} %c ${item.content} `,
                `padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060;`,
                `padding: 1px; border-radius: 0 3px 3px 0; color: #fff; background: ${item.backgroundColor ? item.backgroundColor : '#1475b2'};`
            ]
            const fun = function () {
                //@ts-ignore
                return window.console && typeof window.console.log === 'function' && (item = console).log.apply(e, arguments)
            }
            fun.apply(null, e)
        }
    })
}
//@ts-ignore
export const printANSI = () => {
    //@ts-ignore
    print({
        title: "Environment",
        content: import.meta.env.MODE,
        backgroundColor: "#42c02e"
    }, {
        title: "Build Date",
        content: __BUILD_TIME__
    })
}
