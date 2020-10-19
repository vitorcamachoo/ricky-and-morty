import Link from 'next/link'
import {
  AppBar,
  Button,
  Grid,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    height: `93.4vh`,
    padding: theme.spacing(2),
  },
}))

const Characters = ({ children }) => {
  const classes = useStyles()

  return (
    <>
      <AppBar position="static">
        <Grid container>
          <Grid item xs={6}>
            <Toolbar>
              <Typography>Rest:</Typography>
              <Link href="/rest/episodes">
                <Button>Episodes</Button>
              </Link>
              <Link href="/rest/characters">
                <Button>Characters</Button>
              </Link>
              <Link href="/rest/location">
                <Button>Location</Button>
              </Link>
            </Toolbar>
          </Grid>
          <Grid item xs={6}>
            <Toolbar>
              <Typography>GraphQL:</Typography>
              <Link href="/graphql/episodes">
                <Button>Episodes</Button>
              </Link>
              <Link href="/graphql/characters">
                <Button>Characters</Button>
              </Link>
              <Link href="/graphql/location">
                <Button>Location</Button>
              </Link>
            </Toolbar>
          </Grid>
        </Grid>
      </AppBar>
      <div className={classes.content}>{children}</div>
    </>
  )
}

export default Characters
