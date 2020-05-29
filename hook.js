export default {
    pages: () => [
        {
            label: 'Content',
            children: ['Post', 'Image', 'Video', 'Audio'],
        },
        {
            label: 'Class',
            children: ['Topic', 'Section', 'Category', 'Tag'],
        },
        {
            label: 'People',
            children: ['User', 'Contact', 'Company'],
        },
    ]
};