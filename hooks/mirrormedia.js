import React from 'react'
import K5Logo from './components/K5Logo/K5Logo'
export default {
    pages: () => [
        {
            label: 'Content',
            children: [
                'Post',
                'EditorChoice',
                'Image',
                'Video',
                'Audio',
                'Event',
            ],
        },
        {
            label: 'Class',
            children: ['Topic', 'Section', 'Category', 'Tag'],
        },
        {
            label: 'Watch',
            children: ['Watch', 'WatchBrand', 'WatchStore', 'WatchFunction'],
        },
        {
            label: 'People',
            children: ['User', 'Contact', 'Company'],
        },
        {
            label: 'Other',
            children: ['Partner', 'External'],
        },
    ],
    logo: () => <K5Logo />,
}
