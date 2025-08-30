"""Minimal environment stub without external dependencies."""
from __future__ import annotations

from dataclasses import dataclass
from typing import List, Tuple, Any

OBSERVATION_LENGTH = 125
ACTION_LENGTH = 9


@dataclass
class Box:
    low: float
    high: float
    shape: Tuple[int, ...]
    dtype: str = "float32"

    def sample(self) -> List[float]:
        # very small deterministic sample for tests
        return [0.0 for _ in range(self.shape[0])]


class SuroiEnv:
    def __init__(self) -> None:
        self.observation_space = Box(0.0, 1.0, (OBSERVATION_LENGTH,))
        self.action_space = Box(-1.0, 1.0, (ACTION_LENGTH,))

    def reset(self) -> Tuple[List[float], dict]:
        return ([0.0] * OBSERVATION_LENGTH, {})

    def step(self, action: List[float]) -> Tuple[List[float], float, bool, bool, dict]:
        return ([0.0] * OBSERVATION_LENGTH, 0.0, False, False, {})


# Handshake helpers used in tests

def _is_loopback(addr: str) -> bool:
    return addr.startswith("127.") or addr == "localhost"


def _validate_token(token: str, expected: str) -> bool:
    return token == expected
