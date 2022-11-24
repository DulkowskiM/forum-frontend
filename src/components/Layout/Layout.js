import React from 'react'

export default function Layout(props) {
  return (
    <div className='container'>
        <div>
            {
                props.menu 
            }
        </div>
        <div>
            { 
                props.content
            }
        </div>
        <div>
            {
                props.footer
            }
        </div>
    </div>
  )
}
