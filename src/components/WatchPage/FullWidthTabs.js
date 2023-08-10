import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { useTheme, AppBar, Tabs, Tab, Box } from '@mui/material';
// import Typography from '@mui/material/Typography';
import LiveChat from './LiveChat';
import GivingForm from './GivingForm';
import Announcements from './Announcements';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        // <Box sx={{ p: 1 }}>
          
        // </Box>
        <div style={{  height: '100%', overflowY: 'hidden' }}>            
            {children}
          </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const [divHeight, setDivHeight] = useState('');

  React.useEffect(() => {
    // document.getElementById('tab-panellll').parentElement.parentElement.height = '100%'
    const sectionHeight= document.getElementById('trueParentDiv').clientHeight;
  
    if(divHeight !== sectionHeight){
      setDivHeight(sectionHeight)
    }
  }, [divHeight])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', width: "100%", height: '100%' }}>
      <AppBar position="static" style={{height:'10%'}}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Announcements" {...a11yProps(1)} />
          <Tab label="Chat" {...a11yProps(0)} />
          <Tab label="Giving" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <div id='trueParentDiv' style={{ height: '90%', overflowY: 'auto'}}>

      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        style={{height: '100%'}}
      >
        <TabPanel value={value} index={0} dir={theme.direction} style={{ height: divHeight, overflowY: 'hidden'  }}>
        <Announcements />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction} style={{ height: divHeight, overflowY: 'hidden'  }}  >
          <LiveChat />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction} style={{ height: divHeight, overflowY: 'hidden'  }}>
          <GivingForm />
        </TabPanel>
      </SwipeableViews>
      </div>
    </Box>
  );
}
