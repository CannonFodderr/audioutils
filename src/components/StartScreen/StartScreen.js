import React from 'react'

const StartScreen = ({initAudioContext}) => {
    return (
        <>
            <h1>Audio Utilities</h1>
            <button className="btn" onClick={initAudioContext}>START</button>
        </>
    )
}

export default StartScreen