class Music{
    constructor(){
        
        var audio = new Audio();
        this.autoplay = true;
        this.playing = false;
        this.canPlay = false;
    }
}


audio.src = "/game/Assets/chinese-beat-190047.mp3";
audio.autoplay = true;
audio.playing  = false;
audio.canPlay = false;

addEventListener("keypress", function(){
    console.log("Clicou")
    audio.canPlay = true;
    tryPlayAudio()
})

addEventListener("mousedown", function(){
    console.log("Mexeu")
    audio.canPlay = true;
    tryPlayAudio()
})
function tryPlayAudio(){
    if (audio.canPlay && audio.playing == false){
        console.log("Ta liberado");
        audio.play().then (()=>{
            audio.playing = true;
        })
        
}
}
audio.addEventListener("ended", function(){
    console.log("acabou")
    audio.play()
})
