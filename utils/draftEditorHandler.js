const countWord = async (existingItem, resolvedData) => {
    try {
        const content = resolvedData?.content
            ? JSON.parse(resolvedData?.content)
            : undefined

        // only edited draft editor need to count words
        if (!content || !content?.blocks) return

        let totalCount = 0
        content.blocks.forEach((block) => {
            const blockWordsCount = block?.text?.length || 0
            totalCount += blockWordsCount
        })

        resolvedData.wordCount = totalCount
    } catch (error) {
        console.error(error)
        return
    }
}

module.exports = { countWord }
