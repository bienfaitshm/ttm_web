import React from 'react'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid'
import { createStyles, makeStyles, Theme,  } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'

import bgImage from "../../../utils/assets/gb1.jpg"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
        backgroundImage : "url("+bgImage+")",
    },
    bg:{
        backgroundColor : "#e0e4f773",
        color : "#fff",
        height: "70vh"
    },
    pt3:{
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3) 
    },
    title :{
        textShadow: "1px 1px 4px black",
    }
  }),
);
const SearchContainer:React.FC = (props) => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <div className={classes.bg}>
                <Container maxWidth="md">
                    <div className={classes.pt3}>
                        <Typography className={classes.title} variant="h4">Reserver vos voyage avec Ttm machin truc</Typography>
                    </div>
                    <Grid container spacing={4}>
                        <Grid item xs={8} md={true} sm={true}>{props?.children}</Grid>
                        <Grid item xs={4} md={true} sm={true}>
                            <h1>Ttm nos services</h1>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    )
}

export default SearchContainer
