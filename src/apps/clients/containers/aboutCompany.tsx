import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Theme, createStyles, makeStyles} from '@material-ui/core/styles';


export interface AboutCompanyProps{

}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop : theme.spacing(3),
      padding : theme.spacing(2),
      backgroundColor : theme.palette.background.paper,
    },
    title:{
      marginBottom : theme.spacing(2),
    }
  }),
);
const AboutCompany :React.FC<AboutCompanyProps> = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Typography className={classes.title} variant="h6" color="textPrimary">Apropos de Ttm company</Typography>
            <div>
                <Typography component="p" variant="body1" color="textSecondary">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui incidunt accusamus, consequuntur, doloremque quasi distinctio error, nam nobis enim rerum pariatur corrupti nesciunt ad illo minus eius quas iusto maiores?
                </Typography>
                <Typography component="p" variant="body1" color="textSecondary">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui incidunt accusamus, consequuntur, doloremque quasi distinctio error, nam nobis enim rerum pariatur corrupti nesciunt ad illo minus eius quas iusto maiores?
                </Typography>
                <Typography component="p" variant="body1" color="textSecondary">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui incidunt accusamus, consequuntur, doloremque quasi distinctio error, nam nobis enim rerum pariatur corrupti nesciunt ad illo minus eius quas iusto maiores?
                </Typography>
                <Typography component="p" variant="body1" color="textSecondary">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui incidunt accusamus, consequuntur, doloremque quasi distinctio error, nam nobis enim rerum pariatur corrupti nesciunt ad illo minus eius quas iusto maiores?
                </Typography>
            </div>
        </div>
    )
}

export default AboutCompany
