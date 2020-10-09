import { useIsFetching } from 'react-query'
import { makeStyles, Theme } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme: Theme) => ({
    progress: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        marginTop: +theme.mixins.toolbar.minHeight! + theme.spacing(1)
    }
}))

const GlobalLoadingIndicator = () => {
    const classes = useStyles()
    const isFetching = useIsFetching()

    return (
        <div className={classes.progress}>
            {isFetching
                ? <LinearProgress color="secondary" />
                : null}
        </div>
    )
}

export default GlobalLoadingIndicator