class Music{
    constructor(){
        
        const audio = new Audio();
        this.audio = audio
        this.audio.autoplay = true;
        this.playing = false;
        this.canPlay = false;

        this.audio.src = "/game/Assets/Musics/chinese-beat-190047.mp3";

        this.musics = [
            "/game/Assets/Musics/chinese-beat-190047.mp3",
            "/game/Assets/Musics/chinese-ancient-style-music.mp3"

        ]

    }



    tryPlayAudio(){
        // console.log("Aqui")
        // console.log(this.canPlay)
        // console.log(this.playing)
        if (this.canPlay && this.playing == false){
            //console.log("Ta liberado");
            this.audio.play().then (()=>{
                //console.log("foi")
                this.playing = true;
            }).catch((error) => {
                console.error("Erro ao tentar reproduzir o áudio:", error);
            });
            
    }
    }

    changeSong(index){
        this.audio.src = this.musics[index]
        //console.log(this.audio.src)
    }

    stopAudio() {
        //console.log("Tentou parar")
        //console.log(this.playing)
        if (this.playing) {
            this.audio.pause();
            this.audio.currentTime = 0;
            this.playing = false;
            //console.log("Música parada");
        }
    }

    
}

