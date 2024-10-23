class Music{
    constructor(){
        
        const audio = new Audio();
        this.audio = audio;
        this.audio.autoplay = true;
        this.playing = false;
        this.canPlay = false;
        this.isMuted = false;

        this.currentSrc = 2;
        this.loseSocCredIndex = 0;
        this.audio.src = "./Assets/Musics/noMusic10s.mp3";
        
        this.musics = [
            "/game/Assets/Musics/chinese-beat-190047.mp3",
            "/game/Assets/Musics/chinese-ancient-style-music.mp3",
            "/game/Assets/Musics/redSunInTheSkyLoopVer.mp3",
            "/game/Assets/Musics/doorEntering.mp3",
            "/game/Assets/Musics/forkHit.mp3",
            "/game/Assets/Musics/jump.mp3",
            "/game/Assets/Musics/stickHit.mp3",
            "/game/Assets/Musics/stickBreaking.mp3",
            "/game/Assets/Musics/lingDiying.mp3",
            "/game/Assets/Musics/gainSocialCredits.mp3"
        ]

        this.loopGameMusics = [
            "/game/Assets/Musics/chinese-ancient-style-music.mp3",
            "/game/Assets/Musics/backgroundSound1.mp3",
            "/game/Assets/Musics/backgroundSound2.mp3",
            "/game/Assets/Musics/backgroundSound3.mp3"
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

        this.bossMusic = [
            "./Assets/Musics/redSunInTheSkyLoopVer.mp3"
        ]

        
    }

    playSocCredLooseSound(){
        if (this.loseSocCredIndex == this.loseSocCred.length){
            this.loseSocCredIndex = 0;
        }
        else{
            this.loseSocCredIndex += 1;
        }
        this.audio.src = this.loseSocCred[this.loseSocCredIndex];
        this.audio.play();
    }

    tryPlayAudio(){
        if (this.canPlay && this.playing == false && this.isMuted == false){
            this.audio.play().then (()=>{
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
            this.currentSrc += 1
        }
        this.audio.src = this.loopGameMusics[this.currentSrc]
        this.playing = false
    }

    playSong(){
        if (this.playing == false){
            this.audio.play();
            this.playing = true;
        }

        
    }

    playNextBackground(){
        if (this.canPlay && this.playing == false && this.isMuted == false){
            this.audio.play().then (()=>{
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

                    this.playing = true;
                }).catch((error) => {
                    console.error("Erro ao tentar reproduzir o áudio:", error);
                })
            }
            
        }
    }

    changeSong(index){
        this.audio.src = this.loopGameMusics[index]
    }

    playBossMusic(){
        this.audio.src = this.bossMusic[0]
        this.audio.play()
    }

    bossLevel(){
        this.audio.src = this.bossMusic[0]
    }

    changeState(){
        if (this.isMuted){
            this.isMuted = false
            this.nextSong()
            this.playNextBackground()
        }
        else{
            this.isMuted = true
        }
    }

    changeInd(ind){
        this.audio.src = this.musics[ind]
    }

    stopAudio() {
        if (this.playing) {
            this.audio.pause();
            this.audio.currentTime = 0;
            this.playing = false;
        }
    }

}

