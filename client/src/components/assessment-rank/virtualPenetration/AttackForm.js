import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as virtualPenetrationService from '../../../services/virtualPenetrationService';
import Controls from '../../controls/Controls';
import { Form, useForm } from '../../layout/useForm';
import formatDate from '../../../utils/formatDate'

export default function AttackForm(props) {
  const { addOrEdit, recordForEdit } = props;

  const initialFValues = {
    id: uuidv4(),
    yearOfAttack: new Date(),
    severity: '',
    attackTypeId: '',
    dataRank: ''
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('yearOfAttack' in fieldValues)
      temp.yearOfAttack = fieldValues.yearOfAttack
        ? ''
        : 'This field is required.';
    if ('severity' in fieldValues)
      temp.severity = fieldValues.severity ? '' : 'This field is required.';
    if ('attackTypeId' in fieldValues)
      temp.attackTypeId =
        fieldValues.attackTypeId.length != 0 ? '' : 'This field is required.';
    if ('dataRank' in fieldValues)
      temp.dataRank =
        fieldValues.dataRank.length != 0 ? '' : 'This field is required.';
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
      console.log(typeof values.yearOfAttack)
      if (typeof values.yearOfAttack === "object") {
        values.yearOfAttack = values.yearOfAttack.getFullYear().toString();
      }
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
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Controls.DatePicker
            openTo="year"
            views={['year']}
            maxDate={new Date()}
            format="yyyy"
            name="yearOfAttack"
            label="Year of attack"
            value={values.yearOfAttack}
            onChange={handleInputChange}
            error={errors.yearOfAttack}
          />
        </Grid>

        <Grid item xs={12}>
          <Controls.Select
            label="Attack type"
            name="attackTypeId"
            value={values.attackTypeId}
            onChange={handleInputChange}
            options={virtualPenetrationService.getAttackTypeCollection()}
            error={errors.attackTypeId}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controls.Select
            label="Severity"
            name="severity"
            value={values.severity}
            onChange={handleInputChange}
            options={virtualPenetrationService.getSeverityCollection()}
            error={errors.severity}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controls.Select
            label="Data rank"
            name="dataRank"
            value={values.dataRank}
            onChange={handleInputChange}
            options={virtualPenetrationService.getDataRankCollection()}
            error={errors.dataRank}
          />
        </Grid>
      </Grid>

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
    </Form>
  );
}
