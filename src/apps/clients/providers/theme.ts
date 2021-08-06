import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import pink from '@material-ui/core/colors/pink';

export const themeClient = createMuiTheme({
    palette: {
        primary: {
            main: deepPurple[500],
        },
        secondary: {
            main: pink[500],
        },
    },
});

export const themeClientWithFontSize = responsiveFontSizes(themeClient);