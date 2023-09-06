import * as React from "react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Stack } from "@mui/material";
import { messageMenu } from "../assets/msgmenu";
import { PiDotsThreeVertical } from "react-icons/pi";
import {useDispatch, useSelector} from 'react-redux';
import {Replay, Edit, Forward, Delete } from "../ReduxToolkit/ChatSlice";



export default function MessageOptionsMenu(props:any) {
const dispatch = useDispatch()

const displayMessage = useSelector(
  (state: any) => state.ChatSlice.displaymessages
);
 
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const actionMap:any = {
    Replay: Replay,
    Edit: Edit,
    Forward: Forward,
    Delete: Delete,
    
  };

const handleMenu =(el:any)=>{
 
  const actionCreator  = actionMap[el.title];
  if (typeof actionCreator === 'function') {
    dispatch(actionCreator({
      Message: props.Message,
      Id: props.id,
      action: el.title,
      prevmsgType:props.type
    }));
    
  } else {
    console.error(`Action creator for "${el.title}" not found.`);
  }
}
console.log(displayMessage)
  return (
    <div>
      <PiDotsThreeVertical
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        size={20}
        className="messageMenu"
      />
      <Menu
      className="menuOptions"
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Stack  spacing={1} px={1}>
          {messageMenu.map((el: any, indx: any) => {
            return(<MenuItem  key={indx} onClick={() => handleMenu(el)}>{el.title}</MenuItem>)
          })}
        </Stack>
      </Menu>
    </div>
  );
}

