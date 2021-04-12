import Button from '@material-ui/core/Button';
import React from 'react';
import { Link as LinkRouter } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Button
        component={LinkRouter}
        to="/new-assessment"
        variant="contained"
        color="primary"
      >
        New Assessment
      </Button>
    </div>
  );
};

export default DashboardActions;
