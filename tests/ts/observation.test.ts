import assert from 'node:assert';
import { encodeObservation, OBSERVATION_LENGTH, ObservationInput } from '../../server/agent/Observations';
import { encodeAction, decodeAction, ActionStruct, ACTION_LENGTH } from '../../server/agent/Actions';

// Basic observation encoding test
const sample: ObservationInput = {
    mapSize: 100,
    self: { x: 10, y: 20, vx: 0, vy: 0, health: 50, armor: 25, ammo: 30, activeWeapon: 1, isReloading: false, isInCover: true, timeSinceLastShot: 1 },
    zone: { x: 50, y: 50, radius: 30, distance: 10, inside: true },
    enemies: [ { dx: 5, dy: 5, dvx: 0, dvy: 0, health: 100, hasLineOfSight: true, heading: 0, timeSinceSeen: 0 } ],
    loot: [ { dx: -3, dy: 4, type: 1 } ],
    mapContext: Array(13).fill(0.5),
    timers: [0.1, 0.2]
};

const obs = encodeObservation(sample);
assert.equal(obs.length, OBSERVATION_LENGTH);
assert(obs.every(v => v >= 0 && v <= 1));

// Zero padding for missing enemies/loot
const empty: ObservationInput = {
    ...sample,
    enemies: [],
    loot: []
};
const obs2 = encodeObservation(empty);
assert(obs2.slice(16, 16 + 8).every(v => v === 0));

// Action encode/decode symmetry
const action: ActionStruct = { moveX: 0.5, moveY: -0.5, aim: 0.25, fire: 1, reload: 0, interact: 1, weapon: 0.2, heal: 0, sprint: 1 };
const encoded = encodeAction(action);
assert.equal(encoded.length, ACTION_LENGTH);
const decoded = decodeAction(encoded);
assert(Math.abs(decoded.weapon - action.weapon) < 1e-6);
decoded.weapon = action.weapon; // normalise for deep compare
assert.deepStrictEqual(decoded, { ...action, fire: 1, reload: 0, interact: 1, heal: 0, sprint: 1 });

console.log('observation tests passed');
