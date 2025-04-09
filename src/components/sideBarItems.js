import {
    BarChart, User, Users, CreditCard, Monitor, Calendar, Rss,
    Clipboard, Bell, Mail, Home, Archive, Menu 
} from 'react-feather';


export const allItems = [
    {
      href: '/',
      icon: BarChart,
      title: 'Dashboard',
      mode: 'ALL'
    },
    // {
    //   href: 'giving-records',
    //   icon: CreditCard,
    //   title: 'Giving Records',
    //   mode: 'ALL'
    // },
    {
      href: 'events',
      icon: Calendar,
      title: 'Upcoming Events',
      mode: 'CHURCH'
    },
    {
      href: 'watch',
      icon: Monitor,
      title: 'Watch',
      mode: 'ALL'
    },
    {
      href: 'church',
      icon: Home,
      title: 'Home',
      mode: 'ALL'
    },
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
    {
      href: 'profile',
      icon: User,
      title: 'Profile',
      mode: 'ALL'
    },
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
    {
      href: '/pages',
      icon: Users,
      title: 'Pages',
      mode: ''
    }
  ];
