import { Fragment, useState } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { navElements } from "./data"

export const Sidebar = () => {
    const [state, setState] = useState({
        supply: false,
        logistics: false,
        customs: false,
        settings: false
    });

    const handleExpand = (name) => setState({ ...state, supply: false, logistics: false, customs: false, settings: false, [name]: !state[name] });

    return (
        <List component="nav" style={{ color: "white", background: "rgba(0, 0, 0, 0.2)", height: "100%" }}>
            {navElements.map((i, index) =>
                <Fragment key={index}>
                    <ListItem button onClick={() => handleExpand(i.state)}>
                        <ListItemIcon style={{ color: "white" }}> {i.icon} </ListItemIcon>
                        <ListItemText primary={i.name} />
                        {state[i.state] ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
                    </ListItem>

                    <Collapse in={state[i.state]} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {i.children.map((i, index) =>
                                <ListItem button key={index}>
                                    <ListItemIcon></ListItemIcon>
                                    <ListItemText primary={i.name} />
                                </ListItem>
                            )}
                        </List>
                    </Collapse>
                </Fragment>
            )}
        </List>
    );
};