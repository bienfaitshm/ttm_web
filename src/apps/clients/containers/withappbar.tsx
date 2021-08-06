import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ClientAppBar, { useMediaMobile } from "../components/appbar";
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';

interface Props {
    window?: () => Window;
    children: any;
  }
  
function HideOnScroll(props: Props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });


    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}
  
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    children :{
        marginTop : theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(3),
        },
    }
  }),
);

export default function Withappbar(props: Props){
    const classes = useStyles()
    const matches = useMediaMobile()
    return (
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll {...props}>
                <ClientAppBar />
            </HideOnScroll>
            {matches && <Toolbar />}
            <div className={classes.children}>
                {props?.children}
            </div>      
        </React.Fragment>
      );
}