import React, { useState } from 'react'
import {
    FieldContainer,
    FieldLabel,
    FieldDescription,
    FieldInput,
} from '@arch-ui/fields'
import { Input } from '@arch-ui/Input'

const TextHideField = (props) => {
    const { onChange, autoFocus, field, errors, value = '', isDisabled } = props

    const handleChange = (event) => {
        onChange(event.target.value)
    }
    const { isMultiline } = field.config
    const htmlID = `ks-input-${field.path}`
    const canRead = errors.every(
        (error) =>
            !(error instanceof Error && error.name === 'AccessDeniedError')
    )
    const error = errors.find(
        (error) => error instanceof Error && error.name === 'AccessDeniedError'
    )

    const showField = () => {
        return { display: 'none' }
        // return { display: 'block' }
    }

    return (
        <FieldContainer className="text-hide-field" style={showField()}>
            <FieldLabel htmlFor={htmlID} field={field} errors={errors} />
            <FieldDescription text={field.adminDoc} />
            <FieldInput>
                <Input
                    autoComplete="off"
                    autoFocus={autoFocus}
                    required={field.isRequired}
                    type="text"
                    value={canRead ? value : undefined}
                    placeholder={canRead ? undefined : error.message}
                    onChange={handleChange}
                    id={htmlID}
                    isMultiline={isMultiline}
                    disabled={isDisabled}
                />
            </FieldInput>
        </FieldContainer>
    )
}

export default TextHideField
