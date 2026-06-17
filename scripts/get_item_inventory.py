import json
from typing import Any

import requests

URL_TEMPLATE = "http://127.0.0.1/api/stock/{id}/"
COOKIE = "sessionid=v626fv6s2knebk07xyvxj0ge47hadk3w; csrftoken=QmrHayfj4QZAVKaHiaGOv6bi6RBm1emD"


def get_item_inventory(item_id: int) -> dict[str, Any] | None:
    url = URL_TEMPLATE.format(id=item_id)
    response: requests.Response | None = None
    try:
        response = requests.get(
            url,
            headers={
                "Accept": "application/json",
                "Host": "inventree.localhost",
                "Cookie": COOKIE,
            },
            timeout=15,
        )
        response.raise_for_status()

        print(f"Response status code: {response.status_code}")
        data = response.json()
        print(f"Item ID: {data.get('pk')}")
        print(f"Item Name: {data.get('part_detail', {}).get('name', 'N/A')}")
        print(f"Item Quantity: {data.get('quantity')}")
        return data
    except requests.RequestException as e:
        print(f"Error retrieving inventory for item {item_id}: {e}")
        return None
    except ValueError as e:
        print(f"Error parsing JSON for item {item_id}: {e}")
        if response is not None:
            print(f"Response text: {response.text}")
        return None


item_id = 1223
inventory = get_item_inventory(item_id)

if inventory is not None:
    print(f"The quantity of item with ID {item_id} is: {inventory.get('quantity')}")
    print(json.dumps(inventory, indent=2))
else:
    print(f"Could not retrieve inventory for item {item_id}.")
