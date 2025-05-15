import React from 'react'



export default function Pokemon({ name, image }) {
    return (
        <div>
            <div>{name}</div>
            <div><img src={image} /></div>
        </div>
    )
}
