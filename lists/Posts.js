const { Text, Select, Wysiwyg, DateTime, Relationship } = require('@keystonejs/fields');

module.exports = {
    fields:{
        title: { type: Text, required: true },
        state: { type: Select, options: 'draft, published, archived', default: 'draft' },
        author: { type: Relationship, ref: 'User' },
        createdAt: { type: DateTime, default: Date.now  },
        publishedAt: DateTime,
        // image: { type: Types.CloudinaryImage }, // Modify this
        content: {
            brief: { type: Types.Html, Wysiwyg: true, height: 150 },
            extended: { type: Types.Html, Wysiwyg: true, height: 400 }
        }
}
}