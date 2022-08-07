import "./profileTab.scss";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import { useState } from "react";
import { Postcard } from "../index";
import { useSelector } from "react-redux";
import { Empty } from "../../pages/index";
import "./profileTab.scss";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={1}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const useStyles = makeStyles({
  labeltext: {
    color: "#818cf8",
    fontSize: '16px',
    fontWeight: 500,
    fontFamily: `'Poppins', sans-serif`,
  },
  tab: {
    fontFamily: `'Poppins', sans-serif`,
  },
  tabpanel: {
    width: "100%",
  }
});

export const ProfileTab = ({ProfileUserId}) => {
  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      "aria-controls": `scrollable-auto-tabpanel-${index}`
    };
  }
  function handleChange(event, newValue) {
    setValue(newValue);
  }
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const currentUserId = localStorage.getItem("userId");
  const { posts } = useSelector((state) => state.post);
  return (
    <div className="tab-container">
      <Tabs
        className={classes.tabpanel}
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab className={classes.labeltext} label="POSTS" {...a11yProps(0)} />
        <Tab className={classes.labeltext} label="SAVED" {...a11yProps(1)} />
        <Tab className={classes.labeltext} label="LIKED" {...a11yProps(2)} />
      </Tabs>
      <TabPanel className={classes.tab} value={value} index={0}>
        {[...posts.filter((ele) => ele.userId === ProfileUserId)].length > 0 ?
          [...posts.filter((ele) => ele.userId === ProfileUserId)]?.map((post) => (
            <Postcard key={post.id} allPost={post} />
          ))
          : <Empty path="/feed" />

        }
      </TabPanel>
      <TabPanel className={classes.tab} value={value} index={1}>
        {posts.filter((post) => post.bookmark.indexOf(ProfileUserId) > -1).length > 0 ?
          posts.filter((post) => post.bookmark.indexOf(ProfileUserId) > -1)?.map((post) => (
            <Postcard key={post.id} allPost={post} />
          )) : <Empty path="/bookmark" />}
      </TabPanel>
      <TabPanel className={classes.tab} value={value} index={2}>
        {posts.filter((post) => post.likes.indexOf(ProfileUserId) > -1).length > 0 ?
          posts.filter((post) => post.likes.indexOf(ProfileUserId) > -1)
            ?.map((post) => (
              <Postcard key={posts.id} allPost={post} />
            )) : <Empty path="/liked" />
        }
      </TabPanel>
    </div>
  )
}