import { expect, request, test } from '@playwright/test';

const BASE_URL = 'https://api.restful-api.dev';

let createdItemId; // Variable to store created object ID

// Define a function to create a request context
let apiContext;
test.beforeAll(async () => {
  apiContext = await request.newContext();
});

test('GET: Fetch all items', async () => {
  const response = await apiContext.get(`${BASE_URL}/objects`);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(Array.isArray(body)).toBeTruthy();
});

test('POST: Create a new item', async () => {
  const newItem = {
    name: 'Test Item',
    data: { key: 'value' },
  };

  const response = await apiContext.post(`${BASE_URL}/objects`, {
    data: newItem,
  });
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.name).toBe(newItem.name);
  expect(body.data).toEqual(newItem.data);

  createdItemId = body.id; // Store created object ID
});

test('GET: Fetch a single item', async () => {
  const response = await apiContext.get(`${BASE_URL}/objects/${createdItemId}`);
  expect(response.status()).toBe(200);

  const fetchedItem = await response.json();
  expect(fetchedItem.name).toBe('Test Item');
});

test('PUT: Update the newly created item', async () => {
  const updatedData = {
    name: 'Updated Item',
    data: { key: 'newValue' },
  };

  const updateResponse = await apiContext.put(`${BASE_URL}/objects/${createdItemId}`, {
    data: updatedData,
  });

  expect(updateResponse.status()).toBe(200);
  const updatedItem = await updateResponse.json();
  expect(updatedItem.name).toBe(updatedData.name);
  expect(updatedItem.data).toEqual(updatedData.data);
});

test('DELETE: Remove the newly created item', async () => {
  const deleteResponse = await apiContext.delete(`${BASE_URL}/objects/${createdItemId}`);
  expect(deleteResponse.status()).toBe(200);

  const deleteBody = await deleteResponse.json();
  expect(deleteBody).toMatchObject({
    message: `Object with id = ${createdItemId} has been deleted.`,
  });
});