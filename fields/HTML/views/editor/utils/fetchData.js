import { createApolloFetch } from 'apollo-fetch';

const fetch = createApolloFetch({
    uri: '/admin/api',
});

export const setPages = ({ list, readableColumn, maxImageNumberPerPage }, search, setCallBack) => {
    (async () => {
        const { data: { _allImagesMeta: { count } } } = await fetch({
            query: `
            query($search: String!) {
                _all${list}sMeta(where: {${readableColumn}_contains: $search}) {
                  count
                }
            }`,
            variables: {
                search: search,
            },
        });
        setCallBack(Math.ceil(count / maxImageNumberPerPage));
    })();
}

export const setData = ({ list, readableColumn, urlColumn, maxImageNumberPerPage }, search, page, setCallBack) => {
    (async () => {
        const { data } = await fetch({
            query: `
            query fetch${list}s($search: String!, $skip: Int!, $first: Int!) {
                all${list}s(where: {${readableColumn}_contains: $search}, skip: $skip, first: $first) {
                  id
                  ${readableColumn}
                  ${urlColumn}
                }
            }`,
            variables: {
                search: search,
                skip: (page - 1) * maxImageNumberPerPage,
                first: maxImageNumberPerPage,
            },
        });
        setCallBack(data[`all${list}s`]);
    })();
}