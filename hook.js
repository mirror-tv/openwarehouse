export default {
    pages: () => [
        {
            label: 'Content',
            children: ['Post', 'EditorChoice', 'Image', 'Video', 'Audio', 'Event'],
        },
        {
            label: 'Class',
            children: ['Topic', 'Section', 'Category', 'Tag'],
        },
        {
            label: 'People',
            children: ['User', 'Contact', 'Company'],
        },
        {
            label: 'Other',
            children: ['Partner', 'External'],
        }
    ]
};