import React, { useState, useEffect } from 'react'
import './NewDateTime.style.css'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'
import './DateFormat'

function NewDateTime({ value, onChange }) {
  const [inputField, setInputField] = useState('')

  const changeHandler = (moment) => {
    console.log(moment)
    const selectDateTime = moment._d.format('MM-dd-yyyy hh:mm')
    setInputField(selectDateTime)
    onChange(selectDateTime)
  }
  const nowHandler = (e) => {
    e.preventDefault()
    const nowDateTime = new Date().format('MM-dd-yyyy hh:mm')
    setInputField(nowDateTime)
    onChange(nowDateTime)
  }

  return (
    <div className="NewDateTime">
      <Datetime
        value={inputField}
        initialValue={value ? value : ''}
        onChange={(moment) => changeHandler(moment)}
        dateFormat="MM-DD-YYYY"
        timeFormat="HH:mm"
      />
      <button className="nowButton" onClick={(e) => nowHandler(e)}>
        Now
      </button>
    </div>
  )
}

export default NewDateTime
