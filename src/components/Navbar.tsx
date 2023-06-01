import React from 'react';
import {
  AppBar,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import IosShareIcon from '@mui/icons-material/IosShare';

interface INavbarProps {
  import: () => any;
  searchOnChange: (e: any) => void;
  serachValue: string;
}

const Navbar = (props: INavbarProps) => {
  return (
    <AppBar
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pb: 0.5,
        background: '#000',
        boxShadow: '0px 17px 25px 1px rgba(0, 0, 0, 1)',
      }}
    >
      <div style={{ position: 'fixed', top: 20, right: '5%' }}>
        <IconButton aria-label="Import" onClick={props.import}>
          <IosShareIcon />
        </IconButton>
      </div>

      <Typography
        variant="h5"
        sx={{
          letterSpacing: '-2px',
          fontWeight: 600,
          mt: 3,
          mb: 2,
        }}
      >
        VideoHub
      </Typography>
      <div style={{ width: '90%' }}>
        <TextField
          placeholder="Search"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fill: 'gray' }} />
              </InputAdornment>
            ),
            style: {
              borderRadius: 12,
            },
          }}
          fullWidth
          value={props.serachValue}
          onChange={props.searchOnChange}
        />
      </div>
    </AppBar>
  );
};

export default Navbar;
