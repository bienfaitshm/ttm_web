import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import ClientAppBar from "../components/appbar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
        position:"relative",
        height:"100vh"
    },
    children :{
        marginTop : theme.spacing(3)
    }
  }),
);

const Withappbar:React.FC = (props) => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <ClientAppBar />
            <Toolbar />
            <div className={classes.children}>
                {props?.children}
            </div>
        </div>
    )
}

export default Withappbar
