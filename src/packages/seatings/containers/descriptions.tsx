import * as React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import SeatPlace, { SeatPlaceProps } from '../components/SeatPlace';

interface Props {

}

type SeatDescriptionPropsType = {
    seat?: SeatPlaceProps,
    name?: string
}

const SeatDescription: React.FC<SeatDescriptionPropsType> = (props) => {
    return (
        <Stack flexDirection="column" marginBottom={2}>
            <SeatPlace {...props.seat} modeDev />
            <Typography variant="caption" textAlign="center"marginTop={1}>{props.name}</Typography>
        </Stack>
    )
}
export const DescriptionContainer: React.FC<Props> = (props) => {
    return (
        <Box>
            <Box style={{ marginBottom: 20 }}>
                <Typography variant="subtitle2" marginBottom={2}>Seats Information</Typography>
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
                    }} name="Place indisponible" />
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
                <Typography variant="subtitle2" marginBottom={2}>Seats Note</Typography>
                <Typography variant="caption">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas repellat libero id veniam pariatur? Velit illum explicabo ea, placeat, ducimus dolore aliquam id voluptatem nobis dignissimos nulla ullam, natus optio?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam odio iusto architecto earum explicabo neque. Nulla, eveniet quia cum ratione illo fugit aut quo fugiat deserunt quaerat vitae repellat maiores?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem id odio, omnis suscipit eaque dolorem ratione fuga mollitia aliquid pariatur, tempora harum et quisquam assumenda quos, iure ea itaque expedita.
                </Typography>
            </Box>
            <Box>
                <Typography variant="subtitle2" marginBottom={2}>Notice</Typography>
                <Typography variant="caption">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas repellat libero id veniam pariatur? Velit illum explicabo ea, placeat, ducimus dolore aliquam id voluptatem nobis dignissimos nulla ullam, natus optio?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam odio iusto architecto earum explicabo neque. Nulla, eveniet quia cum ratione illo fugit aut quo fugiat deserunt quaerat vitae repellat maiores?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem id odio, omnis suscipit eaque dolorem ratione fuga mollitia aliquid pariatur, tempora harum et quisquam assumenda quos, iure ea itaque expedita.
                </Typography>
            </Box>
        </Box>
    )
}