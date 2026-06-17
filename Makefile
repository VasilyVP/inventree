
install:
	docker compose run --rm inventree-server invoke update

demo-dataset:
	docker compose run --rm inventree-server invoke dev.setup-test -i

start:
	docker compose up -d

stop:
	docker compose down

get-item-inventory-python:
	 python scripts/get_item_inventory.py

get-item-inventory-ts:
	 bun run scripts/get_item_inventory.mts
