# Local InvenTree Setup + Inventory Scripts

This repository runs **InvenTree locally** with Docker Compose and includes two example scripts to fetch a specific stock item's inventory via the InvenTree API:

- `scripts/get_item_inventory.py` (Python)
- `scripts/get_item_inventory.mts` (Node/TypeScript)

## Prerequisites

- Docker Desktop (or Docker Engine + Compose)
- `make`
- Optional, for local script editing/running outside the container:
	- Python 3.10+
	- Bun (for `.mts` execution via Make)

## Quick Start (from Makefile)

Run these commands from the repository root.

1. Install / update InvenTree dependencies in the container

```bash
make install
```

2. (Optional) Load demo dataset

```bash
make demo-dataset
```

3. Start services

```bash
make start
```

4. Stop services

```bash
make stop
```

## Available Make Targets

The current `Makefile` defines:

- `install`
	- `docker compose run --rm inventree-server invoke update`
- `demo-dataset`
	- `docker compose run --rm inventree-server invoke dev.setup-test -i`
- `start`
	- `docker compose up -d`
- `stop`
	- `docker compose down G`
- `get-item-inventory-python`
	- `python scripts/get_item_inventory.py`
- `get-item-inventory-ts`
	- `bun run scripts/get_item_inventory.mts`

## Run Inventory API Scripts

Run the Python script through Make:

```bash
make get-item-inventory-python
```

This executes:

```bash
python scripts/get_item_inventory.py
```

Run the TypeScript script through Make:

```bash
make get-item-inventory-ts
```

This executes:

```bash
bun run scripts/get_item_inventory.mts
```

## About the Two Scripts

Both scripts request:

- Endpoint: `http://127.0.0.1/api/stock/{id}/`
- Headers: `Accept`, `Host`, and `Cookie`

Current defaults in both files:

- `id = 1223`
- hardcoded `sessionid` / `csrftoken` cookie values

If you need another item, edit the `id` value in:

- `scripts/get_item_inventory.py`
- `scripts/get_item_inventory.mts`

If your login session changes, update the cookie string in both scripts.

## Notes

- The scripts are examples and currently use hardcoded auth cookies.
- For production use, switch to token-based auth or environment variables for credentials/session values.
