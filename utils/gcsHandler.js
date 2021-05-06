const deleteOldFileInGCS = async (existingItem, fileAdapter) => {
    console.log('deleteOldFileInGCS')
    if (existingItem.file) {
        await fileAdapter.delete(
            existingItem.file.id,
            existingItem.file.originalFilename
        )
    }
}
module.exports = {
    deleteOldFileInGCS,
}
