import React from 'react';
import { Redirect } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Player from './ReplayPage/Player';
import Team from './ReplayPage/Team';
import ReplayMeta from './ReplayPage/ReplayMeta';

import ActionChart from './ReplayPage/ActionChart';
import APMChart from './ReplayPage/APMChart';
import ReplayTabs from './ReplayPage/ReplayTabs';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  tabs: {
    padding: theme.spacing.unit * 2,
  },
});

class Replay extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }

  render() {
    const { replay, classes } = this.props;
    if (!replay) {
      return (<Redirect to="/" />);
    }
    const { players } = replay;
    const teams = replay.players.map(
      (player) => <Team>{<Player isObs={false} playerInfo={player}/>}</Team>
    );
    const actionChart = <ActionChart players={replay.players} />;
    const apmChart = <APMChart players={replay.players} />;
    return (
      <Grid container="container" justify="space-between">
        <Grid item="item" xs={6} >
          {teams}
        </Grid>
        <Grid item="item" xs={4}>
          <ReplayMeta
            meta={Object.assign({}, replay.meta, replay.header)}
            observers={replay.observers}
            filepath={replay.filepath}
            matchup={replay.matchup}
          />
        </Grid>
        <Grid item="item" xs={12} className={classes.tabs}>
          <ReplayTabs
            labels={['Absolute Actions', 'APM']}
            tabContents={[actionChart, apmChart]}
          />
        </Grid>
      </Grid>);
  }
}


Replay.propTypes = {
  replay: PropTypes.object,
  classes: PropTypes.object,
};

export default withStyles(styles)(Replay);
