import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import {DrawerList} from "./DrawerList.tsx";
import {getAllResponseCartDto} from "../../../../data/cart/Cart.Type.ts";
import {Box} from "@mui/material";

export interface drawerComponent{
    cartDtoList: getAllResponseCartDto[];
}

export default function CartDrawer({cartDtoList}: drawerComponent) {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };


    return (
        <Box>
            <Button onClick={toggleDrawer(true)}>Open drawer</Button>
            <Drawer open={open} onClose={toggleDrawer(false)} anchor={"right"}>
                <DrawerList drawerComponent={{cartDtoList}}/>
            </Drawer>
        </Box>
    );
}