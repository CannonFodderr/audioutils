import React, {useState, useRef} from 'react'
import './Player.css'

const Player = ({audioCTX}) => {
    const [audioSource, setAudioSource] = useState(null)
    const [isLooping, setIsLooping] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const filePickerRef = useRef(null)
    const audioPlayerRef = useRef(null)
    const renderAudioPlayer = () => {
        if(!audioSource) return <audio 
        controls={true} 
        ref={audioPlayerRef} 
        className="audio-player"
        loop={isLooping}
        muted={isMuted}
        />
        return (
            <audio controls={true} ref={audioPlayerRef} className="audio-player" src={URL.createObjectURL(audioSource)} loop={isLooping} muted={isMuted}/>
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
    const handleLoopChange = () => {
        setIsLooping(!isLooping)
    }
    const handleMuteChange = () => {
        setIsMuted(!isMuted)
    }
    const renderControls = () => {
        const loopClass = isLooping ? "btn btn-selected btn-loop" : "btn btn-loop"
        const muteClass = isMuted ? "btn btn-selected btn-mute" : "btn btn-mute"
        return(
            <div className="utilControl player-contols">
                <button className={loopClass} onClick={() => handleLoopChange()}>Loop</button>
                <button className={muteClass} onClick={() => handleMuteChange()}>Mute</button>
            </div>
        )
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
                {renderControls()}
            </div>
        </>
    )
}
export default Player

