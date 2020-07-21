import { useRef, useEffect, useCallback, useState } from 'react'
import _debounce from 'lodash/debounce'
import _isEqual from 'lodash/isEqual'

const uC = useCallback

function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef()

  // Store current value in ref
  useEffect(() => {
    ref.current = value
  }, [ value ]) // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current
}

function useStateDerivedFromProps(value) {
  const [ state, setState ] = useState(value)
  const prevValue = usePrevious(value)
  useEffect(()=> {
    if(!_isEqual(prevValue,value))
      setState(value)
  },[ value ])

  return [ state,setState ]
}

function useChangeStatusEffect(callback = () => {}, status = 'RESET_ITEM', otherStatus  = []) {
  const prevStatus = usePrevious(status)

  useEffect(() => {
    if(
      prevStatus !== status
      && prevStatus !== 'RESET_ITEM'
      && ([ 'DELETED','POSTED','PUT' , ...otherStatus ].includes(status))
    )
      callback()
  }, [ status, prevStatus ])
}

function useDebounceText(callback = () => {}, delay = 300) {
  const _debounceRequest = uC(
    _debounce((text) => callback(text), delay),
    []
  )

  const _handleChangeText = uC((e) => {
    _debounceRequest.cancel()
    _debounceRequest(e.target.value.trim())
  }, [])

  useEffect(() => {
    return () => _debounceRequest.cancel()
  }, [])

  return {
    _handleChangeText
  }
}

function useDebounce(callback = () => {}, delay = 1000) {
  const _debounceRequest = uC(
    _debounce((param) => callback(param), delay),
    []
  )

  const _handleDebounce = uC((param) => {
    _debounceRequest.cancel()
    _debounceRequest(param)
  }, [])

  useEffect(() => {
    return () => _debounceRequest.cancel()
  }, [])

  return {
    _handleDebounce
  }
}

/** for get value within listener */
function useRefFromValue(value) {
  const ref = useRef(value)
  useEffect(()=> {
    ref.current = value
  }, [ value ])

  return ref
}

export { usePrevious, useChangeStatusEffect, useDebounceText , useStateDerivedFromProps , useDebounce , useRefFromValue }
