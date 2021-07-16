import React, { useState, useEffect } from 'react'
import PreviewBtn from '../PreviewBtn'
import { getPostIdFromUrl, getPreviewUrl } from '../../utils/previewHandler'

function PreviewBar() {
    const [isLoading, setIsLoading] = useState(true)
    const [url, setUrl] = useState('/')
    const { id: postId, currentListName } = getPostIdFromUrl()

    // show Preview button only in Post list
    if (currentListName && currentListName === 'posts') {
        useEffect(async () => {
            const newUrl = await getPreviewUrl(postId)

            setUrl(newUrl)
            setIsLoading(false)
        }, [])

        return <PreviewBtn url={url} isLoading={!isLoading} />
    } else {
        return null
    }
}

export default PreviewBar
