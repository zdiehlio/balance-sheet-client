import React, { useState, useEffect } from 'react'
import axios from 'axios'

import RecordTable from './RecordTable'
import Totals from './Totals'

import './index.css'

const BalanceSheet = () => {
  const [recordsState, setRecordsState] = useState([])
  const [editingState, setEditingState] = useState(false)
  const [totalsState, setTotalsState] = useState()

  // let's just pretend this is a real API
  const api_url = 'https://sleepy-scrubland-70552.herokuapp.com/'

  useEffect(() => {
    const getRecords = () => {
      return axios
        .get(api_url)
        .then(res => {
          console.log(res.data)
          setRecordsState(res.data.result)
          setTotalsState(res.data.totals)
        })
        .catch(error =>
          console.error({ error, message: 'records could not be retrieved' })
        )
    }
    getRecords()
  }, [])

  const handleCreate = (event, entry) => {
    event.preventDefault()
    axios
      .post(api_url, entry)
      .then(res => {
        setRecordsState(recordsState.concat(res.data.result))
        setTotalsState(res.data.totals)
      })
      .catch(error =>
        console.error({ error, message: 'record could not be created' })
      )
  }

  const handleUpdate = (event, entry, id) => {
    event.preventDefault()
    const original = recordsState.find(entry => entry._id === id)
    axios
      .put(`${api_url}/${id}`, entry)
      .then(res => {
        console.log(res.data)
        const copyRecords = [...recordsState]
        const recordToUpdate = copyRecords.findIndex(entry => entry._id === id)
        copyRecords[recordToUpdate] = res.data.result
        setRecordsState(copyRecords)
        setTotalsState(res.data.totals)
      })
      .catch(error =>
        console.error({ error, message: 'record could not be updated' })
      )
    setEditingState(false)
  }

  const handleDelete = id => {
    const verifyDelete = window.confirm(
      'Are you sure you want to delete this entry?'
    )
    if (verifyDelete) {
      axios
        .delete(`${api_url}/${id}`)
        .then(res => {
          setRecordsState(recordsState.filter(entry => entry._id !== id))
          setTotalsState(res.data.totals)
        })
        .catch(error =>
          console.error({ error, message: 'record could not be deleted' })
        )
    }
  }
  return (
    <div className='sheet-container'>
      <div>
        <h1>Personalized Balance Sheet</h1>
        <RecordTable
          records={recordsState}
          handleDelete={handleDelete}
          handleCreate={handleCreate}
          handleUpdate={handleUpdate}
          toggleEdit={id => setEditingState(id)}
          editing={editingState}
        />
      </div>
      <Totals totals={totalsState} />
    </div>
  )
}

export default BalanceSheet
