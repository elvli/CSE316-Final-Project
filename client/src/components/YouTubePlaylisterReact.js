import React, { useContext, useEffect } from 'react'
import YouTube from 'react-youtube';
import { GlobalStoreContext } from '../store/index.js'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Pause from '@mui/icons-material/Pause';

export default function YouTubePlayerExample() {
    const { store } = useContext(GlobalStoreContext);

    let eventTarget = null;

    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    let playlist = [
        "2S24-y0Ij3Y",
        "b73BI9eUkjM",
        "wXhTHyIgQ_U",
        "ytQ5CYE1VZw",
        "kXYiU_JCYtU"
    ];

    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    let currentSong = 0;

    const playerOptions = {
        height: '360',
        width: '585',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        let song = playlist[currentSong];
        player.loadVideoById(song);
        player.playVideo();
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        currentSong++;
        console.log("incindex: " + currentSong);
        currentSong = currentSong % playlist.length;
    }

    // THIS FUNCTION DECREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function decSong() {
        currentSong--;
        if (currentSong < 0) {currentSong = playlist.length - 1}
        console.log("index: " + currentSong);
        currentSong = currentSong % playlist.length;
    }

    function onPlayerReady(event) {
        eventTarget = event.target
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
    }

    const handlePrevious = () => {
        console.log("handlePrevious")
        decSong();
        loadAndPlayCurrentSong(eventTarget);
    }
    const handlePause = () => {
        eventTarget.pauseVideo();
    }
    const handlePlay = () => {
        eventTarget.playVideo();
    }
    const handleNext = () => {
        incSong();
        loadAndPlayCurrentSong(eventTarget);
    }
    
    let playlistName = "Playlist";
    if (store.CurrentList != null) {
        playlist = store.currentList.name
    }

    let title = "Title";
    if (store.currentSong != null) {
        title = store.currentSong.title
    };

    let artist = "Artist";
    if (store.currentSong != null) {
        artist = store.currentSong.artist
    };
    
    let infoCard = 
        <Card elevation={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h4">
                        Playlist: {playlistName}
                    </Typography>
                    <Typography component="div" variant="h5">
                        Title: {playlist[currentSong]}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Artist: {artist}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Song: {currentSong + 1}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', m: 'auto' ,pl: 1, pb: 1}}>                                
                    <IconButton onClick={handlePrevious} aria-label="previous" color= 'secondary'>
                        <SkipPreviousIcon sx={{height: 38, width: 38 }} />
                    </IconButton>
                    <IconButton onClick={handlePause} aria-label="pause" color= 'secondary'>
                        <Pause sx={{ height: 38, width: 38 }} />
                    </IconButton>
                    <IconButton onClick={handlePlay} aria-label="play/pause" color= 'secondary'>
                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                    </IconButton>
                    <IconButton onClick={handleNext} aria-label="next" color= 'secondary'>
                        <SkipNextIcon sx={{ height: 38, width: 38 }} />
                    </IconButton>
                </Box>
            </Box>
        </Card>

    return <>
            <YouTube
            videoId={playlist[currentSong]}
            opts={playerOptions}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange} />
            {infoCard}
        </>
}
