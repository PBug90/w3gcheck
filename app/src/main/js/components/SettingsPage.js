import React from 'react';
import { reduxForm, Field } from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';
import {
  Checkbox,
  Select,
  TextField,
  Switch,
  FormControlLabel,
} from 'redux-form-material-ui';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';

class SettingsPage extends React.Component {
  render() {
    return (
      <form>
        <FormControl component="fieldset">
          <FormLabel component="legend">Assign responsibility</FormLabel>
          <FormGroup>
            <Field name="username" component={TextField} placeholder="Street" />
          </FormGroup>
        </FormControl>
      </form>
    );
  }
}


export default reduxForm({
  form: 'settingsForm',
})(SettingsPage);
