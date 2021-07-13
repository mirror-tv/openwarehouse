import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './PreviewBtn.style.css'
import { getPostIdFromUrl, getPreviewUrl } from '../../utils/previewHandler'
XMLHttpRequest

function PreviewBtn() {
    const [url, setUrl] = useState('/')
    const { id: postId, currentListName } = getPostIdFromUrl()

    useEffect(async () => {
        const newUrl = await getPreviewUrl(postId)
        setUrl(newUrl)
    }, [])

    if (currentListName && currentListName === 'posts') {
        // const previewUrl = getPreviewUrl(postId)

        return (
            <a className="preview-button" href={url} target="_blank">
                Preview
            </a>
        )
    } else {
        return null
    }
}

PreviewBtn.propTypes = {}

export default PreviewBtn
