import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import logoTtm from "../../../utils/assets/ttm_logo.png"
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
    },
    imgLogo:{
        height :85,
        width: "auto",
    }
  }),
);


const CLientAppBar = React.forwardRef<any,any>(function MyAppBar(props, ref) {
    const classes = useStyles();
    const [state, setState] = React.useState(false);
    const matches = useMediaMobile()
    return (
        <>
        <AppBar position="fixed" elevation={0}  {...props} role="appbar" ref={ref}>
            <Container maxWidth="md">
            <Toolbar style={{paddingRight:0, paddingLeft:0}}>
                <div className={classes.title}>
                    <img className={classes.imgLogo} src={logoTtm} alt="Ttm"/>
                </div>
                {
                    matches ? (
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
                    ):(
                        <IconButton style={{color:"#fff"}} onClick={()=>setState(true)}>
                            <MenuIcon />
                        </IconButton>
                    )
                }
                </Toolbar>
                </Container>
            </AppBar>
            <SwipeableDrawer
                anchor="left"
                open={state}
                onClose={()=>setState(false)}
                onOpen={()=>{
                    matches && setState(true)
                }}
            >
                <h1>Hello menu</h1>
            </SwipeableDrawer>
        </>
    );
})
export default CLientAppBar;

export const useMediaMobile = ()=>{
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints.up('sm'));
}