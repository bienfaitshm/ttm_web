import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import VoyageItemCard from '../components/voyageItem';

export interface VoyagesListViewProps{
    title ?: string,
    voyages ?: any[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    },
    gridList:{
        // marginTop : theme.spacing(2),
    },
    title :{
        marginTop : theme.spacing(3),
        marginBottom : theme.spacing(3)
    }
  }),
);


const VoyagesListView :React.FC<VoyagesListViewProps> = (props) => {
    const classes = useStyles();
    return (
        <div className = {classes.root}>
            <Typography className={classes.title} variant="h6" color="primary">{props.title}</Typography>
            <GridList 
                cellHeight="auto" 
                cols={2} 
                className = {classes.gridList}
                spacing={5}
            >
                {props.voyages?.map((tile, index) => (
                <GridListTile key={index} cols={1}>
                    <VoyageItemCard />
                </GridListTile>
                ))}
            </GridList>
        </div>
    )
}

export default VoyagesListView
