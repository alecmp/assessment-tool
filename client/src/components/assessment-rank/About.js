import {
    makeStyles,
    Paper,
    Typography
} from '@material-ui/core';
import React from 'react';


const useStyles = makeStyles((theme) => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    root: {
        flexGrow: 1
    }
}));

const About = () => {

    const classes = useStyles();


    return (
        <div>
            <Paper className={classes.pageContent}>
                <Typography variant="h4" gutterBottom>
                    About
      </Typography>
                <Typography variant="body1" align='justify' gutterBottom>
                    A cyber security risk assessment is the process of identifying, analysing and evaluating risk. It helps you to ensure that the cyber security controls you choose are appropriate to the risk that your organisation is exposed to.

                    Without a risk assessment to inform your cyber security choices, you could waste time, effort and resources. It’s not useful to implement measures used to defend your company against events that are unlikely to occur or won’t impact your organisation.

                    Likewise, it is possible that you will underestimate or overlook risks that could cause significant damage. This is why so many best-practice frameworks, standards and laws including the GDPR (General Data Protection Regulation) and DPA (Data Protection Act) 2018 require the conduction of a risk assessment.

                    A cyber security risk assessment identifies the information assets that could be affected by a cyber attack (such as hardware, systems, laptops, customer data and intellectual property), and then identifies the risks that could affect those assets.

                    A risk estimation and evaluation are usually performed, followed by the selection of controls to treat the identified risks.

                    It is important to continually monitor and review the risk environment to detect any changes in the context of the organisation, and to maintain an overview of the complete risk management process.
                </Typography>
            </Paper>
        </div >
    );
};



export default About;
