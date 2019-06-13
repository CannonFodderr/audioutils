import React, {useState} from 'react'
import './Oscillator.css'
import Title from '../Title/Title'

const Oscillator = ({audioCTX, index, handleUtilSelection}) => {
    const waveFormsArr = ["sine", "square", "sawtooth", "triangle", "white", "pink"]
    const [noiseNode] = useState(audioCTX.createScriptProcessor(4096, 1, 1))
    const [osc, setOSC] = useState(audioCTX.createOscillator())
    const [freq, setFreq] = useState(1000)
    const [wavForm, setWavForm] = useState('sine')
    const [gainNode] = useState(audioCTX.createGain())
    const [gainValue, setGainValue] = useState(0.3)
    const [isPlaying, setIsPlaying] = useState(false)
    const handleFreqChange = freq => {
        if(freq > 22000){
            freq = 22000
        }
        if(freq < 20){
            freq = 20
        }
        osc.frequency.value = freq
        setFreq(freq)
    }
    const handleGainChange = gainValue => {
        gainNode.gain.setValueAtTime(gainValue / 100, audioCTX.currentTime)
        setGainValue(gainValue / 100)
    }
    const handleWavFormChange = newWavForm => {
        osc.disconnect()
        noiseNode.disconnect()
        setOSC(audioCTX.createOscillator())
        setIsPlaying(false)
        setWavForm(newWavForm)
    }
    const handlePlayStop = () => {
        if(!isPlaying){
            startOscillator()
        } else {
            stopOscillator()
        }
        setIsPlaying(!isPlaying)
    }
    const debounce = (func, delay) => {
        let timer
        return () => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                func()
            }, delay)
        }
    }
    const oscStartClickHandler = debounce(handlePlayStop, 200)
    const playSimpleOscType = () => {
        noiseNode.disconnect()
        gainNode.gain.value = gainValue
        osc.type = wavForm
        osc.frequency.setValueAtTime(freq, audioCTX.currentTime)
        gainNode.gain.linearRampToValueAtTime(gainValue, audioCTX.currentTime + 0.2)
        osc.connect(gainNode)
        gainNode.connect(audioCTX.destination)
        osc.start();
    }
    const whiteNoiseGenerator = () => {
        let bufferSize = 4096;
        audioCTX.createScriptProcessor(bufferSize, 1, 1);
        audioCTX.createScriptProcessor(bufferSize, 1, 1);
        noiseNode.onaudioprocess = function(e) {
            var output = e.outputBuffer.getChannelData(0);
            for (var i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }
        }
        noiseNode.connect(gainNode)
    }
    const pinkNoiseGenerator = () => {
        let bufferSize = 4096;
        var b0, b1, b2, b3, b4, b5, b6;
        b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
        noiseNode.onaudioprocess = function(e) {
            var output = e.outputBuffer.getChannelData(0);
            for (var i = 0; i < bufferSize; i++) {
                var white = Math.random() * 2 - 1;
                b0 = 0.99886 * b0 + white * 0.0555179;
                b1 = 0.99332 * b1 + white * 0.0750759;
                b2 = 0.96900 * b2 + white * 0.1538520;
                b3 = 0.86650 * b3 + white * 0.3104856;
                b4 = 0.55000 * b4 + white * 0.5329522;
                b5 = -0.7616 * b5 - white * 0.0168980;
                output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
                output[i] *= 0.11; // (roughly) compensate for gain
                b6 = white * 0.115926;
            }
        }
        noiseNode.connect(gainNode)
    }
    const playNoise = () => {
        if(wavForm === "white"){
            whiteNoiseGenerator()
        }
        if(wavForm === "pink"){
            pinkNoiseGenerator()
        }
        gainNode.connect(audioCTX.destination)
        setIsPlaying(true)
    }
    const startOscillator = () => {
        gainNode.gain.linearRampToValueAtTime(gainValue, audioCTX.currentTime + 0.2)
        if(gainNode && osc){
            playSimpleOscType()
        }
    }
    const stopOscillator = () => {
        gainNode.gain.linearRampToValueAtTime(0.001, audioCTX.currentTime + 0.2)
        noiseNode.disconnect()
        if(wavForm === "white" || wavForm === "pink") return noiseNode.disconnect()
        setTimeout(() => {
            osc.disconnect()
            setOSC(audioCTX.createOscillator())
        }, 200)
    }
    const renderWaveFormsList = () => {
        return waveFormsArr.map(wavform => {
            const className = wavform === wavForm ? "btn btn-selected" : "btn"
            return(
                <button key={wavform} className={className} id={wavform} onClick={(e) => {handleWavFormChange(e.target.id)}}>{wavform}</button>      
            )
        })
    }
    const buttonText = isPlaying ? "◻" : "►"
    const checkIfInitialized = () => {
        if(!osc || !gainNode) return null
        return(
            <div className="util">
                <div className="utilControl">
                    <div className="title-wrapper">
                        <Title text="OSC" index={index} handleUtilSelection={handleUtilSelection}/>
                        <button 
                        className="btn play-stop-btn" 
                        onClick={() => {
                            if(wavForm === "white" || wavForm === "pink"){
                                playNoise()
                            } else {
                                oscStartClickHandler()
                            }
                        }}
                        >{buttonText}</button>
                    </div>
                </div>
                <div className="utilControl freqControl">
                    <label htmlFor="freqInput">Frequncy: </label>
                    <input 
                    className="freqInput"
                    id="freqInput"
                    type="number" 
                    min={20} 
                    max={22000} 
                    placeholder="Frequency" 
                    value={freq} 
                    onChange={(e) => {handleFreqChange(e.target.value)}}
                    />
                    <input type="range" min={20} max={22000} value={freq}
                    className="input freq-input"
                    step={1}
                    onChange={(e) => {handleFreqChange(e.target.value)}}
                    />
                </div>
                <div className="utilControl gainControl">
                    <label htmlFor="gainInput">Gain:</label>
                    <input 
                    className="input gain-input"
                    id="gain-input"
                    type="range" 
                    min={0} 
                    max={100} 
                    value={gainValue * 100} 
                    onChange={(e) => {handleGainChange(e.target.value)}}
                    />
                </div>
                
                <div className="utilControl waveformsControl">
                    {renderWaveFormsList()}                                    
                </div>
            </div>
        )
    }
    return (
        <>
            {checkIfInitialized()}
        </>
    )
}
export default Oscillator