import type { App, Component } from 'vue';
export * from './util'
export * from './regular'
export * from './formatTime'


// https://github.com/vant-ui/vant/issues/8302
type EventShim = {
    new(...args: any[]): {
        $props: {
            onClick?: (...args: any[]) => void;
        };
    };
};

export type WithInstall<T> = T & {
    install(app: App): void;
} & EventShim;
export type CustomComponent = Component & { displayName?: string };
export const withInstall = <T extends CustomComponent>(component: T, alias?: string) => {
    (component as Record<string, unknown>).install = (app: App) => {
        const compName = component.name || component.displayName;
        if (!compName) return;
        app.component(compName, component);
        if (alias) {
            app.config.globalProperties[alias] = component;
        }
    };
    return component as WithInstall<T>;
};

export function openWindow(
    url: string,
    opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean },
) {
    const { target = '__blank', noopener = true, noreferrer = true } = opt || {};
    const feature: string[] = [];

    noopener && feature.push('noopener=yes');
    noreferrer && feature.push('noreferrer=yes');

    window.open(url, target, feature.join(','));
}