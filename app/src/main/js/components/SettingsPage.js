import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
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
    width: 400,
  },

});
const { dialog } = require('electron').remote;

class SettingsPage extends React.Component { //eslint-disable-line
  constructor(props) {
    super(props);
    this.showDialog = this.showDialog.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  showDialog(formValue) {
    const result = dialog.showOpenDialog({});
    if (result) { this.props.change(formValue, result[0]); }
  }

  onSubmit(newSettings) {
    this.props.dispatch(saveSettings(newSettings));
  }

  render() {
    const { classes, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)} className={classes.container} >
        <FormControl component="fieldset" className={classes.control}>
          <FormLabel component="legend">Warcraft III Executable Path</FormLabel>
          <FormGroup>
            <Field
              name="wc3FilePath"
              component={TextField}
              placeholder="Street"
              InputProps={{
            readOnly: true,
          }}
            />
            <Button onClick={() => this.showDialog('wc3FilePath')}>Set Path</Button>
          </FormGroup>
        </FormControl>

        <FormControl component="fieldset" className={classes.control}>
          <Button type="submit" >Save Settings</Button>
        </FormControl>
      </form>
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
