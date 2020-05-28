const { Text, Checkbox, Password, Select, Relationship } = require('@keystonejs/fields');
const { atTracking, byTracking } = require('@keystonejs/list-plugins');
const access = require('../helpers/access');

module.exports = {
    fields: {
        name: {
            type: Text,
            isRequired: true,
        },
        email: {
            type: Text,
            isRequired: true,
            isUnique: true
        },
        password: {
            type: Password
        },
        role: {
            type: Select,
            dataType: 'string',
            options: 'contributor, author, editor, moderator',
            defaultValue: 'contributor',
            isRequired: true,
            access: {
                update: access.userIsAdminOrModerator,
            }
        },
        company: {
            type: Relationship,
            ref: 'Company.users'
        },
        address: {
            type: Text
        },
        isAdmin: {
            type: Checkbox,
            access: {
                update: access.userIsAdmin,
            }
        },
        isProtected: {
            type: Checkbox,
            access: {
                update: access.userIsAdmin,
            }
        },
    },
    plugins: [
        atTracking(),
        byTracking(),
    ],
    access: {
        read: access.userIsAdminOrModerator,
        update: access.userIsAdminOrModeratorOrOwner,
        create: access.userIsAdminOrModerator,
        delete: access.userIsAdminOrModerator,
        auth: true,
    },
    hooks: {
        resolveInput: async ({ operation, existingItem, resolvedData }) => {
            if (operation === 'update' && existingItem.isProtected) {
                const protectedFields = ['name', 'email', 'isAdmin', 'role'];
                protectedFields.forEach(field => {
                    resolvedData[field] = existingItem[field];
                })
            }

            return resolvedData;
        }
    },
    adminConfig: {
        defaultColumns: 'name, email, role, isAdmin',
    },
}