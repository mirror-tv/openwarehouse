import { createApolloFetch } from 'apollo-fetch';

const fetch = createApolloFetch({
    uri: '/admin/api',
});

/* export getCount = async () =>  */{
    const { data: { _allImagesMeta: { count } } } = await fetch({
        query: `
        query {
            _allImagesMeta {
              count
            }
        }`,
    });
}