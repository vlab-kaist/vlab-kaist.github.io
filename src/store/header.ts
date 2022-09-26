import {writable} from "svelte/store";

const fullImageEnabled: boolean[] = [];

const _transparentHeader = writable(false);
export const transparentHeader = {
    ..._transparentHeader,
    set: (id: number, value: boolean) => {
        fullImageEnabled[id] = value;
        _transparentHeader.set(fullImageEnabled.includes(true));
    }
}
