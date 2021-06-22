import React from 'react';
import { Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import img from "../../../utils/assets/gb1.jpg"
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
      height: 100,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  }),
);

export default function VoyageItemCard() {
    const classes = useStyles();

    return (
        <Card className={classes.root} elevation={1}>
            <CardMedia
                className={classes.cover}
                image={img}
                title="Live from space album cover"
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography color="textPrimary">likasi - kolwezi</Typography>
                    <Typography variant="body2" color="textSecondary">12h le 22/momment/lom </Typography>
                </CardContent>
            </div>
        </Card>
    );
}
