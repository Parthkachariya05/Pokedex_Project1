import React, { useState } from 'react'
import './Search.css'
import useDebounce from '../../hooks/useDebounce'

export default function Search({updateSearchTerm}) {

  const debounceCallback = useDebounce((e) => updateSearchTerm(e.target.value))

  return (
    <div className='search-wrapper'>

      <input
        type="text"
        id='pokemon-name-search'
        placeholder='pokemon Name....'
        onChange={(e) => debounceCallback(e, '123')}
      />


    </div>
  )
}
