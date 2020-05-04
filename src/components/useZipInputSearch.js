import { useEffect, useState } from 'react'

const useZipInputSearch = (
  zip, // zip store
  zipDetail, // zip detail store
  getZipes, // redux creator to get zip list
  setZip // redux creator to set a zip item
) => {
  const [ zipOptions, setZipOptions ] = useState([]) // For zip options

  useEffect(() => {
    if(zip.status === 'GOT') makeZipOptions()
  }, [ zip.status ])

  useEffect(() => {
    if(zipDetail.status === 'GOT') makeZipOptions()
  }, [ zipDetail.status ])

  const makeZipOptions = () => {
    let options = zip.items.map((item, index) => ({
      key  : index++,
      value: item.id,
      text : `${item.postal_code} - ${item.state_code}, ${item.city}`
    }))

    if(zipDetail.item.id)
      options.unshift({
        key  : 0,
        value: zipDetail.item.id,
        text : `${zipDetail.item.postal_code} - ${zipDetail.item.state_code}, ${zipDetail.item.city}`
      })

    setZipOptions(options)
  }

  const _handleZipChange = zipId => {
    setZip(
      zip.items.find(item => item.id === zipId)
    )
  }

  const _handleZipSearchChange = (e, data) => {
    if(data.searchQuery.length > 3)
      getZipes({
        search: data.searchQuery
      })
  }

  return [
    zipOptions,
    {
      _handleZipChange,
      _handleZipSearchChange
    }
  ]
}

export default useZipInputSearch
