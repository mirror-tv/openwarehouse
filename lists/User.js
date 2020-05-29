<<<<<<< HEAD
const { Text, Checkbox, Password, DateTime } = require('@keystonejs/fields');


const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin);

const userOwnsItem = ({ authentication: { item: user } }) => {
    if (!user) {
        return false;
    }
    // Instead of a boolean, you can return a GraphQL query:
    // https://www.keystonejs.com/api/access-control#graphqlwhere
    return { id: user.id };
};

const userIsAdminOrOwner = auth => {
    const isAdmin = access.userIsAdmin(auth);
    const isOwner = access.userOwnsItem(auth);
    return isAdmin ? isAdmin : isOwner;
};

const access = { userIsAdmin, userOwnsItem, userIsAdminOrOwner };
=======
const { Text, Checkbox, Password, Select, Relationship } = require('@keystonejs/fields');
const { atTracking, byTracking } = require('@keystonejs/list-plugins');
const access = require('../helpers/access');
>>>>>>> 17cd2bae38627c9f0ff608dd5500451f1af81e21

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

        role:{ 
            type: Text
        },

        updatedAt:{ 
            type: DateTime
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