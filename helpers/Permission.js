const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin);
const userIsUsers = ({ authentication: { item: user } }) => Boolean(user && user.role == 'users');
const userIsManager = ({ authentication: { item: user } }) => Boolean(user && user.role == 'manager');
const userIsReporter = ({ authentication: { item: user } }) => Boolean(user && user.role == 'reporter');
const userIsEditor = ({ authentication: { item: user } }) => Boolean(user && user.role == 'editor');
const everyone = ({ authentication: { item: user } }) => Boolean(user);
const access = { userIsAdmin, userIsUsers, everyone, userIsEditor, userIsManager, userIsReporter};

module.exports = { "access": access }
