export default {
    pages: () => [
        {
            label: 'Content',
            children: ['Post', 'Video', 'Audio', 'Image'],
        },
        {
            label: 'Ｃlassification',
            children: ['Topic', 'Section', 'PostCategory', 'Tag'],
        },
        {
            label: 'People',
            children: ['User', 'Contact'],
        },
    ]
};
