const changeSound = (audioActive) => {

    const soundAmbient = document.querySelector(".soundAmbient")

    if(audioActive){
        soundAmbient.play()
        soundAmbient.volume= 0.03
      }else{
        soundAmbient.pause()
      }
}

export default changeSound;