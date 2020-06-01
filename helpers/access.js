const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin);
const userIsModerator = ({ authentication: { item: user } }) => Boolean(user && user.role == 'moderator');
const userIsEditor = ({ authentication: { item: user } }) => Boolean(user && user.role == 'editor');
const userIsAuthor = ({ authentication: { item: user } }) => Boolean(user && user.role == 'author');
const userIsContributor = ({ authentication: { item: user } }) => Boolean(user && user.role == 'contributor');
const userIsNotContributor = ({ authentication: { item: user } }) => Boolean(user && user.role != 'contributor');

const userOwnsItem = ({ authentication: { item: user }, listKey }) => {
    if (!user) {
        return false;
    }

    if (listKey == 'User') {
        return { id: user.id };
    }

    return { author: { id: user.id } };
};

const userIsAdminOrModeratorOrOwner = auth => {
    const isAdmin = access.userIsAdmin(auth);
    const isModerator = access.userIsModerator(auth);
    const isOwner = access.userOwnsItem(auth);
    return isAdmin || isModerator || isOwner;
};

const userIsAdminOrModerator = auth => {
    const isAdmin = access.userIsAdmin(auth);
    const isModerator = access.userIsModerator(auth);
    return isAdmin ? isAdmin : isModerator;
};

const access = { userIsAdmin, userIsModerator, userIsEditor, userIsAuthor, userIsContributor, userIsNotContributor, userIsAdminOrModeratorOrOwner, userIsAdminOrModerator, userOwnsItem };

module.exports = access
