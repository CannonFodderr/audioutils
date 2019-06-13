import React from 'react'
const Title = ({text, index, handleUtilSelection}) => {
    return (
        <>
            <div 
            id={index}
            draggable={true}
            className="title"
            onDragStart={() => {
                handleUtilSelection(index)
            }}
            onDragEnter={(e) => {
                handleUtilSelection(index)
            }}
            onDragEnd={() => {
                handleUtilSelection(null)
            }}
            >
            {text}
            </div>
        </>
    )
}
export default Title