import React from 'react'
import { Typography } from '@material-ui/core';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ClientPlaceReservations, CabineConfigurationInterface, CabineFuncActionType, handlerDispatchFuncType } from "../../../packages/seatings";

export interface SeatPassgerSelectionProps{
    config ?: Partial<CabineConfigurationInterface>,
    users ?: any[],
}

const SeatPassgerSelection:React.FC<SeatPassgerSelectionProps> = ({users, config}) => {
    const  dispatcherRef = React.useRef<any>()

    const [selected, setSelected] = React.useState<any>(undefined);
    const [open, setOpen] = React.useState(false);

    const handlerReservation : CabineFuncActionType = React.useCallback(
        (reservations, type, seat, user, callback)=>{
            console.log(reservations, type, seat, user);
            setOpen(true)
        // (callback && type && seat ) && callback(type, {user, seat : seat.id})
    },[]);

    // 
    const handleClose = () => {
        setOpen(false);
        console.log("function", dispatcherRef.current)
    };
    // 
    React.useEffect(() => {
        if(users && users?.length > 0){
            const fistUser = users[0];
            setSelected(fistUser);
        }
    }, [users]);
    return (
        <div>
            <Typography>Seat Reservation</Typography>
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
                    Reservation de places
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button onClick={handleClose} autoFocus>
                        Valider
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default SeatPassgerSelection
