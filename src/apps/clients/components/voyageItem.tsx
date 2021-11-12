import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Tooltip from '@material-ui/core/Tooltip';
// import moment from "moment";
import img from "../../../utils/assets/gb1.jpg"
import { JourneyInterface } from '../../../utils/apis/graphql/types';
import { useHistory } from 'react-router-dom';
import { useSeletedJourney } from '../providers/services/steperReservation';


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
    main: {
      display: 'flex',
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

export default function VoyageItemCard(props: { item: JourneyInterface }) {
  const classes = useStyles();
  const history = useHistory();
  // const handlerSeletedJourney = useSeletedJourney();

  // const routingString = React.useMemo(() => {
  //   if (props.item.direct) return "dev";
  //   return "ok"
  // }, [props.item.direct])

  // const handlerReserve = React.useCallback(() => {
  //   handlerSeletedJourney(props.item)
  //   // history.push("/res")
  // }, [handlerSeletedJourney, props.item]);

  return (
    <Card className={classes.root} elevation={1}>
      <CardMedia
        className={classes.cover}
        image={img}
        title="Live from space album cover"
      />
      <div className={classes.main}>
        <CardContent className={classes.content}>
          <Typography color="textPrimary">
            Voyage N: {props.item.numJourney}
          </Typography>
          <Typography variant="body2" color="textSecondary">{props.item.price} {props.item.devise}</Typography>
          <Typography variant="body2" color="textSecondary">
            Depart le <b>{props.item.dateDeparture}</b> à <b>{props.item.hoursDeparture}</b>
          </Typography>
        </CardContent>
        <CardActions>
          {/* <Tooltip
            title="Reserver"
            placement="left"
            arrow>
            <IconButton onClick={handlerReserve}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Tooltip> */}
        </CardActions>
      </div>
    </Card>
  );
}
