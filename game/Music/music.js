class Music{
    constructor(){
        
        const audio = new Audio();
        this.audio = audio
        this.audio.autoplay = true;
        this.audio.playing = false;
        this.audio.canPlay = false;

        this.audio.src = "/game/Assets/chinese-beat-190047.mp3";

        this.musics = [
            "/game/Assets/chinese-beat-190047.mp3",
            "/game/Assets/chinese-ancient-style-music.mp3"

        ]

    }



    tryPlayAudio(){
        console.log("Aqui")
        if (this.audio.canPlay && this.audio.playing == false){
            console.log("Ta liberado");
            this.audio.play().then (()=>{
                console.log("foi")
                this.audio.playing = true;
            }).catch((error) => {
                console.error("Erro ao tentar reproduzir o áudio:", error);
            });
            
    }
    }

    changeSong(index){
        this.audio.src = this.musics[index]
        console.log(this.audio.src)
    }

    stopAudio() {
        console.log("Tentou parar")
        console.log(this.audio.playing)
        if (this.audio.playing) {
            this.audio.pause();
            this.audio.currentTime = 0;
            this.playing = false;
            console.log("Música parada");
        }
    }

    
}

