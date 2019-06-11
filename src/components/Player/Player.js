import React, {useState, useRef, useEffect} from 'react'
import './Player.css'

const Player = ({audioCTX}) => {
    const [currentTime, setCurrentTIme] = useState(0)
    const [playerGain, setPlayerGain] = useState(0.5)
    const [audioSource, setAudioSource] = useState(null)
    const [audioDuration, setAudioDuration] = useState(null)
    const [isLooping, setIsLooping] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const filePickerRef = useRef(null)
    const audioPlayerRef = useRef(null)
    const seekerRef = useRef(null)
    const handleMetaData = () => {
        if(!audioDuration){
            setAudioDuration(audioPlayerRef.current.duration)
        }
    }
    const handlePlay = () => {
        if(isPlaying){
            setCurrentTIme(audioPlayerRef.current.currentTime)
            setPlayerGain(audioPlayerRef.current.volume)
        }
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
        filePickerRef.current.value = ""
        audioPlayerRef.current.currentTime = 0
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
        const muteClass = audioPlayerRef.current.muted ? "btn btn-selected btn-mute" : "btn btn-mute"
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
        if(!isPlaying){
            audioPlayerRef.current.currentTime = newTime
        } else {
            audioPlayerRef.current.currentTime = newTime
            setCurrentTIme(audioPlayerRef.current.currentTime)
        }
        
    }
    const renderRangeSeeker = () => {
        if(!audioSource || !audioDuration) return null
        return(
            <div>
                <label htmlFor="seeker-input">Start</label>
                <input 
                ref={seekerRef}
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
        if(!isPlaying){
            setPlayerGain(newGain)
        }
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
                />
            </div>

        )
    }
    useEffect(() => {
        if(isPlaying){
            seekerRef.current.currentTime = currentTime
            audioPlayerRef.current.currentTime = currentTime
            audioPlayerRef.current.volume = playerGain
            audioPlayerRef.current.play()
            let timer = setInterval(() => {
                seekerRef.current.value = audioPlayerRef.current.currentTime
            }, 1000)
            return () => {
                clearInterval(timer)
            }
        } else {
            audioPlayerRef.current.currentTime = currentTime
            audioPlayerRef.current.volume = playerGain
            audioPlayerRef.current.loop = isLooping
            audioPlayerRef.current.muted = isMuted
            audioPlayerRef.current.pause()
        }
    }, [isPlaying, currentTime, isLooping, isMuted])
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

