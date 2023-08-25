import {
    Lock, BarChart, Settings, ShoppingBag, User, Users, LogOut, CreditCard, Monitor, Calendar, Rss, Square,
    Clipboard, Bell, Mail, Briefcase, RefreshCw, Home, Out, Archive 
} from 'react-feather';

export const allItems = [
    {
      href: '',
      icon: Home,
      title: 'Dashboard',
      mode: 'BOTH'
    },
    {
      href: 'giving-records',
      icon: CreditCard,
      title: 'Giving Records',
      mode: 'BOTH'
    },
    {
      href: '/conversations',
      icon: Mail,
      title: 'Conversations',
      mode: 'BOTH'
    },
    {
      href: '/notifications',
      icon: Bell,
      title: 'Notifications',
      mode: 'BOTH'
    },
    {
      href: '/testimonies',
      icon: Bell,
      title: 'Testimonies',
      mode: 'USER'
    },
    {
      href: '/notes',
      icon: Clipboard,
      title: 'Notes',
      mode: 'USER'
    },
    {
      href: '/events',
      icon: Calendar,
      title: 'Upcoming Events',
      mode: 'BOTH'
    },
    {
      href: '/news-feed',
      icon: Rss,
      title: 'News Feed',
      mode: 'USER'
    },
    {
      href: '/profile',
      icon: User,
      title: 'Profile',
      mode: 'BOTH'
    },
    {
      href: '/watch',
      icon: Monitor,
      title: 'Watch',
      mode: 'USER'
    },
    {
      href: '/church',
      icon: LogOut,
      title: 'Home',
      mode: 'USER'
    },
    {
      href: '/reports',
      icon: Archive,
      title: 'Reports',
      mode: 'ADMIN'
    },
    {
      href: '/members',
      icon: Users,
      title: 'Member Database',
      mode: 'ADMIN'
    },
    {
      href: '/admins',
      icon: Users,
      title: 'Manage Admins',
      mode: 'ADMIN'
    },
    {
      href: '/pages',
      icon: Users,
      title: 'Pages',
      mode: 'ADMIN'
    }
  ];
