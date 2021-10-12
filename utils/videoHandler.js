const { getNewFilename, getFileDetail } = require('./fileDetailHandler')

const feedNewVideoData = (resolvedData) => {
    return new Promise((resolve, reject) => {
        try {
            resolvedData.file.filename = getNewFilename(resolvedData)
            resolvedData.meta = resolvedData.file._meta
            resolvedData.url = resolvedData.file._meta.url
            resolvedData.duration = resolvedData.file._meta.duration

            resolve()
        } catch (err) {
            reject()
        }
    })
}

const deleteOldVideoFileInGCSIfNeeded = async (
    existingItem,
    resolvedData,
    fileAdapter
) => {
    if (existingItem && existingItem.file) {
        if (resolvedData) {
            resolvedData.file = null
        }

        await fileAdapter.delete(
            existingItem.file.id,
            existingItem.file.originalFilename
        )
    }
}

const deleteVideoFileInGCS = async (existingItem, fileAdapter) => {
    if (existingItem && existingItem.file) {
        await fileAdapter.delete(
            existingItem.file.id,
            existingItem.file.originalFilename
        )
    }
}

const validateWhichKeyShouldCMSChoose = (
    existingItem,
    resolvedData,
    addValidationError,
    fileAdapter
) => {
    const { youtubeUrl, file } = resolvedData
    const { youtubeUrl: oldYoutubeUrl, file: oldFile } = existingItem || {}

    if (
        youtubeUrl &&
        file
        // (file && oldYoutubeUrl) ||
        // (youtubeUrl && oldFile)
    ) {
        // if has both, or conflict with prev data's video type
        // if validation fail, need to clear uploaded video in gcs
        deleteVideoFileInGCS(resolvedData, fileAdapter)
        addValidationError(
            '「Youtube網址」與「檔案」只能選擇一個作為影片來源，清除其中一個'
        )
        return false
    }

    if (youtubeUrl) {
        return 'youtubeUrl'
    } else if (file) {
        return 'file'
    } else if (existingItem && (oldYoutubeUrl || oldFile)) {
        return 'no-need-to-update'
    } else {
        addValidationError(
            '沒有影片來源，請在「Youtube網址」與「檔案」兩者中選擇一個作為影片來源'
        )
        return false
    }
}

const validateIfConflictWithStoredData = () => {}

module.exports = {
    deleteOldVideoFileInGCSIfNeeded,
    feedNewVideoData,
    validateWhichKeyShouldCMSChoose,
}
