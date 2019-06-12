import React from 'react'
import './StartScreen.css'

const StartScreen = ({initAudioContext}) => {
    return (
        <div className="start-screen">
            <h1>Audio Utilities</h1>
            <button className="btn" onClick={initAudioContext}>START</button>
        </div>
    )
}

export default StartScreen