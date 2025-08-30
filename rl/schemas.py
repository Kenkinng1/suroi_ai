"""Typed structures for observation and action exchange."""
from dataclasses import dataclass
from typing import List


@dataclass
class Observation:
    values: List[float]


@dataclass
class Action:
    values: List[float]
