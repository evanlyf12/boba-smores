import React, {useState, useRef, useEffect} from 'react';
import styled from "styled-components";
import { useHistory } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import IconButton from "@material-ui/core/IconButton";
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { deauthenticateUser } from '../Auth';

const BorderedAvatar = styled(Avatar)`
  border: 2.5px solid white;
`;

function UserIcon() { //have props here
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const history = useHistory();
  const routeChange = (path) => {
      history.push(path);
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const hangleLogout = () => {
    // log the user out
    deauthenticateUser();
    routeChange(`/`);
  }

  // move up and down the menu with arrow keys
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>
        <IconButton
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}>
          <BorderedAvatar
            alt="avatar"
          />
        </IconButton>

        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <div>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    {/* <MenuItem onClick={handleClose}>Change password</MenuItem> */}
                    <MenuItem style={{padding:0,marginRight:'10px'}} onClick={hangleLogout}>Log out</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </div>
            </Grow>
          )}
        </Popper>
        {/* <p>Name</p> */}
    </div>
  );
}

export default UserIcon;