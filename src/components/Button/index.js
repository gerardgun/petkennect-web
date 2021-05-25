import React from 'react'
import './styles.scss'

function ButtonPrimary ({text}){
    return(
        <button className='button'>
            {text ? text:'click me!'}
        </button>
    )
}

export default ButtonPrimary;