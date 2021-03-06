import React, { useReducer, useCallback, useEffect } from 'react'
import { LoadingSpinner } from '../LoadingSpinner'
import PropTypes from 'prop-types'

const fetchReducer = (state, action) => {
  switch (action.type) {
    case 'withLoading':
      return {
        ...state,
        error: null,
        loading: true,
        silentLoading: false
      }
    case 'withoutLoading':
      return {
        ...state,
        error: null,
        loading: false,
        silentLoading: true
      }
    case 'success':
      return {
        ...state,
        loading: false,
        silentLoading: false,
        error: null,
        data: action.payload
      }
    case 'failure':
      return {
        ...state,
        loading: false,
        silentLoading: false,
        error: action.error
      }
    default: return state
  }
}

export const Loader = React.forwardRef((props, ref) => {
  const { View, ErrorView, fetch } = props
  const [state, dispatch] = useReducer(fetchReducer, { loading: true })

  const _fetch = useCallback((type) => async () => {
    dispatch({ type })
    try {
      let data = null
      if (fetch && typeof fetch === 'function') {
        data = await fetch()
      }
      dispatch({ type: 'success', payload: data })
    } catch (error) {
      dispatch({ type: 'failure', error })
    }
  }, [dispatch, fetch])

  const load = useCallback(() => {
    _fetch('withLoading')()
  }, [_fetch])

  const reload = useCallback(() => {
    _fetch('withoutLoading')()
  }, [_fetch])

  useEffect(() => {
    load()
  }, [load])

  if (state.loading) return <LoadingSpinner />
  if (state.error) return <ErrorView error={state.error} load={load} reload={reload} />

  return (
    <View
      ref={ref}
      load={load}
      reload={reload}
      data={state.data}
      reloading={state.silentLoading}
    />
  )
})

Loader.defaultProps = {
  View: ({ load, reload, reloading, data }) => <div />,
  ErrorView: ({ error, load, reload }) => <div>{error.message}</div>
}

Loader.propTypes = {
  /** A React component to render after loading is successfully complete */
  View: PropTypes.elementType,
  /** A React component to render when there is an error */
  ErrorView: PropTypes.elementType,
  /** Should return the data you are interested in rendering  */
  fetch: PropTypes.func
}
