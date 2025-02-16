import { test, expect, request } from '@playwright/test';

const baseURL = 'https://api.restful-api.dev/';

test.describe('REST API Tests', () => {

  test('GET all objects', async ({ request }) => {
    const response = await request.get(baseURL);
    expect(response.status()).toBe(200);
  });

  test('POST a new object', async ({ request }) => {
    const newObject = {
        name: "Apple MacBook Pro 16",
        data: {
           year: 2019,
           price: 1849.99,
           "CPU model": "Intel Core i9",
           "Hard disk size": "1 TB"
        }
     };
    const response = await request.post(baseURL+"objects",newObject);
    expect(response.status()).toBe(200);

  });

  test('GET object by ID', async ({ request }) => {
    const response = await request.get(baseURL+"objects/7");
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log("response",responseBody)
    expect(responseBody.name).toBe("Apple MacBook Pro 16");
  });

  test('PUT update object', async ({ request }) => {
    const updatedData = {
        name: "Apple MacBook Pro 16",
        data: {
           year: 2019,
           price: 2049.99,
           "CPU model": "Intel Core i9",
           "Hard disk size": "1 TB",
           "color": "silver"
        }
     };
    const response = await request.put(baseURL+"objects/7",updatedData);
    expect(response.status()).toBe(200);

    // const responseBody = await response.json();
    // expect(responseBody.name).toBe(updatedData.name);
  });

  test('DELETE object', async ({ request }) => {
    const response = await request.delete(baseURL+"objects/6");
    console.log("delete",response)
    expect(response.status()).toBe(200);

  });
});
