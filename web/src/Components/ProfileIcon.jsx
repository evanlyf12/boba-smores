import React from 'react';
import styled from "styled-components";

import Avatar from '@material-ui/core/Avatar';
import IconButton from "@material-ui/core/IconButton";
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

// const AvatarContainer = styled.div`
//   display: flex;
//   margin-bottom: 14px;
//   & > * {
//     margin: 4px;
//   }
// `;
// const AvatarLabel = styled.div`
//   display: flex;
//   align-items: center;
// `;

const BorderedAvatar = styled(Avatar)`
  border: 2.5px solid white;
`;

function ProfileIcon() { //have props here
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

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
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div style={{ display: "flex"}}>
      <label className="inputLabel">
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
                    <MenuItem onClick={handleClose}>Change password</MenuItem>
                    <MenuItem onClick={hangleLogout}>Log out</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </div>
            </Grow>
          )}
        </Popper>
        <p className="avatarLabel">Lewis</p>
      </label>
    </div>
  );
}

export default ProfileIcon;