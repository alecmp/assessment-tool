import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import GitHubButton from 'react-github-btn';
import { connect } from 'react-redux';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { ReactComponent as Logo } from '../../img/Security-amico.svg';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Assessment Tool
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: '#f4f6f8'
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {},
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  buttons: {
    color: theme.palette.primary.dark,
    borderColor: theme.palette.primary.dark
  },
  logo: {
    transform: 'scale(0.8)'
  },
  title: {
    color: theme.palette.primary.dark,
    fontWeight: '200',
    letterSpacing: '.7rem'
  },
  subtitle: {
    color: theme.palette.primary.dark
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    backgroundColor: '#f4f6f8'
  },

  test: {
    padding: '0px'
  }
}));

const Landing = ({ isAuthenticated }) => {
  const classes = useStyles();

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="landing">
      <CssBaseline />
      <div className="landing-inner">


        <main>


          <div className={classes.heroContent}>
            <Container>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="flex-start"
              >
                <Grid item xs={12} sm={6}>
                  <Logo className={classes.logo} />
                </Grid>

                <Grid item xs={12} sm={6} className={classes.test}>
                  <Typography
                    className={classes.title}
                    component="h1"
                    variant="h3"
                    align="left"
                    gutterBottom
                  >
                    ASSESSMENT TOOL
                  </Typography>
                  <Typography
                    variant="h5"
                    align="left"
                    color="textSecondary"
                    paragraph
                  >
                    A Semi-automated tool for cyber security assessments.
                  </Typography>

                  <Button
                    size="large"
                    component={RouterLink}
                    to="/login"
                    variant="outlined"
                    className={classes.buttons}
                  >
                    Get started
                  </Button>
                </Grid>
              </Grid>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <GitHubButton
                      href="https://github.com/alecmp/RiskAssessment"
                      aria-label="View on GitHub"
                      data-size="large"
                    >
                      View on GitHub
                    </GitHubButton>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
        </main>

        <footer className={classes.footer}>
          <Copyright />
        </footer>

      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
