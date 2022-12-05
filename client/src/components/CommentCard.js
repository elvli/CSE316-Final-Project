import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';

export default function CommentCard() {
    const { store } = useContext(GlobalStoreContext);

    return <div>comment card</div>
}