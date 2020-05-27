export default {
    pages: () => [
        {
            label: 'Content',
            path: 'content',
            children: ['PostCategory', 'Section', 'Tag', 'Topic', 'Post'],
        },
        {
            label: 'People',
            path: 'people',
            children: ['User', 'Contact'],
        },
    ]
};
