import {
    Lock, BarChart, Settings, ShoppingBag, User, Users, LogOut, CreditCard, Monitor, Calendar, Rss, Square,
    Clipboard, Bell, Mail, Briefcase, RefreshCw, Home, Out 
} from 'react-feather';

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
      icon: Mail,
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
      icon: User,
      title: 'Profile'
    },
    {
      href: '/watch',
      icon: Monitor,
      title: 'Watch Live'
    },
    {
      href: '/church',
      icon: LogOut,
      title: 'Back to Church Site'
    },
    {
      href: '/admin',
      icon: Square,
      title: 'For Admins',
      forAdmins : true
    }  
  ];

  export const memberSidebarItems = []

  export const churchSidebarItems = []
