import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { EditorState, Modifier } from 'draft-js';
import { getEntityRange, getSelectionEntity } from 'draftjs-utils';

import { Popover, IconButton, TextField, GridList, GridListTile, Divider, Button } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

import { PanoramaOutlined } from '@material-ui/icons'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';

import '@fortawesome/fontawesome-free/css/all.min.css';

const Image = (props) => {
    const { height, width } = useWindowDimensions();
    const classes = useStyles({ width });

    return (
        <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
                <div className={classes.root}>
                    <IconButton
                        className={classes.icon}
                        variant="outlined" size="small"
                        disableRipple={true}
                        {...bindTrigger(popupState)}
                    >
                        <PanoramaOutlined />
                    </IconButton>
                    <Popover
                        className={classes.popover}
                        anchorReference="anchorPosition"
                        anchorPosition={{ top: 0, left: 0 }} // overrided!
                        marginThreshold={16}
                        {...bindPopover(popupState)}
                    >
                        <div className={classes.header}>
                            <TextField
                                className={classes.search}
                                id="outlined-search"
                                label="Search Images"
                                type="search"
                                variant="outlined"
                                size="small"
                            />
                            <Button
                                className={classes.save}
                                variant="contained"
                                color="primary"
                                size="medium"
                            >
                                Save
                            </Button>
                        </div>
                        <Divider light={true} />
                        <div className={classes.body}>
                            <GridList
                                className={classes.gridList}
                                cellHeight={width / 4 / 2}
                                cols={4}
                                spacing={1}
                            >
                                {data.map((tile) => (
                                    <GridListTile key={tile.url} cols={1}>
                                        <img src={tile.url} alt={tile.title} />
                                    </GridListTile>
                                ))}
                            </GridList>
                            <Pagination
                                className={classes.pagination}
                                count={20}
                                siblingCount={2}
                                variant="outlined"
                                shape="rounded"
                            />
                            <Divider light={true} />
                            <GridList
                                className={classes.gridList}
                                cellHeight={'auto'}
                                cols={3}
                                spacing={1}
                            >
                                {[].map((tile, index) => (
                                    <GridListTile key={index} cols={1}>
                                        <img src={tile.url} alt={tile.title} />
                                    </GridListTile>
                                ))}
                            </GridList>
                            <Divider light={true} />
                            <p>Hello</p>
                            <Divider light={true} />
                            <p>Hello</p>
                            <Divider light={true} />
                            <p>Hello</p>
                            <Divider light={true} />
                            <p>Hello</p>
                            <Divider light={true} />
                            <p>Hello</p>
                            <Divider light={true} />
                            <p>Hello</p>
                        </div>
                    </Popover>
                </div>
            )
            }
        </PopupState >
    );
}

const useStyles = makeStyles({
    root: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: 6,
    },
    icon: {
        border: '1px solid #F1F1F1',
        borderRadius: 2,
        minWidth: 25,
        height: 32,
        margin: '0 4px',
        padding: 5,
        cursor: 'pointer',
        background: 'white',
        color: 'black',
    },
    popover: {
        '& .MuiPopover-paper': {
            width: '80%',
            top: '50% !important',
            left: '50% !important',
            transform: 'translate(-50%, -50%) !important',
        },
    },
    header: {
        display: 'flex',
        flexFlow: 'row wrap',
        width: '98%',
        overflow: 'hidden',
    },
    body: {
        height: props => `${0.9 * props.width / 2}px`,
        overflowY: 'scroll',
    },
    search: {
        width: props => `${Math.ceil(props.width / 1440 * 80)}ch`,
        margin: '18px 12px 12px',
    },
    save: {
        margin: '18px 12px 12px',
        marginLeft: 'auto',
    },
    gridList: {
        width: 'auto',
        margin: '8px 1px 8px !important',
    },
    pagination: {
        width: 'fit-content',
        margin: '16px auto',
    }
});

const data = [
    {
        title: 'Daleks',
        url: 'https://thedoctorwhosite.co.uk/wp-images/doctorwho/monsters/daleks.jpg'
    },
    {
        title: 'Thals',
        url: 'https://pmcdeadline2.files.wordpress.com/2019/08/doctor-who.jpg?crop=419px%2C111px%2C2332px%2C1307px&resize=681%2C383'//'https://thedoctorwhosite.co.uk/wp-images/doctorwho/monsters/thals.jpg'
    },
    {
        title: 'Voord',
        url: 'https://thedoctorwhosite.co.uk/wp-images/doctorwho/monsters/voord.jpg'
    },
    {
        title: 'Sensorites',
        url: 'https://thedoctorwhosite.co.uk/wp-images/doctorwho/monsters/sensorites.jpg'
    },
    {
        title: 'Koquillion',
        url: 'https://thedoctorwhosite.co.uk/wp-images/doctorwho/monsters/koquillion.jpg'
    },
    {
        title: 'Menoptera',
        url: 'https://thedoctorwhosite.co.uk/wp-images/doctorwho/monsters/menoptera.jpg'
    },
    {
        title: 'Zarbi',
        url: 'https://thedoctorwhosite.co.uk/wp-images/doctorwho/monsters/zarbi.jpg'
    },
    {
        title: 'Larvae guns',
        url: 'https://thedoctorwhosite.co.uk/wp-images/doctorwho/monsters/larvae-guns.jpg'
    },
    {
        title: 'Moroks',
        url: 'https://thedoctorwhosite.co.uk/wp-images/doctorwho/monsters/moroks.jpg'
    },
    {
        title: 'Xerons',
        url: 'https://thedoctorwhosite.co.uk/wp-images/doctorwho/monsters/xerons.jpg'
    },
    {
        title: 'Aridians',
        url: 'https://thedoctorwhosite.co.uk/wp-images/doctorwho/monsters/aridians.jpg'
    },
    {
        title: 'Mire Beasts',
        url: 'https://thedoctorwhosite.co.uk/wp-images/doctorwho/monsters/mire-beasts.jpg'
    },
    /*{
        title: 'Mechanoids',
        url: 'https://thedoctorwhosite.co.uk/wp-images/doctorwho/monsters/mechanoids.jpg'
    },
    {
        title: 'Drahvins',
        url: 'https://thedoctorwhosite.co.uk/wp-images/doctorwho/monsters/drahvins.jpg'
    },
    {
        title: 'Doctor Who',
        url: 'https://pmcdeadline2.files.wordpress.com/2019/08/doctor-who.jpg?crop=419px%2C111px%2C2332px%2C1307px&resize=681%2C383'
    },
    {
        title: 'Chumblies',
        url: 'https://thedoctorwhosite.co.uk/wp-images/doctorwho/monsters/chumblies.jpg'
    },
    {
        title: 'Rills',
        url: 'https://thedoctorwhosite.co.uk/wp-images/doctorwho/monsters/rills.jpg'
    },
    {
        title: 'Monoids',
        url: 'https://thedoctorwhosite.co.uk/wp-images/doctorwho/monsters/monoids.jpg'
    },
    {
        title: 'The Celestial Toymaker',
        url: 'https://thedoctorwhosite.co.uk/wp-images/doctorwho/monsters/celestial-toymaker.jpg'
    },
    {
        title: 'Wotan',
        url: 'https://thedoctorwhosite.co.uk/wp-images/doctorwho/monsters/wotan.jpg'
    },
    {
        title: 'The War Machines',
        url: 'https://thedoctorwhosite.co.uk/wp-images/doctorwho/monsters/war-machines.jpg'
    }, */
];

export default Image;
