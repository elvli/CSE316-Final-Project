import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Accordian from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import Grid from '@mui/material/Grid';
import * as React from 'react';
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;

    store.history = useHistory();

    const handleChange = () => (event) => {
        if (store.currentList){
            if (store.currentList._id == idNamePair._id) store.closeCurrentList()
        }
        else handleLoadList(event, idNamePair._id)
    };
    
    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    //  CONTROLLED ACCORDIAN HANDLER
    let open = false
    if (store.currentList){
        if (store.currentList._id == idNamePair._id) open = true
        else open = false
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    
    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    let songListJSX = ""
    if (store.currentList != null) {
        songListJSX = 
            <Box id="list-selector-list">
                <List id="playlist-cards" sx={{overflow: 'scroll', overflowX: "hidden", height: '100%', width: '100%', bgcolor: '#8000F00F'}}>
                    {store.currentList.songs.map((song, index) => (
                        <SongCard
                            id={'playlist-song-' + (index)}
                            key={'playlist-song-' + (index)}
                            index={index}
                            song={song}
                        />
                    ))}
                </List>            
                {modalJSX}
            </Box>
    }

    let cardElement =
        //  SONG CARD ACCORDIAN
        <Accordian 
            expanded={open} 
            onChange={handleChange()} 
            elevation={3}
            disableGutters={true}
            sx={{borderRadius:"25px", margin: "20px", mt: '10px'}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box
                    id={idNamePair._id}
                    key={idNamePair._id}
                    sx={{borderRadius:"25px", p: "10px", bgcolor: '#FFFFFF', marginTop: '10px', display: 'flex', p: 1 }}
                    style={{transform:"translate(1%,0%)", width: '98%', fontSize: '48pt' }}
                    button
                    // onClick={(event) => {
                    //     handleLoadList(event, idNamePair._id)
                    // }}
                    >
                    <Box component="div" sx={{ p: 0, flexGrow: 1}}>{idNamePair.name}</Box>
                    <Box sx={{ p: 0 }}>
                        <IconButton onClick={handleToggleEdit} aria-label='edit'>
                            <EditIcon style={{fontSize:'32pt'}} />
                        </IconButton>
                    </Box>
                    <Box sx={{ p: 0 }}>
                        <IconButton onClick={(event) => {
                            handleDeleteList(event, idNamePair._id)
                            }} aria-label='delete'>
                            <DeleteIcon style={{fontSize:'32pt'}} />
                        </IconButton>
                    </Box>
                </Box>
            </AccordionSummary>

            {/* PLAYLIST LIST AND EDITING BUTTONS */}

            <AccordionDetails>
                <Grid Container overflow='hidden'>
                    <Grid item xs={12} overflow='hidden' height='400px' style={{transform:"translate(0%,-10%)"}}>
                        {songListJSX}
                    </Grid>

                    {/* EDITING BUTTONS */}

                    <Grid item xs={10}>
                        
                    </Grid>

                    {/* LIST MANIPULATION BUTTONS */}

                    <Grid item xs={2}>
                        <IconButton onClick={handleToggleEdit} aria-label='edit'>
                            <EditIcon style={{fontSize:'32pt'}} />
                        </IconButton>
                        <IconButton onClick={handleToggleEdit} aria-label='edit'>
                            <EditIcon style={{fontSize:'32pt'}} />
                        </IconButton>
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordian>

    if (editActive) {
        cardElement =            
            <TextField
                margin="normal"
                required
                
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
                variant='filled'
                color='secondary'
                sx={{p:1}}
            />
    }
    return (
        cardElement
    );
}

export default ListCard;