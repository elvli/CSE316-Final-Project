import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'

import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import YouTube from './YouTubePlaylisterReact';         
                
export default function VideoPlayerComments() {
    const [value, setValue] = React.useState(0)

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
      

    const handleChangeTab = (event, val) => {
        setValue(val)
    }
            
    let PlayerCommentBox = 
        <PlayerCommentBox>     
            <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                <Tabs value={value} onChange={handleChangeTab} centered>
                    <Tab label="Player"></Tab>
                    <Tab label="Comments"></Tab>
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <YouTube
                 videoId="4D7u5KF7SP8"/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Comments tab
            </TabPanel>
        </PlayerCommentBox>

                
    return <PlayerCommentBox>     
            <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                <Tabs value={value} onChange={handleChangeTab} centered>
                    <Tab label="Player"></Tab>
                    <Tab label="Comments"></Tab>
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <YouTube
                videoId="4D7u5KF7SP8"/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Comments tab
            </TabPanel>
        </PlayerCommentBox>;
}