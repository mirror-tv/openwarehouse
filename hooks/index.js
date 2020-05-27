export default {
    pages: () => [
        {
            label: 'Content',
            children: ['Post', 'Image', 'Video', 'Audio'],
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
