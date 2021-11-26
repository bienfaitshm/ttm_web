import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from "@mui/material/Grid";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DoneIcon from '@mui/icons-material/Done';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ClientPlaceReservations, CabineConfigurationInterface, CabineFuncActionType, SeatsInterface, TrajetType } from "../../../packages/seatings";
import SeatPlace from "../../../packages/seatings/components/SeatPlace";


export interface SeatPassgerSelectionProps{
    config ?: Partial<CabineConfigurationInterface>;
    users ?: any[];
    onSelectPlace ?: ( e:any )=>void;
}

const SeatPassgerSelection:React.FC<SeatPassgerSelectionProps> = ({users, config, onSelectPlace}) => {
    const  dispatcherRef = React.useRef<any>();
    const [open, setOpen] = React.useState<boolean>(false);
    const [place, setPlace] = React.useState<SeatsInterface | undefined | null>(null)
    const [selected, setSelected] = React.useState<any>(undefined);

    const handleOpen = React.useCallback(()=>setOpen(true),[]);
    // 
    const handleClose = React.useCallback(()=>{
        setOpen(false);
        setPlace(null);
    },[]);
    // 

    const handlerReservation : CabineFuncActionType = React.useCallback(
        (reservations, type, seat, user )=>{
            console.log(reservations, type, seat, user);
            setPlace(seat);
            handleOpen();
    },[handleOpen]);

   

    const handlerValidate = React.useCallback(()=>{
        const values = dispatcherRef.current.values;
        // dispatch reservation of passenger
        values  && dispatcherRef.current?.handlerDispatch(values.type, values.data);
        // action props on selected passenger
        onSelectPlace && onSelectPlace(values);
        handleClose()
    },[handleClose, onSelectPlace])

    React.useEffect(() => {
        if(users && users?.length > 0){
            const fistUser = users[0];
            setSelected(fistUser);
        }
    }, [users]);

    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={3}>
                    <Typography variant="subtitle2">Passagers</Typography>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {users?.map((value, index) => {
                            const labelId = `checkbox-list-label-${value?.id}`;

                            return (
                                <ListItem
                                    key={index}
                                    // secondaryAction={
                                    // <IconButton edge="end" aria-label="comments">
                                    //     <CommentIcon />
                                    // </IconButton>
                                    // }
                                    disablePadding
                                >
                                    <ListItemButton role={undefined} onClick={()=>setSelected(value)} dense>
                                    
                                    <ListItemIcon>
                                        {
                                        value?.id === selected?.id && (
                                            <DoneIcon fontSize="small" color="success"/>
                                        )}
                                    </ListItemIcon>
                                        <ListItemText 
                                            id={labelId} 
                                            primary= {value.firstname}
                                            secondary ={value.lastname}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </Grid>
                <Grid item xs={9}>
                    <ClientPlaceReservations
                        ref = { dispatcherRef }
                        configuration = {config}
                        user = { selected?.id || ""}
                        actions = { handlerReservation }      
                    />
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            Reservation places
                        </DialogTitle>
                        <DialogContent>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <Typography component="h4" variant="h6">Passanger</Typography>
                                    <br />
                                    <Typography variant="subtitle2">Nom : {selected?.firstname}</Typography>
                                    <Typography variant="subtitle2">Postnom : {selected?.middlename}</Typography>
                                    <Typography variant="subtitle2">Prenom : {selected?.lastname}</Typography>
                                    <Typography variant="subtitle2">Type : {selected?.typeUser}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <br />
                                    <Stack flexDirection="column" alignItems="center">
                                        <SeatPlace 
                                            style={{height:100, width:100, marginBottom: 5}}
                                            modeDev 
                                            variant="contained" 
                                            color="success"
                                        />
                                        <Typography variant="subtitle2">{place?.id} / {place?.name}</Typography>
                                    </Stack>                            
                                </Grid>
                            </Grid>
                            <br />
                            <DialogContentText id="alert-dialog-description" variant="caption" justifyContent="stretch">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque enim ipsam assumenda.
                                Accusantium tempora molestiae fugiat officia. Aperiam officiis voluptate, 
                                suscipit itaque expedita, laborum in qui, exercitationem blanditiis a consequuntur.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Annuler</Button>
                            <Button onClick={handlerValidate} autoFocus>
                                Valider
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Grid>
        </div>
    )
}

export default SeatPassgerSelection
