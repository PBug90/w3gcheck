import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1,
  },
};

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node,
};

class CenteredTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, value) {
    this.setState({ value });
  }

  render() {
    const { classes, labels, tabContents } = this.props;
    const labelItems = labels.map((label) => <Tab label={label}>{label}</Tab>);
    const activeTab = <TabContainer>{tabContents[this.state.value]}</TabContainer> || <div />;
    return (
      <Paper className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {labelItems}
        </Tabs>
        {activeTab}

      </Paper>
    );
  }
}

CenteredTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  labels: PropTypes.array,
  tabContents: PropTypes.array,
};

CenteredTabs.defaultProps = {
  labels: [],
  tabContents: [],
};

export default withStyles(styles)(CenteredTabs);
