import {
    BarChart, User, Users, CreditCard, Monitor, Calendar, Rss,
    Clipboard, Bell, Mail, Home, Archive, Menu, MinusSquare 
} from 'react-feather';

import Diversity3Icon from '@mui/icons-material/Diversity3';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';




export const allItems = [
    {
      href: '/',
      icon: Home,
      title: 'Home',
      mode: 'ALL'
    },
    {
      href: '/pages',
      icon: MinusSquare,
      title: 'Pages',
      mode: 'ALL'
    },
    // {
    //   href: 'events',
    //   icon: Calendar,
    //   title: 'Upcoming Events',
    //   mode: 'CHURCH'
    // },
    // {
    //   href: 'watch',
    //   icon: Monitor,
    //   title: 'Watch',
    //   mode: 'ALL'
    // },
    {
      href: 'church',
      icon: Diversity3Icon,
      title: 'My Church',
      mode: 'ALL'
    },
    {
      href: 'profile',
      icon: AccountCircleIcon,
      title: 'Profile',
      mode: 'ALL'
    },
    // {
    //   href: 'giving-records',
    //   icon: CreditCard,
    //   title: 'Giving Records',
    //   mode: 'ALL'
    // },
    // {
    //   href: 'conversations',
    //   icon: Mail,
    //   title: 'Conversations',
    //   mode: 'ALL'
    // },
    // {
    //   href: 'notifications',
    //   icon: Bell,
    //   title: 'Notifications',
    //   mode: 'ALL'
    // },
    // {
    //   href: 'testimonies',
    //   icon: Bell,
    //   title: 'Testimonies',
    //   mode: 'CHURCH'
    // },
    // {
    //   href: 'notes',
    //   icon: Clipboard,
    //   title: 'Notes',
    //   mode: 'PERSON'
    // },
    // {
    //   href: 'news-feed',
    //   icon: Rss,
    //   title: 'News Feed',
    //   mode: 'ALL'
    // },
    // {
    //   href: 'reports',
    //   icon: Archive,
    //   title: 'Reports',
    //   mode: 'CHURCH'
    // },
    // {
    //   href: 'members',
    //   icon: Users,
    //   title: 'Members',
    //   mode: 'CHURCH'
    // },
    // {
    //   href: 'admins',
    //   icon: Users,
    //   title: 'Manage Admins',
    //   mode: 'CHURCH'
    // },
  ];
