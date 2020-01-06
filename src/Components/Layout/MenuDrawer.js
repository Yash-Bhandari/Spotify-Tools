import React, { useState } from 'react';
import { IconButton, Drawer, ListItem, List, ListItemText } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import {routes} from '../../routes';

export default () => {
    const [drawer, setDrawer] = useState(false);

    const toggleDrawer = e => { setDrawer(!drawer) };

    return (
        <>
            <IconButton edge='start' onClick={toggleDrawer}>
                <MenuIcon />
            </IconButton >
            <Drawer
                open={drawer}
                onClose={toggleDrawer}
                onClick={toggleDrawer}
            >
                <List>
                    {routes.map(route =>
                        <ListItem button key={route.name} component={Link} to={route.path}>
                            <ListItemText primary={route.name} />
                        </ListItem>
                    )}
                </List>

            </Drawer>
        </>
    )
}