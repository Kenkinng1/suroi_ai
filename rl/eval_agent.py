"""Evaluation helper for trained agents."""
from __future__ import annotations

import argparse

try:
    from stable_baselines3 import PPO
except Exception:  # pragma: no cover
    PPO = None  # type: ignore

from .env import SuroiEnv


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--episodes", type=int, default=10)
    args = parser.parse_args()

    env = SuroiEnv()
    if PPO is None:
        print("Stable-Baselines3 is not installed; exiting")
        return
    model = PPO.load("ppo_suroi", env=env)
    wins = 0
    for _ in range(args.episodes):
        obs, _ = env.reset()
        done = False
        while not done:
            action, _ = model.predict(obs)
            obs, reward, terminated, truncated, _ = env.step(action)
            done = terminated or truncated
            wins += float(reward > 0)
    print(f"episodes: {args.episodes}, pseudo-win-rate: {wins/args.episodes:.2f}")


if __name__ == "__main__":
    main()
