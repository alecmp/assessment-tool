import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import Controls from '../../controls/Controls';
import { Form, useForm } from '../../layout/useForm';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

export default function ControlForm(props) {
  const { edit, recordForEdit } = props;

  const classes = useStyles();

  const getValues = () => [
    { id: 1, title: 'None' },
    { id: 2, title: 'Yes' },
    { id: 3, title: 'No' }
  ];

  const initialFValues = {
    secControl: '',
    upguard: '',
    sucuri: ''
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('upguard' in fieldValues)
      temp.upguard = fieldValues.upguard ? '' : 'This field is required.';
    if ('sucuri' in fieldValues)
      temp.sucuri = fieldValues.sucuri ? '' : 'This field is required.';
    setErrors({
      ...temp
    });
    if (fieldValues == values) return Object.values(temp).every((x) => x == '');
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      edit(values, resetForm);
    }
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit
      });
  }, [recordForEdit]);

  const handleClose = () => {
    //setOpenPopup(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justify="center">
        <Grid item xs="auto">
          <Controls.Select
            label="UpGuard"
            name="upguard"
            value={values.upguard}
            onChange={handleInputChange}
            options={getValues()}
            error={errors.upguard}
          />
          <Controls.Select
            label="Sucuri"
            name="sucuri"
            value={values.sucuri}
            onChange={handleInputChange}
            options={getValues()}
            error={errors.sucuri}
          />

          <Grid
            container
            direction="row"
            justify="right"
            alignItems="right"
            spacing={3}
          >
            <Grid item xs={12} sm={12} align="right">
              <Button color="default" onClick={resetForm}>
                Reset
              </Button>

              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Form>
  );
}
