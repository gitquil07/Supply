import { Fragment, useState, useContext } from "react";
import styled from "styled-components";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { navElements } from "./data"
import { Link } from "react-router-dom";
import { UserContext } from "context/UserContext";
import { checkPrivilege } from "authorization/authCheck";


export const Sidebar = () => {
    const [state, setState] = useState({
        supply: false,
        logistics: false,
        customs: false,
        settings: false
    });

    const { role } = useContext(UserContext);
    // const role = "ADMIN";

    const handleExpand = (name) => setState({ ...state, supply: false, logistics: false, customs: false, settings: false, [name]: !state[name] });

    return (
        <List component="nav" style={{ color: "white", background: "rgba(0, 0, 0, 0.6)", height: "100%" }}>
            {navElements.map((i, index) =>  {

                let allow = true;
                let name = "";
                switch(i.name.toLowerCase()){
                    case "снабжение": 
                        name = "useSupplyNavigation";
                        allow = checkPrivilege(role, `menuPermissions.${name}.main`);
                        break;
                    case "логистика":
                        name = "useTrackingNavigation";
                        allow = checkPrivilege(role, `menuPermissions.${name}.main`);
                        break;
                    case "таможня":
                        name = "useCustomNavigation";
                        allow = checkPrivilege(role, `menuPermissions.${name}.main`);
                        break;
                    case "управление":
                        name = "useSettingNavigation";
                        allow = checkPrivilege(role, `menuPermissions.${name}.main`);
                        break;
                }

                console.log("name", i.name);
                console.log("allow", allow);

                return (
                    <>
                         {
                            allow && <Fragment key={index}>
                                <ListItem button onClick={() => handleExpand(i.state)}>
                                    <ListItemIcon style={{ color: "white" }}> {i.icon} </ListItemIcon>
                                    <ListItemText primary={i.name} />
                                    {state[i.state] ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
                                </ListItem>

                                <Collapse in={state[i.state]} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {i.children.map((i, index) => {

                                            let path = i.url.slice(i.url.indexOf("/", 1) + 1);
                                                console.log("path before", path);
                                                path = path.indexOf("-") === -1? path : path.slice(0, path.indexOf("-")) + path.slice(path.indexOf("-")+1, path.indexOf("-")+2).toUpperCase() + path.slice(path.indexOf("-")+2)
                                                console.log("path after", path);

                                            let allowSub = checkPrivilege(role, `menuPermissions.${name}.${path}`);

                                            return (
                                                <>
                                                    {
                                                        allowSub && <StyledLink to={i.url} key={index}>
                                                        <ListItem button key={index}>
                                                            <ListItemIcon></ListItemIcon>
                                                            <ListItemText primary={i.name} />
                                                        </ListItem>
                                                    </StyledLink> 
                                                    }
                                                </>
                                            );
                                        })}
                                    </List>
                                </Collapse>
                            </Fragment>
                        }

                    </>
                );

            })}
        </List>
    );
};

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #fff;
`;