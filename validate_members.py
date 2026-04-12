import json, sys

with open("members.json") as f:
    members = json.load(f)

errors = []
for i, m in enumerate(members):
    for field in ("name", "role", "page"):
        if not m.get(field):
            errors.append(f"Member {i}: missing '{field}'")

if errors:
    print("Validation failed:")
    for e in errors: print(" -", e)
    sys.exit(1)

print(f"OK — {len(members)} members valid.")
