import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import PlaylistAdd from '@mui/icons-material/PlaylistAdd';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import YouTubePlayerExample from './YouTubePlaylisterReact';
import CommentsTab from './CommentsTab'
import Home from '@mui/icons-material/Home';
import Groups from '@mui/icons-material/Groups';
import Person from '@mui/icons-material/Person';
import Sort from '@mui/icons-material/Sort';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import playlisterLogo from './images/playlisterLogo.png';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [value, setValue] = React.useState(0)
    const [anchorEl, setAnchorEl] = useState(null);
    const [sortBy, setSortBy] = useState(-1);
    const isMenuOpen = Boolean(anchorEl);

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
            </div>
        );
    }
      
    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };
      
    let isGuest = false;
    if (auth.user && auth.user.email == "guest@gmail.com") isGuest = true;

    const handleChangeTab = (event, val) => {
        setValue(val)
    }

    const handleHouseClick = () => {
        store.closeCurrentList();
    }

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // THESE ARE THE HANDLERS FOR THE SORT MENU
    const handleSortName = () => {
        setSortBy(0);
        handleMenuClose();
    }
    const handleSortPublishDate = () => {
        setSortBy(1);
        handleMenuClose();
    }
    const handleSortListens = () => {
        setSortBy(2);
        handleMenuClose();
    }
    const handleSortLikes = () => {
        // setSortBy(3);
        console.log(store.currentList);
        console.log("PPPP:"+store.currentList.published)
        handleMenuClose();
    }
    const handleSortDislikes = () => {
        // setSortBy(4);
        // let playlists = store.getAllPlaylists();
        // console.log(store.getAllPlaylists()[1])
        // // let list = playlists[0]
        // console.log(playlists[1])
        handleMenuClose();
    }

    // THIS SWITCH CASE SORTS THE PLAYLISTS
    let sortedList = 
        store.idNamePairs.map((pair) => (
            <ListCard
                key={pair._id}
                idNamePair={pair}
                selected={false}
            />
        ));

    switch(sortBy){
        case 0:
            sortedList = 
                store.idNamePairs.sort((a, b) => 
                    a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1)
                    .map((pair) => (
                        <ListCard
                            key={pair._id}
                            idNamePair={pair}
                            selected={false}
                        />
                ));
            break;
        case 1:
            // let playlists = store.getAllPlaylists();

            // sortedList = 
            //     playlists.sort((a, b) =>
            //         a.up
            //     );
            break;
        default:
            break;
    }

    let text ="";
    if (auth.loggedIn && store.currentList){
        text = store.currentList.name;
    }
    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }

    let listCard = "";
    if (store) {
        listCard = 
            <Grid container sx={{p: 0}}>
                <Grid item xs={10} bgcolor='#f397ff'>
                    <IconButton href='/' disabled={isGuest} onClick={handleHouseClick} sx={{ textDecoration: 'none', color: 'black', height: 60, width: 60 }} aria-label="home" title="Home">
                        <Home sx={{fontSize:'32pt'}}/>
                    </IconButton>
                    <IconButton href='/' onClick={handleHouseClick} sx={{ textDecoration: 'none', color: 'black', height: 60, width: 60 }} aria-label="Groups" title="Groups">
                        <Groups sx={{fontSize:'32pt'}}/>
                    </IconButton>
                    <IconButton href='/' onClick={handleHouseClick} sx={{ textDecoration: 'none', color: 'black', height: 60, width: 60 }} aria-label="{Person}" title="Person">
                        <Person sx={{fontSize:'32pt'}}/>
                    </IconButton>
                    <TextField id='Search-bar' variant='outlined' label='Search' sx={{width: '40%'}} color='secondary'/>
                </Grid>

                <Grid item xs={2} bgcolor='#f397ff' sx={{fontSize: 25}}>
                    <IconButton onClick={handleMenuOpen} sx={{ textDecoration: 'none', color: 'black', height: 60, width: 60, transform:"translate(300%,-5%)"}} aria-label="Sort" title="Sort">
                        <Sort sx={{fontSize:'32pt'}}/>
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={isMenuOpen}
                        onClose={handleMenuClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleSortName}>Name (A-Z)</MenuItem>
                        <MenuItem onClick={handleSortPublishDate}>Publish Date (Newest)</MenuItem>
                        <MenuItem onClick={handleSortListens}>Listens (High - Low)</MenuItem>
                        <MenuItem onClick={handleSortLikes}>Likes (High - Low)</MenuItem>
                        <MenuItem onClick={handleSortDislikes}>Dislikes (High - Low)</MenuItem>
                    </Menu>
                </Grid>

                {/* PLAYLIST CARDS */}
                <Grid item xs={7} sx={{height: '650px', maxHeight: '650px'}}>
                    <List sx={{width: '100%', backgroundImage: 'linear-gradient(to bottom, #f397ff, #ffffff)', mb:"20px", overflow: 'auto', maxHeight: 687, pt: 0}} >
                        {sortedList}
                    </List>
                </Grid>

                {/* VIDEOPLAYER AND COMMENTS */}
                <Grid item xs={5}>
                    <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                        <Tabs value={value} onChange={handleChangeTab} indicatorColor="secondary" textColor="secondary" centered>
                            <Tab label="Player">
                            </Tab>
                            <Tab label="Comments">
                            </Tab>
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <YouTubePlayerExample/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <CommentsTab/>
                    </TabPanel>
                </Grid>
                
                {/* STATUSBAR */}
                <Grid item xs={12}>
                    <Box sx={{transform:"translate(0%,5%)", display: 'flex', justifyContent: 'center', position: 'absolute',  
                    width: '1536px', height: '50px', backgroundImage: 'linear-gradient(to bottom, #ffffff, #f397ff)', alignItem: 'center'}}>
                        <IconButton onClick={handleCreateNewList} sx={{transform:"translate(0%, -15%)", textDecoration: 'none', color: 'black', height: 60, width: 60}} aria-label="AddList" title="Add New List">
                            <PlaylistAdd  sx={{fontSize:'32pt'}}/>
                        </IconButton>

                        <Typography sx={{fontSize: '30px', pl: '20px'}}>
                            {text}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
    }
    return (
        <div id="playlist-selector">
            <div id="list-selector-heading">
               <img src={playlisterLogo} alt="playlisterLogo" width='265px'/>
            </div>
            <Box sx={{bgcolor:"background.paper"}} id="list-selector-list">
                {listCard}
                <MUIDeleteModal />
            </Box>
        </div>)
}

export default HomeScreen;