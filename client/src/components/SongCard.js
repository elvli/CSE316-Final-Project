import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
import Edit from '@mui/icons-material/Edit';
import { resolveBreakpointValues } from '@mui/system/breakpoints';

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [ draggedTo, setDraggedTo ] = useState(0);
    const { song, index } = props;

    function handleDragStart(event) {
        event.dataTransfer.setData("song", index);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let targetIndex = index;
        let sourceIndex = Number(event.dataTransfer.getData("song"));
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveSongTransaction(sourceIndex, targetIndex);
    }
    function handleRemoveSong(event) {
        store.showRemoveSongModal(index, song);
    }
    function handleClick(event) {
        // DOUBLE CLICK IS FOR SONG EDITING
        store.setCurrentSong(index, store.currentList.songs[index]);
        console.log("songIndex: " + store.currentSongIndex)
        if (store.currentSong)
            console.log("songPlaying: " + store.currentSong.title)

    }

    function handleEdit() {
        store.showEditSongModal(index, song)
    }

    let cardClass = "unselected-list-card";
    if (index === store.currentSongIndex) cardClass = "selected-list-card"

    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
            onClick={handleClick}
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <IconButton
                sx={{transform:"translate(-300%, -5%)", width:"5px", height:"30px"}}
                variant="contained"
                id={"edit-song-" + index}
                className="list-card-button"
                onClick={handleEdit}
                color="secondary">
                <Edit/>
            </IconButton>
            <IconButton
                sx={{transform:"translate(100%, -5%)", width:"5px", height:"30px"}}
                variant="contained"
                id={"remove-song-" + index}
                className="list-card-button"
                onClick={handleRemoveSong}
                color="secondary">
                <Close/>
            </IconButton>
        </div>
    );
}

export default SongCard;