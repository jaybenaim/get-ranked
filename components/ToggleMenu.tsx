import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IToggleOption } from 'lib/types/Global';

const ITEM_HEIGHT = 48;

export default function ToggleMenu({
  options = [
    {
      title: 'Edit',
    },
    {
      title: 'Delete'
    }
  ] as IToggleOption[]
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (optionalCloseFn: IToggleOption) => {
    setAnchorEl(null);

    if (optionalCloseFn.closeFn) {
      optionalCloseFn.closeFn()
    }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls="long-menu"
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option: IToggleOption) => (
          <MenuItem key={option.title} selected={option.title === options[0].title} onClick={() => handleClose(option)}>
            {option.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
