import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import {Divider} from "@material-ui/core";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            style={{width:'100%'}}
            {...other}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    rootVertical: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
    },
    tabsVertical: {
        borderRight: `1px solid ${theme.palette.divider}`,
        width: '200px'
    },
}));

export default function TabPro({tabs,orientation="horizontal",initialValue=0}) {
    const classes = useStyles();
    const [value, setValue] = React.useState(initialValue);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if(orientation==="horizontal") {
        return (
            <div className={classes.root}>
                <AppBar position="static" color="default" elevation={0}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        {tabs.map((tab, idx) => (
                            <Tab key={idx} label={tab.label} {...a11yProps(idx)} />
                        ))}
                    </Tabs>
                </AppBar>
                <Divider variant="fullWidth"/>
                {tabs.map((tab, idx) => (
                    <TabPanel key={idx} value={value} index={idx}>
                        {tab.panel}
                    </TabPanel>
                ))}
            </div>
        );
    }else{
        return (
            <div className={classes.rootVertical}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabsVertical}
                >
                    {tabs.map((tab, idx) => (
                        <Tab key={idx} label={tab.label} {...a11yProps(idx)} />
                    ))}
                </Tabs>
                {tabs.map((tab, idx) => (
                    <TabPanel key={idx} value={value} index={idx}>
                        {tab.panel}
                    </TabPanel>
                ))}
            </div>
        )
    }
}

TabPro.prototype = {
    tabs: PropTypes.object.isRequired,
    orientation: PropTypes.oneOf(["horizontal","vertical"])
}
