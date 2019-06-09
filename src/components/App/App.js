import React, {useState, useEffect} from 'react'
import './App.css'
import StartScreen from '../StartScreen/StartScreen'
import UtilsGrid from '../UtilsGrid/UtilsGrid'

const App = () => {
    const [isStandalone, setIsStandAlone] = useState(false)
    const [audioCTX, setAudioCTX] = useState(null)

    const checkIfStandAlone = () => {
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches ? true : false
        setIsStandAlone(isStandalone)
    }
    const initAudioContext = () => {
        const audioContext = new AudioContext()
        setAudioCTX(audioContext)
    }
    const renderUtilsGrid = () => {
        if(!audioCTX){
            return <StartScreen initAudioContext={initAudioContext}/>
        }
        return <UtilsGrid audioCTX={audioCTX}/>
    }
    const checkForAudioContext = () => {
        if(window.AudioContext || window.webkitAudioContext){
           return renderUtilsGrid()
        }
        return <h4>No Audio Context found</h4>
    }
    useEffect(() => {
        checkIfStandAlone()
    }, [])
    console.log(audioCTX)
    return(
        <>
            <h1>Hello from React</h1>
            {checkForAudioContext()}
        </>
    )
}

export default App