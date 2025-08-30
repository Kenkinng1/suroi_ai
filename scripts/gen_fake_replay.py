"""Generate a tiny fake replay used for smoke tests."""
import json
from pathlib import Path


def main() -> None:
    data = {"events": ["spawn", "move", "loot", "eliminate"]}
    Path("fake_replay.json").write_text(json.dumps(data))


if __name__ == "__main__":
    main()
