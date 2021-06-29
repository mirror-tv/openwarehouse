import React from 'react'
import PropTypes from 'prop-types'
import './PreviewBtn.style.css'
import { getPostIdFromUrl, getPreviewUrl } from '../../utils/previewHandler'
XMLHttpRequest
function PreviewBtn() {
    const postId = getPostIdFromUrl()

    const previewUrl = getPreviewUrl(postId)
    return (
        <a className="preview-button" href={previewUrl} target="_blank">
            Preview
        </a>
    )
}

PreviewBtn.propTypes = {}

export default PreviewBtn
