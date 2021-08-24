const generateSource = (existingItem, resolvedData) => {
    const updateSourceViaPostStyle = resolvedData.style && existingItem
    const isNotCreatedByBot = !resolvedData.source && !existingItem

    if (updateSourceViaPostStyle || isNotCreatedByBot) {
        // update/create post.source
        const postStyle = resolvedData.style
        let source = ''

        switch (postStyle) {
            case 'videoNews':
                source = 'yt'
                break

            case 'article':
            default:
                source = 'tv'
                break
        }

        resolvedData.source = source
    } // else, no need to update
}

module.exports = { generateSource }
