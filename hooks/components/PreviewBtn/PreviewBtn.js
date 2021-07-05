import React from 'react'
import PropTypes from 'prop-types'
import './PreviewBtn.style.css'
import { getPostIdFromUrl, getPreviewUrl } from '../../utils/previewHandler'
XMLHttpRequest
function PreviewBtn() {
    const { id: postId, currentListName } = getPostIdFromUrl()
    if (currentListName && currentListName === 'posts') {
        const previewUrl = getPreviewUrl(postId)
        return (
            <a className="preview-button" href={previewUrl} target="_blank">
                Preview
            </a>
        )
    } else {
        return null
    }
}

PreviewBtn.propTypes = {}

export default PreviewBtn
