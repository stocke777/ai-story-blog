import React from 'react'

type Props = {
    name:string
}

const Tag = ({name}: Props) => {
  return (
    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">{name}</span>
  )
}

export default Tag