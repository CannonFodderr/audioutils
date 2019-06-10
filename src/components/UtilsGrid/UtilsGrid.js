import React from 'react'
import './UtilsGrid.css'
import Oscillator from '../Oscillator/Oscillator'
import Player from '../Player/Player'

const UtilsGrid = ({audioCTX}) => {
    return (
        <>
        <div className="utilsGrid">
            <Oscillator audioCTX={audioCTX}/>
            <Player audioCTX={audioCTX}/>
            <Oscillator audioCTX={audioCTX}/>
            <Oscillator audioCTX={audioCTX}/>
        </div>
        </>
    )
}
export default UtilsGrid