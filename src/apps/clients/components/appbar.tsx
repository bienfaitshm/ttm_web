import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    mt:{
        marginTop: theme.spacing(4)
    }
  }),
);

export default function CLientAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="fixed" elevation={0}>
                <Container maxWidth="md">
                <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Ttm
                </Typography>
                    <div className={classes.mt}>
                        <Toolbar>
                            <Typography variant="subtitle1" className={classes.menuButton}>
                                Home
                            </Typography>
                            <Typography variant="subtitle1" className={classes.menuButton}>
                                Programmes
                            </Typography>
                            <Typography variant="subtitle1" className={classes.menuButton}>
                                Login
                            </Typography>
                        </Toolbar>
                    </div>
                </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}
