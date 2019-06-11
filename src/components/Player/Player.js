import React, {useState, useRef, useEffect} from 'react'
import './Player.css'

const Player = () => {
    const [currentTime, setCurrentTIme] = useState(0)
    const [playerGain, setPlayerGain] = useState(0.5)
    const [audioSource, setAudioSource] = useState(null)
    const [audioDuration, setAudioDuration] = useState(null)
    const [isLooping, setIsLooping] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const filePickerRef = useRef(null)
    const audioPlayerRef = useRef(null)
    const handleMetaData = () => {
        if(!audioDuration){
            setAudioDuration(audioPlayerRef.current.duration)
        }
    }
    const handlePlay = () => {
        setIsPlaying(!isPlaying)
    }
    const renderAudioPlayer = () => {
        if(!audioSource) return <audio 
        controls={false} 
        ref={audioPlayerRef} 
        className="audio-player"
        loop={isLooping}
        muted={isMuted}
        />
        return (
            <audio controls={false} ref={audioPlayerRef} className="audio-player" src={URL.createObjectURL(audioSource)} loop={isLooping} muted={isMuted} onLoadedMetadata={() => handleMetaData()}
            />
        )
    }
    const handleLoadButtonClick = () => {
        filePickerRef.current.click()
    }
    const handleFileUnload = () => {
        setIsPlaying(false)
        setAudioSource(null)
        setAudioDuration(null)
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
        if(!audioSource || !audioDuration) return null;
        const loopClass = isLooping ? "btn btn-selected btn-loop" : "btn btn-loop"
        const muteClass = isMuted ? "btn btn-selected btn-mute" : "btn btn-mute"
        const playClass = isPlaying ? "btn btn-selected btn-play" : "btn btn-play"
        const playText = !isPlaying ? "PLAY" : "STOP"
        return(
            <div className="utilControl player-contols">
                <button className={playClass} onClick={(e) => handlePlay(e)}>{playText}</button>
                <button className={loopClass} onClick={() => handleLoopChange()}>LOOP</button>
                <button className={muteClass} onClick={() => handleMuteChange()}>MUTE</button>
            </div>
        )
    }
    const handleSeeking = newTime => {
        audioPlayerRef.current.currentTime = newTime
        setCurrentTIme(audioPlayerRef.current.currentTime)
    }
    const renderRangeSeeker = () => {
        if(!audioSource || !audioDuration) return null
        return(
            <div>
                <label htmlFor="seeker-input">Start</label>
                <input 
                type="range" 
                min={0} 
                max={audioDuration}
                name="seeker-input"
                defaultValue={0}
                className="input seeker-input"
                onMouseUp={(e) => handleSeeking(e.target.value)}
                step={1}
                />
                <span>{currentTime}</span>
            </div>
        )
    }
    const handleGainChange = newGain => {
        audioPlayerRef.current.volume = newGain
        
    }
    const renderPlayerGain = () => {
        if(!audioSource || !audioDuration) return null
        return(
            <div>
                <input 
                type="range" 
                min={0} 
                max={100}
                defaultValue={50}
                className="input gain-input"
                onChange={(e) => handleGainChange(e.target.value / 100)}
                onMouseUp={() => setPlayerGain(audioPlayerRef.current.volume)}
                />
            </div>

        )
    }
    useEffect(() => {
        if(isPlaying){
            audioPlayerRef.current.currentTime = currentTime
            audioPlayerRef.current.volume = playerGain
            audioPlayerRef.current.loop = isLooping
            audioPlayerRef.current.muted = isMuted
            audioPlayerRef.current.play()
        } else {
            audioPlayerRef.current.currentTime = currentTime
            audioPlayerRef.current.volume = playerGain
            audioPlayerRef.current.loop = isLooping
            audioPlayerRef.current.muted = isMuted
            audioPlayerRef.current.pause()
        }
    })
    return(
        <>
            <div className="util">
                <div className="utilControl playerControl">
                    <div className="title-wrapper">
                        <div className="title">PLAYER</div>
                        {renderLoadUload()}
                    </div>
                    {renderAudioPlayer()}
                    <input 
                    className="filePicker" 
                    ref={filePickerRef} type="file" 
                    hidden={true} 
                    accept="audio/*"
                    onChange={() => {handleFileLoad()}}
                    />
                </div>
                {renderRangeSeeker()}
                {renderPlayerGain()}
                {renderControls()}
            </div>
        </>
    )
}
export default Player

