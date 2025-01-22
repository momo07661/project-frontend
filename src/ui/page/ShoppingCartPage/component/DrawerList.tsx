import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import {Card} from "@mui/material";
import {drawerComponent} from "./CartDrawer.tsx";

type Props = {
    drawerComponent: drawerComponent,
}

export const DrawerList = (props: Props)=> {
    return (
        <Box sx={{width: 350}} role="presentation" >
            <List>
                {props.drawerComponent.cartDtoList.map((item, index) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={item.name}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <Card>
                calculation
            </Card>
        </Box>
    );
};