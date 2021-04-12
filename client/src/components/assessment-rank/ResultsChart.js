import {
    makeStyles,
    Paper
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Radar } from 'react-chartjs-2';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    root: {
        flexGrow: 1
    }
}));

const RadarChart = (results) => {

    const classes = useStyles();
    const getData = () => {
        const data = [];
        for (var i = 0; i < results.results.length; i++) {

            data[i] = results.results[i].realValue / 500;
        }


        return data;
    };

    const getAreaData = () => {
        const data = [];
        for (var i = 0; i < results.results.length; i++) {
            data[i] = results.results[i].realValueOfArea / 500;
        }


        return data;
    };

    const data = {
        labels: [
            'XSS',
            'Phishing',
            'Man in the middle',
            'DNS hijacking',
            'DoS/DDoS',
            'XST',
            'Spam',
            'Drive-by-download',
            'Code Injection',
            'Spearphishing Attachment',
            'Command-Line Interface',
            'PowerShell',
            'Scripting',
            'Connection Proxy',
            'Brute Force',
            'Process Discovery',
            'Remote File Copy',
            'User Execution',
            'Standard Application Layer Protocol',
            'File and Directory Discovery',
            'Drive-by Compromise',
            'Exploitation for Client Execution',
            'Data Encrypted',
            'Credential Dumping',
            'Valid Accounts',
            'Data Compressed'
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
            },

            {
                label: 'Assessment in your area',
                backgroundColor: 'rgba(54,162,235,0.2)',
                borderColor: 'rgba(54,162,235,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(54,162,235,0.4)',
                hoverBorderColor: 'rgba(54,162,235,1)',
                data: getAreaData()
            }
        ]
    };

    return (
        <div>
            <Paper className={classes.pageContent}>
                <Radar
                    data={data}
                    // width={650}
                    // height={50}
                    options={{
                        maintainAspectRatio: true,
                        responsive: true
                    }}
                />
            </Paper>
        </div >
    );
};

RadarChart.propTypes = {
    results: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    results: state.assessment.assessment.results
});


export default connect(mapStateToProps, {})(RadarChart);
