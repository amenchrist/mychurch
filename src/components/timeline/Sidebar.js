import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Avatar, Box, Divider, Drawer, Grid, Hidden, List, MenuItem, TextField, Typography } from '@mui/material';
import { LogOut, RefreshCw, Square } from 'react-feather';
import NavItem from '../NavItem';
import { useMyStore } from '../../store';
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { allItems } from '../sideBarItems';
import { useEffect, useState } from 'react';

const Sidebar = ({ onMobileClose, openMobile }) => {

  const user = useMyStore(store => store.user);
  const { setUser, adminMode, toggleAdminMode } = useMyStore();
  const [items, setItems] = useState(allItems.filter((item) => item.mode !== 'ADMIN'))

  useEffect(() => {
    if(adminMode) setItems(allItems.filter((item) => item.mode !== 'USER'))
  }, [adminMode])

  const logOut = async () => {
    try {
      await signOut(auth);
      toggleAdminMode(false)
      setUser({})
    } catch (err) {
      console.error(err);
    }
  };

  function toggleMode(){
    toggleAdminMode(!adminMode)
  }

  const { church, avatar, title, firstName, lastName } = user;

  function Header() {
    return (
      <Box sx={{alignItems: 'center', display: 'flex', flexDirection: 'column', p: 2 }} >
        <Avatar component={RouterLink} src={avatar} sx={{cursor: 'pointer', width: 64, height: 64 }} to="#" />
        <Typography color="textPrimary" variant="h5" align='center' >
          {user?.email? `${title} ${firstName} ${lastName}` :'Guest'}
        </Typography> 
        {/* <Typography color="textPrimary" variant="h5" align='center' >
          {user?.email}
        </Typography> */}
        <Typography color="textSecondary" variant="body2" >
          {church || 'Christ Embassy'}
        </Typography>
      </Box>
    )
  }

  function AdminHeader() {
    return (
      <Box sx={{alignItems: 'center', display: 'flex', flexDirection: 'column', p: 2 }} >
        <Avatar component={RouterLink} src={avatar} sx={{cursor: 'pointer', width: 64, height: 64 }} to="#" />
        <Typography color="textPrimary" variant="h5" align='center' >
          {'Christ Embassy Barking'}
        </Typography> 
        <Typography color="textSecondary" variant="body2" >
          {'Change Page'}
        </Typography>
      </Box>
    )
  }
  

  

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      {adminMode? <AdminHeader /> : <Header /> }
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
          {user.emailChecked? <NavItem href={'#'} key={'reset'} title={'Reset'} icon={RefreshCw} onClick={() => setUser({})}/>  : <></>}
        </List>

        {user?.role === 'ADMINISTRATOR'?
        !adminMode ? <NavItem onClick={toggleMode} key={'Open Admin Mode'} title={'Open Admin Mode'} icon={Square}/> 
        : <NavItem onClick={toggleMode} key={'Close Admin Mode'} title={'Close Admin Mode'} icon={Square}/>
        : <></>
        }

        <NavItem onClick={logOut} key={'Sign Out'} title={'Sign Out'} icon={LogOut} />
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
    {/* For Mobile Devices */}
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      {/* For Large Devices */}
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              // top: 64,
              // height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

Sidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

Sidebar.defaultProps = {
  onMobileClose: () => {
  },
  openMobile: false
};

export default Sidebar;
