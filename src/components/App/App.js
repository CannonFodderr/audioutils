import React, {useState, useEffect} from 'react'
import './App.css'
import StartScreen from '../StartScreen/StartScreen'
import Details from '../Details/Details'
import UtilsGrid from '../UtilsGrid/UtilsGrid'

const App = () => {
    const [isStandalone, setIsStandAlone] = useState(false)
    const [audioCTX, setAudioCTX] = useState(null)
    const [utilsLayout, setUtilsLayout] = useState(["osc","osc", "player", "recorder"])

    const checkIfStandAlone = () => {
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches ? true : false
        setIsStandAlone(isStandalone)
    }
    const updateUtilsLayout = newLayout => {
        if(!newLayout) return
        setUtilsLayout(newLayout)
    }
    const initAudioContext = () => {
        const audioContext = new AudioContext()
        setAudioCTX(audioContext)
    }
    const renderUtilsGrid = () => {
        if(!audioCTX){
            return <StartScreen initAudioContext={initAudioContext}/>
        }
        return (
            <>
                <Details audioCTX={audioCTX}/>
                <UtilsGrid audioCTX={audioCTX} utilsLayout={utilsLayout} updateUtilsLayout={updateUtilsLayout}/>
            </>
        )
            
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
    return(
        <>
            {checkForAudioContext()}
        </>
    )
}

export default App