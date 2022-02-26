import React from 'react'
import { Button as MuiButton, makeStyles, Theme, createStyles } from "@mui/material";
import theme from '../../assets/theme';
import { ThemeProvider } from '@mui/material';


const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        margin: theme.spacing(0.5)
    },
    label: {
        textTransform: 'none'
    }
}))

export default function Button(props: any) {

    const { text, size, color, variant, onClick, ...other } = props
    const classes = useStyles();

    return (
        <MuiButton
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            {...other}
            classes={{ root: classes.root, label: classes.label }}>
            {text}
        </MuiButton>
    )
}