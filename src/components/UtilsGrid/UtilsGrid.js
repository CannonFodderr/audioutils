import React, {useState} from 'react'
import './UtilsGrid.css'
import Oscillator from '../Oscillator/Oscillator'
import Player from '../Player/Player'
import Recorder from '../Recorder/Recorder'

const UtilsGrid = ({audioCTX, utilsLayout, updateUtilsLayout}) => {
    const [selectedUtil, setSelectedUtil] = useState(null)
    const [replacePosition, setReplacePosition] = useState(null)
    const handleUtilSelection = (value) => {
        if(!selectedUtil && !replacePosition){
            console.log("Update 1", value)
            setSelectedUtil(value)
        }
        if(selectedUtil && value !== selectedUtil && value !== null){
            console.log("Update 2", value)
            setReplacePosition(value)
        }
        if(selectedUtil >= 0 && replacePosition && value === null){
            let newLayout = [...utilsLayout]
            let util = newLayout[selectedUtil]
            let util2 = newLayout[replacePosition]
            newLayout[selectedUtil] = util2
            newLayout[replacePosition] = util
            updateUtilsLayout(newLayout)
            setSelectedUtil(null)
            setReplacePosition(null)
        }
    }
    const renderUtilsLayout = () => {
        if(!utilsLayout || utilsLayout.length < 1) return <div>No components selected</div>
        return utilsLayout.map((util, index) => {
            switch(util){
                case "osc": 
                    return <Oscillator key={index} audioCTX={audioCTX} index={index} handleUtilSelection={handleUtilSelection}/>
                case "player": 
                    return <Player key={index} audioCTX={audioCTX} index={index} handleUtilSelection={handleUtilSelection}/>
                case "recorder" : 
                    return <Recorder key={index} audioCTX={audioCTX} index={index}handleUtilSelection={handleUtilSelection}/>
                default: return null
            }
        })
    }
    console.log(selectedUtil, replacePosition)
    return (
        <>
        <div className="utilsGrid">
            {renderUtilsLayout()}
        </div>
        </>
    )
}
export default UtilsGrid