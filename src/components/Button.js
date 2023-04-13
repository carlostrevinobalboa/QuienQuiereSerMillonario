import React from 'react'

export const Button = ({texto, funcion}) => {
    return <button className="mr-2 border p-1 " onClick={() => {funcion()} }>{texto}</button>
}