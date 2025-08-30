import sys, os
sys.path.append(os.path.abspath('.'))
from rl.env import SuroiEnv, OBSERVATION_LENGTH, ACTION_LENGTH


def test_spaces_and_step():
    env = SuroiEnv()
    assert env.observation_space.shape == (OBSERVATION_LENGTH,)
    assert env.action_space.shape == (ACTION_LENGTH,)
    obs, info = env.reset()
    assert len(obs) == OBSERVATION_LENGTH
    action = env.action_space.sample()
    obs, reward, terminated, truncated, info = env.step(action)
    assert len(obs) == OBSERVATION_LENGTH
    assert reward == 0.0
    assert not terminated and not truncated
