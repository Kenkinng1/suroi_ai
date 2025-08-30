// Actions decoder/encoder. Provides a stable interface between the RL agent and the
// game server. The action vector is kept deliberately small so tests can assert
// round-trip behaviour easily.

export const ACTION_LENGTH = 9; // moveX, moveY, aim, fire, reload, interact, weapon, heal, sprint

export interface ActionStruct {
    moveX: number;
    moveY: number;
    aim: number;
    fire: number;
    reload: number;
    interact: number;
    weapon: number;
    heal: number;
    sprint: number;
}

function clamp(v: number, min: number, max: number): number {
    return Math.min(Math.max(v, min), max);
}

export function encodeAction(a: ActionStruct): Float32Array {
    const arr = new Float32Array(ACTION_LENGTH);
    arr[0] = clamp(a.moveX, -1, 1);
    arr[1] = clamp(a.moveY, -1, 1);
    arr[2] = clamp(a.aim, 0, 1);
    arr[3] = a.fire ? 1 : 0;
    arr[4] = a.reload ? 1 : 0;
    arr[5] = a.interact ? 1 : 0;
    arr[6] = clamp(a.weapon, 0, 1);
    arr[7] = a.heal ? 1 : 0;
    arr[8] = a.sprint ? 1 : 0;
    return arr;
}

export function decodeAction(buf: ArrayLike<number>): ActionStruct {
    return {
        moveX: clamp(buf[0] ?? 0, -1, 1),
        moveY: clamp(buf[1] ?? 0, -1, 1),
        aim: clamp(buf[2] ?? 0, 0, 1),
        fire: buf[3] ? 1 : 0,
        reload: buf[4] ? 1 : 0,
        interact: buf[5] ? 1 : 0,
        weapon: clamp(buf[6] ?? 0, 0, 1),
        heal: buf[7] ? 1 : 0,
        sprint: buf[8] ? 1 : 0
    };
}

