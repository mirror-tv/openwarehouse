import React, { useState } from 'react'
import './NewDateTime.style.css'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'
import './DateFormat'

function NewDateTime({ value, onChange }) {
  const [inputField, setInputField] = useState('')

  // react-datetime accept integer unix timestamp
  // this part is for future adjustment
  console.log(typeof value)
  const newValue = parseInt(value)

  // get selected unix timestamp by moment from callback
  const changeHandler = (moment) => {
    const selectUnixTimestamp = parseInt(moment.format('x'))

    setInputField(selectUnixTimestamp)
    onChange(selectUnixTimestamp.toString())
  }

  // get current unix timestamp
  const nowHandler = (e) => {
    e.preventDefault()
    const nowUnixTimestamp = Date.now()

    setInputField(nowUnixTimestamp)
    onChange(nowUnixTimestamp.toString())
  }

  return (
    <div className="NewDateTime">
      <Datetime
        value={inputField}
        initialValue={newValue ? newValue : ''}
        onChange={(moment) => changeHandler(moment)}

        // dateFormat="YYYY-MM-DD"
        // timeFormat="HH:mm:ss"
      />
      <button className="nowButton" onClick={(e) => nowHandler(e)}>
        Now
      </button>
    </div>
  )
}

export default NewDateTime
