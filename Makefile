
install:
	docker compose run --rm inventree-server invoke update

demo-dataset:
	docker compose run --rm inventree-server invoke dev.setup-test -i

start:
	docker compose up -d

stop:
	docker compose down G

get-item-inventory:
	docker compose run --rm inventree-server node scripts/get_item_inventory.mts
