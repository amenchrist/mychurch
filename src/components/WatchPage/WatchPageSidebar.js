import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Avatar, Box, Divider, Drawer, Grid, Hidden, List, MenuItem, TextField, Typography } from '@mui/material';
import {
  BarChart as BarChartIcon,
  Briefcase,
  LogOut as Out,
  RefreshCw
} from 'react-feather';
import NavItem from '../NavItem';
import { useStateContext } from '../../contexts/ContextProvider';

let items = [
  {
    href: '/member-dashboard',
    icon: Briefcase,
    title: 'To Member Dashboard'
  },
  {
    href: '/',
    icon: Out,
    title: 'To Watch Page'
  },
  {
    href: '/admin-dashboard/summary',
    icon: BarChartIcon,
    title: 'To Admin Dashboard'
  }

];

const WatchPageSidebar = ({ onMobileClose, openMobile }) => {

  const { user, setUser, isAdmin, blankUser, orgDetails } = useStateContext();

  const { church, avatar, name } = user;

  useEffect(()=> {
    if(!isAdmin){
      items = items.filter(item => item.href !== '/admin-dashboard/summary')
    }
  }, [isAdmin])

  

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          src={avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="#"
        />
        <Typography
          color="textPrimary"
          variant="h5"
          align='center'
        >
          {name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
          align='center'
        >
          {church}
        </Typography>
      </Box>
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
          {user.emailChecked? 
            <NavItem
              href={'#'}
              key={'reset'}
              title={'Reset'}
              icon={RefreshCw}
              onClick={() => setUser(blankUser)}
            />  :
            <></>
          }
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      {/* <Hidden lgUp> */}
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
      {/* </Hidden> */}
      {/* <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden> */}
    </>
  );
};

WatchPageSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

WatchPageSidebar.defaultProps = {
  onMobileClose: () => {
  },
  openMobile: false
};

export default WatchPageSidebar;
