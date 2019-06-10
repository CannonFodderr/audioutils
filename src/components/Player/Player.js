import React, {useState, useRef} from 'react'
import './Player.css'

const Player = ({audioCTX}) => {
    const [audioSource, setAudioSource] = useState(null)
    const filePickerRef = useRef(null)
    const audioPlayerRef = useRef(null)
    const renderAudioPlayer = () => {
        if(!audioSource) return <audio 
        controls={true} 
        ref={audioPlayerRef} 
        className="audio-player"
        />
        return (
            <audio controls={true} ref={audioPlayerRef} className="audio-player" src={URL.createObjectURL(audioSource)} loop={false} />
        )
    }
    const handleLoadButtonClick = () => {
        filePickerRef.current.click()
    }
    const handleFileUnload = () => {
        audioPlayerRef.current.pause()
        audioPlayerRef.current.src = null
        setAudioSource(null)
    }
    const handleFileLoad = () => {
        setAudioSource(filePickerRef.current.files[0])
    }
    const renderLoadUload = () => {
        if(!audioSource) return <button 
        className="btn btn-load"
        onClick={() => {handleLoadButtonClick()}}
        >LOAD</button>
        return <button 
        className="btn btn-unload"
        onClick={() => {handleFileUnload()}}
        >UNLOAD</button>
    }
    return(
        <>
            <div className="util">
                <div className="utilControl playerControl">
                    <div className="title">Player</div>
                    {renderLoadUload()}
                    {renderAudioPlayer()}
                    <input 
                    className="filePicker" 
                    ref={filePickerRef} type="file" 
                    hidden={true} 
                    accept="audio/*"
                    onChange={() => {handleFileLoad()}}
                    />
                </div>
            </div>
        </>
    )
}
export default Player

