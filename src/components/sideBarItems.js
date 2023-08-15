import {
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
    Briefcase, RefreshCw, Home, LogOut
  } from 'react-feather';

export const items = [
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
    }  
  ];

