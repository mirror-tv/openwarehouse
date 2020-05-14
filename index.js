const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { Select, Text, Checkbox, Password, Relationship, Integer, DateTime, Float } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
//const { atTracking } = require('@keystonejs/list-plugins');
const initialiseData = require('./initial-data');
//const { access } = require('./lists/Permission.js');


const UsersSchema = require('./lists/Users.js');
keystone.createList('User', UsersSchema);
