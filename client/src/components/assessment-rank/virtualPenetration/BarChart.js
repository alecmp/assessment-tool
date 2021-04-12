import React, { Component } from 'react';
import { Bar, defaults } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import * as virtualPenetrationService from '../../../services/virtualPenetrationService';

const BarChart = (virtualpenetration) => {
  const getData = () => {
    const data = ['5', '5', '5', '5', '5', '5', '5', '5', '5', '5'];
    for (var i = 0; i < data.length; i++) {
      virtualPenetrationService
        .getGroupedRecords(virtualpenetration.virtualpenetration)
        .forEach(function (arrayItem) {
          if (
            arrayItem.id ===
            virtualPenetrationService.getAttackTypeCollection()[i].id
          )
            data[i] = arrayItem.assessment / 5;
        });
    }

    return data;
  };

  const data = {
    labels: [
      'Data Encrypted',
      'Spearphishing Attachment',
      'PowerShell',
      'Data Compressed',
      'Scripting',
      'Command-Line Interface',
      'Spam',
      'Connection Proxy',
      'Remote File Copy',
      'User Execution'
    ],

    datasets: [
      {
        label: 'Assessment',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: getData()
      }
    ]
  };

  return (
    <div>
      <Bar
        data={data}
        // width={650}
        // height={50}
        options={{
          maintainAspectRatio: true,
          responsive: true,
          scales: {
            yAxes: [{
              ticks: {
                max: 5,
                min: 0
              }
            }]
          }
        }}
      />
    </div>
  );
};

BarChart.propTypes = {
  virtualpenetration: PropTypes.array.isRequired
};

export default BarChart;
