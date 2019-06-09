import React from 'react'
import './UtilsGrid.css'
import Oscillator from '../Oscillator/Oscillator'

const UtilsGrid = ({audioCTX}) => {
    return (
        <>
        <h4>UtilsGrid</h4>
        <div className="utilsGrid">
            <Oscillator audioCTX={audioCTX}/>
            <Oscillator audioCTX={audioCTX}/>
            <Oscillator audioCTX={audioCTX}/>
            <Oscillator audioCTX={audioCTX}/>
        </div>
        </>
    )
}
export default UtilsGrid