import React, {useState, useEffect} from 'react'
import './Recorder.css'
import Title from '../Title/Title';

const Recorder = ({audioCTX, index, handleUtilSelection}) => {
    const [stream, setStream] = useState(null)
    const [recordedBlob, setRecordedBlob] = useState(null)
    const [recorder, setRecoreder] = useState(null)
    const [isRecording, setIsRecording] = useState(false)
    const handleRecState = () => {
        if(!recorder){
            const constraints = {audio:true, video: false}
            navigator.mediaDevices.getUserMedia(constraints)
            .then(stream => {
                setStream(stream)
            })
        }
        if(isRecording && recorder){
            recorder.stop()
        }
        setIsRecording(!isRecording)
    }
    const reset = () => {
        setStream(null)
        setRecoreder(null)
        setIsRecording(false)
        setRecordedBlob(null)
    }
    const renderContent = () => {
        const className = isRecording ? "btn btn-rec recording" : "btn btn-rec"
        const text = isRecording ? "Recording...": "REC"
        if(!recordedBlob){
            // Render Recorder
            return (
                <div className="recorder-wrapper">
                    <input type="range" min={0} max={100} className="input input-mon" />
                    <button 
                    className={className}
                    onClick={() => handleRecState()}
                    >{text}</button>
                </div>
            )
        }
        // Render Player
        return (
            <div>
                <audio className="blob-player" src={recordedBlob.src} controls={true}/>
                <button className="btn btn-reset" onClick={() => reset()}>RESET</button>
            </div>
        )
    }
    useEffect(() => {
        if(stream && recorder && isRecording){
            const data = []
            recorder.start()
            recorder.onstart = e => {
            }
            recorder.onstop = e => {
                let blob = new Blob(data, {type: 'audio/mpeg-3'})
                blob.src = URL.createObjectURL(blob)
                setRecordedBlob(blob)
            }
            recorder.ondataavailable = e => {
                data.push(e.data)
            }
        } else if(stream && !recorder){
            setRecoreder(new MediaRecorder(stream))
        }
    }, [stream, recorder, isRecording])
    return(
        <div className="util">
            <div className="titleWrapper">
                <Title text="RECORDER" index={index} handleUtilSelection={handleUtilSelection}/>
            </div>
            <div className="content-wrapper">
                {renderContent()}
            </div>
        </div>
    )
}

export default Recorder