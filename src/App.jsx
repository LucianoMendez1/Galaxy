import './App.css';
import Home from './components/home/Home';
import  {useState} from 'react'
import Context from "./components/context/Context"
import WaveAudio from './components/assets/waveAudio/WaveAudio';


function App() {

  const [audioActive, setAudioActive] = useState(true)

  const changeAudio = () => {
    setAudioActive(!audioActive)
  }



  return (
    
    <Context.Provider value={{audioActive, setAudioActive , changeAudio }}>
      <div className="App" id='app'>
        <Home/>
        <div className="audioChange" onClick={() => changeAudio()}>
          <WaveAudio/>
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
