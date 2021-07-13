import React from 'react'
import PropTypes from 'prop-types'
import './PreviewBtn.style.css'

function PreviewBtn({ url, isLoading }) {
    return isLoading ? (
        <a className="preview-button" href={url} target="_blank">
            Preview
        </a>
    ) : (
        <div className="preview-button preview-button-loading">Loading...</div>
    )
}

PreviewBtn.propTypes = {
    url: PropTypes.string,
    isLoading: PropTypes.bool,
}

PreviewBtn.defaultProps = {
    url: '',
    isLoading: true,
}

export default PreviewBtn
