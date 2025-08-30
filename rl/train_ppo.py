"""Minimal PPO training entrypoint.

This script is intentionally light-weight. It serves as documentation for how one
might hook up Stable-Baselines3 to the Suroi environment. The actual training is
not run in CI; unit tests only import this module to ensure it is syntactically
correct."""

from __future__ import annotations

import argparse

try:
    from stable_baselines3 import PPO
except Exception:  # pragma: no cover - SB3 is heavy and optional
    PPO = None  # type: ignore

from .env import SuroiEnv


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--total-steps", type=int, default=1_000)
    args = parser.parse_args()

    env = SuroiEnv()
    if PPO is None:
        print("Stable-Baselines3 is not installed; exiting")
        return

    model = PPO("MlpPolicy", env, verbose=1)
    model.learn(total_timesteps=args.total_steps)
    model.save("ppo_suroi")


if __name__ == "__main__":
    main()
