import React from 'react'

const ErrorContainer = (props: {error: string}) => {
  return (
    <div className='w-full h-24 grid place-content-center'>
      <p>{ JSON.stringify(props.error, null, 2) }</p>
    </div>
  )
}

export default ErrorContainer;