import React from 'react'
// import PropTypes from 'prop-types'
import { app } from '../../../configs/config.js'
import './K5Logo.style.css'

function K5Logo(props) {
    const currentCmsName = app.project
    const logoDir = `../images/logo/logo-${currentCmsName}.svg`

    return (
        <div className="k5-logo">
            <img src={logoDir}></img>
        </div>
    )
}

// K5Logo.propTypes = {}

export default K5Logo
