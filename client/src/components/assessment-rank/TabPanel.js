import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import Csirt from './csirt/Csirt';
import CustomerProfile from './customerProfile/CustomerProfile';
import SecControl from './secControl/SecControl';
import Survey from './survey/Survey';
import VirtualPenetration from './virtualPenetration/VirtualPenetration';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    overflow: 'visible'
  },
  tabpanel: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%'
  }
}));

const VerticalTabs = (props) => {
  const { step } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Customer profile" {...a11yProps(0)} />
        <Tab label="Virtual penetration" {...a11yProps(1)} />
        <Tab label="Security Control" {...a11yProps(2)} />
        <Tab label="Csirt" {...a11yProps(3)} />
        <Tab label="Survey" {...a11yProps(4)} />
      </Tabs>
      <TabPanel className={classes.tabpanel}>
        <TabPanel value={value} index={0}>
          <CustomerProfile></CustomerProfile>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <VirtualPenetration></VirtualPenetration>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <SecControl></SecControl>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Csirt></Csirt>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Survey></Survey>
        </TabPanel>
      </TabPanel>
    </div>
  );
};

export default VerticalTabs;
