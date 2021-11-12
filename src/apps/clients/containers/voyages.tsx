import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import VoyageItemCard from '../components/voyageItem';
import { JourneyInterface } from '../../../utils/apis/graphql/types';

export interface VoyagesListViewProps{
    title ?: string,
    voyages ?: JourneyInterface[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        marginTop: theme.spacing(5)
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
            <Typography className={classes.title} variant="h6" color="primary">
                {props.title} voyages
            </Typography>
            <GridList 
                cellHeight="auto" 
                cols={2} 
                className = {classes.gridList}
                spacing={5}
            >
                {props.voyages?.map((item, index) => (
                <GridListTile key={index} cols={1} style={{padding:5}}>
                    <VoyageItemCard item={item}/>
                </GridListTile>
                ))}
            </GridList>
        </div>
    )
}

export default VoyagesListView
