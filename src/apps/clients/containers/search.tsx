import React from 'react'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid'
import { createStyles, makeStyles, Theme,  } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'

import bgImage from "../../../utils/assets/gb1.jpg"
import { useAuth } from '../providers/hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
        backgroundImage : "url("+bgImage+")",
    },
    bg:{
        backgroundColor : "#e0e4f773",
        color : "#fff",
        paddingBottom: theme.spacing(3),
    },
    pt3:{
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(3) 
    },
    title :{
        textShadow: "1px 1px 4px black",
    }
  }),
);
const SearchContainer:React.FC = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.bg}>
                <Container maxWidth="md">
                    <div className={classes.pt3}>
                        <Typography className={classes.title} variant="h4">
                            Voyager devient encore plus simple!
                        </Typography>
                    </div>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={8} sm={8}>{props?.children}</Grid>
                        <Grid item xs={12} md={4} sm={4}>
                            <h1>Ttm nos services</h1>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    )
}

export default SearchContainer
