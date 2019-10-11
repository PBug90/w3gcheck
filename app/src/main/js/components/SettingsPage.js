import React from 'react';
import { reduxForm, Field } from 'redux-form';
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { connect, compose } from 'react-redux';
import { saveSettings } from '../actions/settings';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  control: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    width: 600,
  },

});
const { dialog } = require('electron').remote;

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
)

class SettingsPage extends React.Component { //eslint-disable-line
  constructor(props) {
    super(props);
    this.showDialog = this.showDialog.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  showDialog(formValue, dialogOptions = []) {
    dialog.showOpenDialog({ properties: dialogOptions })
    .then((val) => {
      if (val.canceled === false){
        this.props.change(formValue, val.filePaths[0]);
      }
    });    
  }

  onSubmit(newSettings) {
    this.props.dispatch(saveSettings(newSettings));
  }

  render() {
    const { classes, handleSubmit } = this.props;
    return (
      <Paper>
        <form onSubmit={handleSubmit(this.onSubmit)} className={classes.container} >
          <FormControl component="fieldset" className={classes.control}>
            <FormLabel component="legend">Warcraft III Executable Path</FormLabel>
            <Grid container >
              <Grid item xs={8}>
                <FormGroup>
                  <Field
                    name="wc3FilePath"
                    component={renderTextField}
                    InputProps={{
                    readOnly: true,
                  }}
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={4}>
                <Button onClick={() => this.showDialog('wc3FilePath', ['openFile'])}>Set Path</Button>
              </Grid>
            </Grid>

          </FormControl>

          <FormControl component="fieldset" className={classes.control}>
            <FormLabel component="legend">Last Replay Directory Path</FormLabel>
            <Grid container >
              <Grid item xs={8}>
                <FormGroup>
                  <Field
                    name="lastReplayDirectory"
                    component={renderTextField}
                    InputProps={{
                    readOnly: true,
                  }}
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={4}><Button onClick={() => this.showDialog('lastReplayDirectory', ['openDirectory'])}>Set Path</Button></Grid>
            </Grid>
          </FormControl>
          <Divider />
          <FormControl component="fieldset" className={classes.control}>
            <Button type="submit" variant="contained" color="primary" >Save Settings</Button>
          </FormControl>
        </form>
      </Paper>
    );
  }
}

SettingsPage.propTypes = {
  classes: PropTypes.object,
  change: PropTypes.func,
  dispatch: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default connect(state => ({ initialValues: state.settings }))(reduxForm({
  form: 'settingsForm',
})(withStyles(styles)(SettingsPage)));
