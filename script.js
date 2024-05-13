console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Ek Main Aur Ek Tu", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Ve Kamleya", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Mere Sapno Ki Rani ", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Chanda Hai Tu Mera Suraj Hai Tu", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Ek Sanam Chahiye Aashiqui Ke Liye", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Dil Hai Ki Manta Nahin", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=6){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 6;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
//mute button
document.addEventListener("DOMContentLoaded", function() {
    const volumeSlider = document.getElementById("volumeSlider");
    const muteButton = document.getElementById("muteButton");
    volumeSlider.addEventListener("input", function() {
      audioElement.volume = this.value / 100;
    });
    
    // Add event listener to mute button
    muteButton.addEventListener("click", function() {
      // Toggle mute/unmute state
      // Replace 'audioElement' with your actual audio or video element
      audioElement.muted = !audioElement.muted;
      
      // Toggle Font Awesome icon class based on mute state
      const icon = muteButton.querySelector("i");
      if (audioElement.muted) {
        icon.classList.remove("fa-volume-xmark");
        icon.classList.add("fa-volume-mute");
      } else {
        icon.classList.remove("fa-volume-mute");
        icon.classList.add("fa-volume-xmark");
      }
    });
  });
  