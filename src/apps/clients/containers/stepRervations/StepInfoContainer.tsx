import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import DetailInfos ,{ RefTypeDetailInfos, DetailInfoInitialValue } from '../../components/DetailInfos';
import CardCostDetail from '../../components/CardCostDetail';

interface StepInfoContainerProps{

}

const StepInfoContainer = React.forwardRef<any, StepInfoContainerProps>((props, ref) => {
    // refrence of detail input
    const detailInputRef = React.useRef<RefTypeDetailInfos>(null);

    const onSubmit = React.useCallback((e:DetailInfoInitialValue)=>{

    },[]);

    return (
        <div>
            <Typography variant="h4" marginBottom ={2}>Adresse details</Typography>
            <Typography variant="body2" marginBottom ={2}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Blanditiis culpa excepturi delectus corporis, nobis, 
                error sit nisi modi eaque odit et officiis iste asperiores quo inventore aperiam. Nemo, ab voluptates!
            </Typography>
            <Grid container spacing={5}>
                <Grid item xs={8}>
                    <DetailInfos ref={detailInputRef} onSubmit = { onSubmit}  />
                </Grid>
                <Grid item xs={4}>
                    <CardCostDetail items={[
                        {
                            label : "adults",
                            value : "234 usd",
                            description :"23 adults pour deux trajet de kasungami"
                        },
                        {
                            label : "enfants",
                            value : "234 usd",
                            description :"23 adults pour deux trajet de kasungami"
                        },
                        {
                            label :"Total",
                            value :"2345 usd",
                            divider : true
                        }
                    ]}/>
                    <button onClick={()=>detailInputRef.current?.handleSubmit()}>Submit</button>
                </Grid>
            </Grid>
        </div>
    )
})

export default React.memo(StepInfoContainer);
