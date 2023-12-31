import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Avatar, Box, Divider, Drawer, Grid, Hidden, List, MenuItem, TextField, Typography } from '@mui/material';
import { LogOut, Menu, MinusSquare, Plus, PlusCircle, RefreshCw, Square, X } from 'react-feather';
import NavItem from './NavItem';
import { useMyStore } from '../store';
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { allItems } from './sideBarItems';
import { useEffect, useState } from 'react';

const Sidebar = ({ onMobileClose, openMobile }) => {

  // const user = useMyStore(store => store.user);
  const { setUser, adminMode, toggleAdminMode, user, currentPage } = useMyStore();
  const [items, setItems] = useState(allItems.filter((item) => item.mode !== 'ADMIN'))
  const location = useLocation();

  const [ openMenu, setOpenMenu ] = useState(false)

  useEffect(() => {
    if(adminMode) setItems(allItems.filter((item) => item.mode !== 'USER'))
  }, [adminMode])


  //LOG USER OUT
  const logOut = async () => {
    try {
      await signOut(auth);
      toggleAdminMode(false)
      setUser({})
    } catch (err) {
      console.error(err);
    }
  };

  const toggleMode = () => {
    toggleAdminMode(!adminMode)
  }

  // const { title, firstName, lastName } = user?.bioData;

  function Header() {
    return (
      <Box sx={{alignItems: 'center', display: 'flex', flexDirection: 'column', p: 2 }} >
        <Avatar component={RouterLink} src={''} sx={{cursor: 'pointer', width: 64, height: 64 }} to="#" />
        <Typography color="textPrimary" variant="h5" align='center' >
          {user?.email? `${user.biodata?.title} ${user.biodata?.firstName} ${user.biodata?.lastName}` :'Guest'}
        </Typography> 
        {/* <Typography color="textPrimary" variant="h5" align='center' >
          {user?.email? 'Sign Amen Out' : 'Sign Amen In'}
        </Typography> */}
        <Typography color="textSecondary" variant="body2" >
          {currentPage? currentPage.name : 'Christ Embassy'}
        </Typography>
      </Box>
    )
  }

  function AdminHeader() {
    return (
      <Box sx={{alignItems: 'center', display: 'flex', flexDirection: 'column', p: 2 }} >
        <Avatar component={RouterLink} src={''} sx={{cursor: 'pointer', width: 64, height: 64 }} to="#" />
        <Typography color="textPrimary" variant="h5" align='center' >
          {currentPage? currentPage.name : 'Christ Embassy'}
        </Typography> 
        <Typography color="textSecondary" variant="body2" >
          {'Change Page'}
        </Typography>
      </Box>
    )
  }

  // console.log(currentPage.handle);
  
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
          {items.map((item) => {
            if (item.title === 'Home' && currentPage?.websiteURL ){
              item.href = currentPage.websiteURL;
            }

            return (
              <NavItem
                href={`${currentPage?.handle || ''}/${item.href}`}
                key={item.title}
                title={item.title}
                icon={item.icon}
              />
            )
          })}
          {user.emailChecked? <NavItem href={'#'} key={'reset'} title={'Reset'} icon={RefreshCw} onClick={() => setUser({})}/>  : <></>}
        </List>

        {currentPage.followers?.filter(f => f.id === user.id)[0]?.role === 'ADMINISTRATOR'?
        !adminMode ? <NavItem onClick={toggleMode} key={'Open Admin Mode'} title={'Open Admin Mode'} icon={Square}/> 
        : <NavItem onClick={toggleMode} key={'Close Admin Mode'} title={'Close Admin Mode'} icon={Square}/>
        : <></>
        }

        {user.type === 'SUPERUSER'?
        <NavItem href={`${currentPage?.handle || ''}/pages`} title={'Pages'} icon={MinusSquare} />
        : <></>
        }

        {user?.email?
        <NavItem onClick={logOut} key={'Sign Out'} title={'Sign Out'} icon={LogOut} />
        : <></>
        }

      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
        <div style={{ borderRadius: '100%', backgroundColor: 'white', padding: 15, position: 'absolute', right: 0}} onClick={() => setOpenMenu(!openMenu)}>
            {openMenu? <></>: <Menu /> }
        </div>
    {/* For Mobile Devices */}
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={!openMenu}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          <div style={{padding: 15, display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}} onClick={() => setOpenMenu(!openMenu)}>
             <X />
          </div>
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
          <div style={{padding: 15, display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}} onClick={() => setOpenMenu(!openMenu)}>
              <X />
          </div>
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
