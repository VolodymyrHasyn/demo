import { test, expect } from '@playwright/test';

test('API get method test', async ({ request }) => {
    const getUrl = await request.get('/posts');
    const response = await getUrl.status();

    expect(response).toBe(200);

});

test('API post method test', async ({ request }) => {
    const postUrl = await request.post('/posts', {
        data: {
            title: "new post test"
        }
    })

    const response = await postUrl.status();

    expect(response).toBe(201)
});

test('data-driven test', async ({ request }) => {
    // try{
    const qqq = [1,2];
    for (let i = 0; i < qqq.length; i++) {
        const getUrl = await request.get(`/posts?id=${qqq[i]}`, {
            params: {
                limit: 2,
                // id: qqq[i],
                // skip: 1,
                select: "id"
            }
    });
    const body = JSON.parse(await getUrl.text());
    expect(await body.id).toEqual(qqq[i]);
    }
})