import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, { useEffect } from 'react';
import * as customerProfileService from '../../../services/customerProfileService';
import Controls from '../../controls/Controls';
import { Form, useForm } from '../../layout/useForm';

export default function CustomerProfileForm(props) {
  const { addOrEdit, recordForEdit } = props;

  const initialFValues = {
    company: '',
    country: '',
    sector: ''
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('company' in fieldValues)
      temp.company = fieldValues.company ? '' : 'This field is required.';
    if ('country' in fieldValues)
      temp.country = fieldValues.country ? '' : 'This field is required.';
    if ('sector' in fieldValues)
      temp.sector = fieldValues.sector ? '' : 'This field is required.';

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
      addOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit
      });
  }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justify="center">
        <Grid item xs="auto">
          <Controls.Input
            name="company"
            label="Company"
            value={values.company}
            onChange={handleInputChange}
            error={errors.company}
          />
          <Controls.Select
            label="Country"
            name="country"
            value={values.country}
            onChange={handleInputChange}
            options={customerProfileService
              .getCountryCollection()
              .sort((a, b) => a.title.localeCompare(b.title))}
            error={errors.country}
          />
          <Controls.Select
            label="Sector"
            name="sector"
            value={values.sector}
            onChange={handleInputChange}
            options={customerProfileService.getSectorCollection()}
            error={errors.sector}
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
