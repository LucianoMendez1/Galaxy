import  {useEffect, useContext, useRef} from 'react'
import Context from '../../context/Context'
import ambientAudio from "../../home/src/audio/ambient1.mp3"

const AmbientAudio = () => {
    const ContextAudio = useContext(Context)
    const audioAmbiente = useRef()

    useEffect(() => {
        if(ContextAudio.audioActive){
            audioAmbiente.current.play()
            audioAmbiente.current.volume= .7
          }else{
            audioAmbiente.current.pause()
          }


    },[ContextAudio.audioActive])
  return (
    <audio ref={audioAmbiente} src={ambientAudio} autoPlay loop></audio>
  )
}



export default AmbientAudio