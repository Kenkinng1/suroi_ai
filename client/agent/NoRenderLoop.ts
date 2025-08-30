// Simplified tick loop used when running the game client in headless mode.
// The real client performs rendering and input handling; in Agent Mode we only
// want the logic ticks. This file merely documents the concept and is not wired
// into the main client build.

export function startNoRenderLoop(tick: () => void, hz = 20): () => void {
    const interval = setInterval(tick, 1000 / hz);
    return () => clearInterval(interval);
}

