const { access } = require('../helper/Permission.js');
const { Text, Select, Checkbox, Password } = require('@keystonejs/fields');
//const { atTracking } = require('@keystonejs/list-plugins');

const status_options = [
  { value: 'active', label: "active" },
  { value: 'inactive', label: "inactive" },
];

module.export = {
  fields: {
    name: { label: "姓名", type: Text, isRequired: true },
    phone: { label: "電話", type: Text, isRequired: true },
    email: {
      type: Text,
      isUnique: true,
    },
    role: { type: Select, options: 'editor, manager, reporter' },
    isAdmin: { type: Checkbox },
    password: {
      type: Password,
    },
    user_status: { label: "狀態", type: Select, options: status_options, isRequired: true},
  },
  access: {
    read: access.userIsAdmin,
    update: access.userIsAdmin,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
  /*
  plugins: [
	atTracking({
	  createdAtField: "createAt",
	  updatedAtField: "updateAt",
	  format: "YYYY/MM/DD h:mm A",
	}),
  ],
  */
};
