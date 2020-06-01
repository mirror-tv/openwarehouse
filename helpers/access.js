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
    const isAdmin = userIsAdmin(auth);
    const isModerator = userIsModerator(auth);
    const isOwner = userOwnsItem(auth);
    return isAdmin || isModerator || isOwner;
};

const userIsAdminOrModerator = auth => {
    const isAdmin = userIsAdmin(auth);
    const isModerator = userIsModerator(auth);
    return isAdmin || isModerator;
};

const userIsAboveAuthorOrOwner = auth => {
    const isAuthor = userIsAuthor(auth);
    const isContributor = userIsContributor(auth);
    const isOwner = userOwnsItem(auth);
    return !(isAuthor || isContributor) || isOwner;
}

const access = { userIsAdmin, userIsAdminOrModerator, userIsAdminOrModeratorOrOwner, userIsAboveAuthorOrOwner, userOwnsItem, userIsContributor, userIsNotContributor };

module.exports = access
