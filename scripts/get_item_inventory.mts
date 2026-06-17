
type StockItem = {
  pk: number;
  quantity: number;
  part_detail?: {
    name?: string;
  };
};

async function getItemInventory(id: number): Promise<StockItem> {
  const fallbackUrl = `http://127.0.0.1/api/stock/${id}/`;
  const cookie = 'sessionid=v626fv6s2knebk07xyvxj0ge47hadk3w; csrftoken=QmrHayfj4QZAVKaHiaGOv6bi6RBm1emD';

  let response: Response;

  try {
    response = await fetch(fallbackUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Host': 'inventree.localhost',
        'Cookie': cookie,
      },
    });
  } catch (error) {
    console.error('Error fetching from primary URL:', error);
    throw new Error('Failed to fetch item inventory from both primary and fallback URLs');
  }

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Request failed (${response.status} ${response.statusText}): ${body.slice(0, 300)}`);
  }

  const data = (await response.json()) as StockItem;

  console.log(`Item ID: ${data.pk}`);
  console.log(`Item Name: ${data.part_detail?.name ?? 'N/A'}`);
  console.log(`Item Quantity: ${data.quantity}`);

  return data;
}

const id = 1223;

try {
  const inventory = await getItemInventory(id);
  console.log(`The quantity of item with ID ${id} is: ${inventory.quantity}`);
} catch (error) {
  console.assert(error instanceof Error, 'Expected an Error object');
  console.error('Error fetching item inventory:', (error as Error).message);
}
