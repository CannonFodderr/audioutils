import React from 'react'

const StartScreen = ({initAudioContext}) => {
    return (
        <>
            <button className="btn" onClick={initAudioContext}>START</button>
        </>
    )
}

export default StartScreen