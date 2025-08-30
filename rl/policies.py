"""Simple policy stubs used for evaluation."""
from __future__ import annotations

import numpy as np

from .env import ACTION_LENGTH


def scripted_policy(obs: np.ndarray) -> np.ndarray:
    """A tiny baseline that does nothing."""
    return np.zeros(ACTION_LENGTH, dtype=np.float32)


def model_policy(model, obs: np.ndarray) -> np.ndarray:
    """Wrapper around a PPO policy for inference."""
    action, _ = model.predict(obs)
    return action
