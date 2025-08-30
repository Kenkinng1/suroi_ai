// Minimal observation encoder for Agent Mode.
// This is a lightweight, self-contained module and does not depend on the main game
// so it can be unit tested in isolation. The encoder outputs a fixed length
// Float32Array in the range [0, 1].

export const ENEMY_COUNT = 8;
export const LOOT_COUNT = 10;

const SELF_SIZE = 11;
const ZONE_SIZE = 5;
const ENEMY_SIZE = 8;
const LOOT_SIZE = 3; // dx, dy, type id normalised
const MAP_CONTEXT_SIZE = 13;
const TIMER_SIZE = 2;

export const OBSERVATION_LENGTH =
    SELF_SIZE +
    ZONE_SIZE +
    ENEMY_COUNT * ENEMY_SIZE +
    LOOT_COUNT * LOOT_SIZE +
    MAP_CONTEXT_SIZE +
    TIMER_SIZE;

export interface PlayerState {
    x: number;
    y: number;
    vx: number;
    vy: number;
    health: number;
    armor: number;
    ammo: number;
    activeWeapon: number;
    isReloading: boolean;
    isInCover: boolean;
    timeSinceLastShot: number;
}

export interface ZoneState {
    x: number;
    y: number;
    radius: number;
    distance: number;
    inside: boolean;
}

export interface EnemyState {
    dx: number;
    dy: number;
    dvx: number;
    dvy: number;
    health: number;
    hasLineOfSight: boolean;
    heading: number;
    timeSinceSeen: number;
}

export interface LootState {
    dx: number;
    dy: number;
    type: number; // one-hot represented as id [0,1]
}

export interface ObservationInput {
    mapSize: number;
    self: PlayerState;
    zone: ZoneState;
    enemies: EnemyState[];
    loot: LootState[];
    mapContext: number[]; // length 13
    timers: number[]; // length 2
}

// helper clamp
function clamp01(v: number): number {
    if (v < 0) return 0;
    if (v > 1) return 1;
    return v;
}

export function encodeObservation(state: ObservationInput): Float32Array {
    const arr = new Float32Array(OBSERVATION_LENGTH);
    let i = 0;

    const s = state.self;
    const m = state.mapSize || 1;
    arr[i++] = clamp01(s.x / m);
    arr[i++] = clamp01(s.y / m);
    arr[i++] = clamp01((s.vx + 10) / 20);
    arr[i++] = clamp01((s.vy + 10) / 20);
    arr[i++] = clamp01(s.health / 100);
    arr[i++] = clamp01(s.armor / 100);
    arr[i++] = clamp01(s.ammo / 100);
    arr[i++] = clamp01(s.activeWeapon / 10);
    arr[i++] = s.isReloading ? 1 : 0;
    arr[i++] = s.isInCover ? 1 : 0;
    arr[i++] = clamp01(s.timeSinceLastShot / 10);

    const z = state.zone;
    arr[i++] = clamp01(z.x / m);
    arr[i++] = clamp01(z.y / m);
    arr[i++] = clamp01(z.radius / m);
    arr[i++] = clamp01(z.distance / m);
    arr[i++] = z.inside ? 1 : 0;

    for (let e = 0; e < ENEMY_COUNT; e++) {
        const enemy = state.enemies[e];
        if (enemy) {
            arr[i++] = clamp01((enemy.dx + m) / (2 * m));
            arr[i++] = clamp01((enemy.dy + m) / (2 * m));
            arr[i++] = clamp01((enemy.dvx + 10) / 20);
            arr[i++] = clamp01((enemy.dvy + 10) / 20);
            arr[i++] = clamp01(enemy.health / 100);
            arr[i++] = enemy.hasLineOfSight ? 1 : 0;
            arr[i++] = clamp01((enemy.heading + Math.PI) / (2 * Math.PI));
            arr[i++] = clamp01(enemy.timeSinceSeen / 10);
        } else {
            for (let j = 0; j < ENEMY_SIZE; j++) arr[i++] = 0;
        }
    }

    for (let l = 0; l < LOOT_COUNT; l++) {
        const loot = state.loot[l];
        if (loot) {
            arr[i++] = clamp01((loot.dx + m) / (2 * m));
            arr[i++] = clamp01((loot.dy + m) / (2 * m));
            arr[i++] = clamp01(loot.type);
        } else {
            for (let j = 0; j < LOOT_SIZE; j++) arr[i++] = 0;
        }
    }

    const ctx = state.mapContext;
    for (let j = 0; j < MAP_CONTEXT_SIZE; j++) {
        arr[i++] = clamp01(ctx[j] ?? 0);
    }

    const t = state.timers;
    arr[i++] = clamp01(t[0] ?? 0);
    arr[i++] = clamp01(t[1] ?? 0);

    return arr;
}

