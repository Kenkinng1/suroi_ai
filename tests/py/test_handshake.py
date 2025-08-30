import sys, os
sys.path.append(os.path.abspath('.'))
from rl.env import _is_loopback, _validate_token


def test_loopback_and_token():
    assert _is_loopback('127.0.0.1')
    assert not _is_loopback('10.0.0.5')
    assert _validate_token('abc', 'abc')
    assert not _validate_token('abc', 'def')
