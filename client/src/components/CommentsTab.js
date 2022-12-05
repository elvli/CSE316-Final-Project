import React, {useContext, useEffect} from 'react';
import { GlobalStoreContext} from '../store';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

export default function CommentsTab() {
    const { store } = useContext(GlobalStoreContext);

    return (
    <Grid container direction='column' spacing={2} justifyedContent='centered' alignItems='stretch'>
        <Grid item xs={8}>
            <Paper style={{ padding: "10px 10px", height: 537 }}>PaperComet</Paper>
        </Grid>
        <Grid item xs={4}>
                <TextField id="outlined-basic" label="Add Comment" variant="outlined" fullWidth />
        </Grid>
    </Grid>);
}

