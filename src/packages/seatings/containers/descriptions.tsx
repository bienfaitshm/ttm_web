import { Box, Typography } from '@material-ui/core';
import * as React from 'react';
import SeatPlace, { SeatPlaceProps } from '../components/SeatPlace';

interface Props {

}

type SeatDescriptionPropsType = {
    seat?: SeatPlaceProps,
    name?: string
}

const SeatDescription: React.FC<SeatDescriptionPropsType> = (props) => {
    return (
        <Box style={{
            flexDirection: "row",
            // justifyContent:"space-between", 
            alignItems: "center",
            marginBottom: 10
        }}>
            <SeatPlace modeDev {...props.seat} />
            <Typography>{props.name}</Typography>
        </Box>
    )
}
export const DescriptionContainer: React.FC<Props> = (props) => {
    return (
        <Box>
            <Box style={{ marginBottom: 20 }}>
                <Typography style={{ fontWeight: "bold", marginBottom: 20 }}>Seats Information</Typography>
                <Box>
                    <SeatDescription seat={{
                        variant: "contained",
                        disabled: true,
                        modeDev: false,
                        info: {
                            type: "SEAT",
                            id: "null",
                            x: 2, y: 3, name: "null", idConfigCab: "null"
                        }
                    }} name="Place indisponible(deja prise)" />
                    <SeatDescription seat={{
                        variant: "contained",
                        color: "secondary",
                        modeDev: false,
                        info: {
                            type: "SEAT",
                            id: "null",
                            x: 2, y: 3, name: "null", idConfigCab: "null"
                        }
                    }} name="Place disponible" />
                    <SeatDescription seat={{
                        variant: "contained",
                        color: "primary",
                        modeDev: false,
                        info: {
                            type: "SEAT",
                            id: "null",
                            x: 2, y: 3, name: "null", idConfigCab: "null"
                        }
                    }} name="Place prise" />
                </Box>
            </Box>
            <Box style={{ marginBottom: 20 }}>
                <Typography style={{ fontWeight: "bold", marginBottom: 20 }}>Seats Note</Typography>
                <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas repellat libero id veniam pariatur? Velit illum explicabo ea, placeat, ducimus dolore aliquam id voluptatem nobis dignissimos nulla ullam, natus optio?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam odio iusto architecto earum explicabo neque. Nulla, eveniet quia cum ratione illo fugit aut quo fugiat deserunt quaerat vitae repellat maiores?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem id odio, omnis suscipit eaque dolorem ratione fuga mollitia aliquid pariatur, tempora harum et quisquam assumenda quos, iure ea itaque expedita.
                </Typography>
            </Box>
            <Box>
                <Typography style={{ fontWeight: "bold", marginBottom: 20 }}>Notice</Typography>
                <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas repellat libero id veniam pariatur? Velit illum explicabo ea, placeat, ducimus dolore aliquam id voluptatem nobis dignissimos nulla ullam, natus optio?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam odio iusto architecto earum explicabo neque. Nulla, eveniet quia cum ratione illo fugit aut quo fugiat deserunt quaerat vitae repellat maiores?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem id odio, omnis suscipit eaque dolorem ratione fuga mollitia aliquid pariatur, tempora harum et quisquam assumenda quos, iure ea itaque expedita.
                </Typography>
            </Box>
        </Box>
    )
}