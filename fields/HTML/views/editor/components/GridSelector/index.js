import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Popover, IconButton, TextField, GridList, GridListTile, Divider, Button, GridListTileBar } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { PanoramaOutlined, Clear, CheckCircleOutline } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';
import { usePopupState, bindTrigger, bindPopover } from 'material-ui-popup-state/hooks'

import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import styleSheet from './style';

const useStyles = makeStyles(styleSheet);

const GirdSelector = (props) => {
    const { total, page, pagedData, onPageChange, onChange, TileComponent, EditingTileComponent, isMultipleSelection } = props;
    const [selectedData, setSelectedData] = useState([]);
    const [selectedUIDs, setSelectedUIDs] = useState([]);
    const popupState = usePopupState({ variant: 'popover', popupId: 'imagePopover' })
    const { width } = useWindowDimensions();
    const classes = useStyles({ width });

    const save = selectedData => {
        onChange();
        clean();
        popupState.close();
    }

    const selectPage = (event, page) => {
        onPageChange(page);
    }

    const selectTile = (event) => {
        const index = event.target.getAttribute('id').match(/\d+/)[0];
        if (!selectedUIDs.includes(pagedData[index].id)) {
            if (!isMultipleSelection) {
                setSelectedData([pagedData[index]]);
            } else {
                setSelectedData([...selectedData, pagedData[index]]);
            }
        } else {
            const deletingIndex = selectedData.findIndex(data => data.id == pagedData[index].id);
            removeIndexFromSelectedData(deletingIndex);
        }
    }

    useEffect(() => {
        setSelectedUIDs(selectedData.map(data => data.id));
    }, [selectedData])

    const removeTile = index => () => {
        removeIndexFromSelectedData(index);
    }

    const removeIndexFromSelectedData = index => {
        const newSelectedData = [...selectedData];
        newSelectedData.splice(index, 1);
        setSelectedData(newSelectedData);
    };

    const clean = () => {
        setSelectedData([]);
    };

    return (
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
                onExit={clean}
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
                        onClick={save}
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
                        {pagedData.map((data, index) => (
                            <GridListTile
                                key={`paged-data-${index}`}
                                cols={1}
                                onClick={selectTile}
                            >
                                <TileComponent id={`paged-data-${index}`} data={data} />
                                {
                                    selectedUIDs.includes(data.id)
                                    && <GridListTileBar
                                        titlePosition="top"
                                        actionIcon={
                                            <IconButton className={classes.pagedTitleCheckIcon} disableRipple={true}>
                                                <CheckCircleOutline />
                                            </IconButton>
                                        }
                                        actionPosition="right"
                                        className={classes.editingTileTitleBar}
                                    />
                                }
                            </GridListTile>
                        ))}
                    </GridList>
                    <Pagination
                        className={classes.pagination}
                        count={total}
                        page={page}
                        siblingCount={2}
                        variant="outlined"
                        shape="rounded"
                        onChange={selectPage}
                    />
                    <Divider light={true} />
                    <GridList
                        className={classes.gridList}
                        cellHeight={width / 2 / 2}
                        cols={2.04}
                        spacing={12}
                    >
                        {
                            selectedData
                            && EditingTileComponent
                            && selectedData.map((data, index) => (
                                <GridListTile className={classes.editingTile} key={`selected-data-${index}`} cols={1}>
                                    <EditingTileComponent id={`selected-data-${index}`} data={data} />
                                    <GridListTileBar
                                        titlePosition="top"
                                        actionIcon={
                                            <IconButton className={classes.editingTitleClearIcon} onClick={removeTile(index)}>
                                                <Clear />
                                            </IconButton>
                                        }
                                        actionPosition="right"
                                        className={classes.editingTileTitleBar}
                                    />
                                </GridListTile>
                            ))
                        }
                    </GridList>
                </div>
            </Popover>
        </div >
    );
}

export default GirdSelector;
