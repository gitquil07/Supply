import { useState } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import DashboardIcon from '@material-ui/icons/Dashboard';
import BookIcon from '@material-ui/icons/Book';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { Supply, Logistics, Customs, Settings } from "./data"

export const Sidebar = () => {
    const [supply, setSupply] = useState(false);
    const [logistics, setLogistics] = useState(false);
    const [customs, setCustoms] = useState(false);
    const [settings, setSettings] = useState(false);

    return (
        <List component="nav">

            {/* Снабжение */}

            <ListItem button onClick={() => setSupply(!supply)}>
                <ListItemIcon> <DashboardIcon /> </ListItemIcon>
                <ListItemText primary="Снабжение" />
                {supply ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
            </ListItem>

            <Collapse in={supply} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {Supply.map((i, index) =>
                        <ListItem button key={index}>
                            <ListItemIcon>  </ListItemIcon>
                            <ListItemText primary={i.name} />
                        </ListItem>
                    )}
                </List>
            </Collapse>

            {/* Логистика */}

            <ListItem button onClick={() => setLogistics(!logistics)}>
                <ListItemIcon> <BookIcon /> </ListItemIcon>
                <ListItemText primary="Логистика" />
                {logistics ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
            </ListItem>

            <Collapse in={logistics} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {Logistics.map((i, index) =>
                        <ListItem button key={index}>
                            <ListItemIcon>  </ListItemIcon>
                            <ListItemText primary={i.name} />
                        </ListItem>
                    )}
                </List>
            </Collapse>

            {/* Таможня */}

            <ListItem button onClick={() => setCustoms(!customs)}>
                <ListItemIcon> <ShoppingCartIcon /> </ListItemIcon>
                <ListItemText primary="Таможня" />
                {customs ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
            </ListItem>

            <Collapse in={customs} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {Customs.map((i, index) =>
                        <ListItem button key={index}>
                            <ListItemIcon>  </ListItemIcon>
                            <ListItemText primary={i.name} />
                        </ListItem>
                    )}
                </List>
            </Collapse>

            {/* Управление */}

            <ListItem button onClick={() => setSettings(!settings)}>
                <ListItemIcon> <SettingsIcon /> </ListItemIcon>
                <ListItemText primary="Управление" />
                {settings ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
            </ListItem>

            <Collapse in={settings} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {Settings.map((i, index) =>
                        <ListItem button key={index}>
                            <ListItemIcon>  </ListItemIcon>
                            <ListItemText primary={i.name} />
                        </ListItem>
                    )}
                </List>
            </Collapse>
        </List>
    );
};