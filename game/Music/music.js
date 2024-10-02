class Music{
    constructor(){
        
        const audio = new Audio();
        this.audio = audio
        this.audio.autoplay = true;
        this.playing = false;
        this.canPlay = false;
        this.isMuted = false
        this.currentSrc = 2

        

        this.musics = [
            "/game/Assets/Musics/chinese-beat-190047.mp3",
            "/game/Assets/Musics/chinese-ancient-style-music.mp3",
            "/game/Assets/Musics/redSunInTheSkyLoopVer.mp3",
            "/game/Assets/Musics/doorEntering.mp3",
            "/game/Assets/Musics/forkHit.mp3",
            "/game/Assets/Musics/jump.mp3",
            "/game/Assets/Musics/stickHit.mp3",
            "game/Assets/Musics/stickBreaking.mp3"
        ]

        this.loopGameMusics = [
            "/game/Assets/Musics/chinese-beat-190047.mp3",
            "/game/Assets/Musics/chinese-ancient-style-music.mp3",
            "/game/Assets/Musics/redSunInTheSkyLoopVer.mp3"
        ]

        this.loseSocCred = [
            "./Assets/Musics/loseSocialCreditsSFX/loseSocialCredits1.mp3",
            "./Assets/Musics/loseSocialCreditsSFX/loseSocialCredits2.mp3",
            "./Assets/Musics/loseSocialCreditsSFX/loseSocialCredits3.mp3",
            "./Assets/Musics/loseSocialCreditsSFX/loseSocialCredits4.mp3",
            "./Assets/Musics/loseSocialCreditsSFX/loseSocialCredits5.mp3",
            "./Assets/Musics/loseSocialCreditsSFX/loseSocialCredits6.mp3",
            "./Assets/Musics/loseSocialCreditsSFX/loseSocialCredits7.mp3"
        ]

        this.loseSocCredIndex = 0
        this.audio.src = this.loopGameMusics[2];
    }

    playSocCredLooseSound(){
        if (this.loseSocCredIndex == this.loseSocCred.length){
            this.loseSocCredIndex = 0
        }
        else{
            this.loseSocCredIndex += 1
        }
        this.audio.src = this.loseSocCred[this.loseSocCredIndex]
        this.audio.play()
    }

    tryPlayAudio(){
        // console.log("Aqui")
        // console.log(this.canPlay)
        // console.log(this.playing)
        if (this.canPlay && this.playing == false && this.isMuted == false){
            //console.log("Ta liberado");
            this.audio.play().then (()=>{
                //console.log("foi")
                this.playing = true;
            }).catch((error) => {
                console.error("Erro ao tentar reproduzir o áudio:", error);
            });
            
        }
        else if(this.isMuted){
            this.stopAudio()
        }
    }

    nextSong(){
        if (this.currentSrc == (this.loopGameMusics.length) - 1){
            this.currentSrc = 0
        }
        else{
            console.log("aumentou")
            this.currentSrc += 1
        }
        this.audio.src = this.loopGameMusics[this.currentSrc]
        this.playing = false
    }

    playSong(){
        this.audio.play()
    }

    playNextBackground(){
        if (this.canPlay && this.playing == false && this.isMuted == false){
            //console.log("Ta liberado");
            this.audio.play().then (()=>{
                //console.log("foi")
                this.playing = true;
            }).catch((error) => {
                console.error("Erro ao tentar reproduzir o áudio:", error);
            })

        }
        
        else if(this.isMuted){
            this.stopAudio()
        }
        
        else{
            if (! this.isMuted){
                this.audio.pause()
                this.audio.play().then (()=>{
                    //console.log("foi")
                    this.playing = true;
                }).catch((error) => {
                    console.error("Erro ao tentar reproduzir o áudio:", error);
                })
            }
            
        }
    }

    changeSong(index){
        this.audio.src = this.loopGameMusics[index]
        //console.log(this.audio.src)
    }

    changeState(){
        if (this.isMuted){
            this.isMuted = false
        }
        else{
            this.isMuted = true
        }
    }

    changeInd(ind){
        this.audio.src = this.musics[ind]
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

