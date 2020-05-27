export default {
    pages: () => [
        {
            label: 'Content',
            path: 'content',
            children: ['PostCategory', 'Section', 'Tag', 'Topic'],
        },
        {
            label: 'People',
            path: 'people',
            children: ['User'],
        },
    ]
};
