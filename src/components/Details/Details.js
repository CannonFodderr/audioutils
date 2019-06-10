import React from 'react'
import './Details.css'

const Details = ({audioCTX}) => {
    console.log(audioCTX)
    return(
        <>
        <div className="util details-util">
            <div className="detail">Sample Rate: {audioCTX.sampleRate}</div>
            <div className="detail">Base Latency: {audioCTX.baseLatency}</div>
        </div>
        </>
    )
}

export default Details