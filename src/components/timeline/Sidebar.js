import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Avatar, Box, Divider, Drawer, Grid, Hidden, List, MenuItem, TextField, Typography } from '@mui/material';
import {
  // AlertCircle as AlertCircleIcon,
  // UserPlus as UserPlusIcon,
  Lock as LockIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  Users as UsersIcon,
  LogOut as Out,
  CreditCard, Monitor, Calendar, Rss, Square,
  Clipboard, Bell,
  Mail as MailIcon,
  Briefcase, RefreshCw, Home
} from 'react-feather';
import NavItem from '../NavItem';
// import { useAdminStateContext } from '../../contexts/AdminContextProvider';
import { useStateContext } from '../../contexts/ContextProvider';
import { ArrowBack } from '@mui/icons-material';
import { useMyStore } from '../../store';


const items = [
  {
    href: '/',
    icon: Home,
    title: 'Home'
  },
  {
    href: 'giving-records',
    icon: CreditCard,
    title: 'Giving Records'
  },
  {
    href: '/conversations',
    icon: MailIcon,
    title: 'Conversations'
  },
  {
    href: '/notifications',
    icon: Bell,
    title: 'Notifications'
  },
  {
    href: '/testimonies',
    icon: Bell,
    title: 'Testimonies'
  },
  {
    href: '/notes',
    icon: Clipboard,
    title: 'Notes'
  },
  {
    href: '/events',
    icon: Calendar,
    title: 'Upcoming Events'
  },
  {
    href: '/news-feed',
    icon: Rss,
    title: 'News Feed'
  },
  {
    href: '/profile',
    icon: UserIcon,
    title: 'Profile'
  },
  {
    href: '/watch',
    icon: Monitor,
    title: 'Watch Live'
  },
  {
    href: '/church',
    icon: Out,
    title: 'Back to Church Site'
  },
  {
    href: '/admin',
    icon: Square,
    title: 'For Admins'
  },
  {
    href: '/signup',
    icon: Square,
    title: 'Sign Up'
  },
  {
    href: '/signin',
    icon: Square,
    title: 'Sign In'
  },
    
 
  // {
  //   href: '/admin-dashboard/overview',
  //   icon: LockIcon,
  //   title: 'Yearly Overview'
  // },
  // {
  //   href: '/register',
  //   icon: UserPlusIcon,
  //   title: 'Register'
  // },
  // {
  //   href: '/404',
  //   icon: AlertCircleIcon,
  //   title: 'Error'
  // }
];

const Sidebar = ({ onMobileClose, openMobile }) => {

  const loggedInUser = useMyStore(store => store.user)

  const { user, setUser, serviceDateObjects, blankUser } = useStateContext()

  const { church, avatar, name } = user;

  const location = useLocation();
  // useEffect(() => {
  //   if (openMobile && onMobileClose) {
  //     onMobileClose();
  //   }
  // }, [openMobile, onMobileClose, location.pathname]);

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
          color="textPrimary"
          variant="h5"
          align='center'
        >
          {loggedInUser?.email}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
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
