import Link from 'next/link'
import { FC } from 'react'
import { useRouter } from 'next/router'
import {
  AppBar,
  Button,
  Grid,
  makeStyles,
  Theme,
  Toolbar,
} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    height: `93.4vh`,
    padding: theme.spacing(2),
  },
}))

const MainApp: FC = ({ children }) => {
  const classes = useStyles()
  const router = useRouter()
  const routes = {
    rest: "/rest",
    graphql: "/graphql",
  }

  const isActive = (route, isDefault = false) => {
    if (router.route === '/' && isDefault) return 'secondary'

    return route === router.route
      ? 'secondary'
      : 'default'
  }


  return (
    <>
      <AppBar elevation={0} color="transparent" position="static">
        <Grid container justify="flex-end">
          <Toolbar>
            <Link href={routes.rest} prefetch>
              <Button color={isActive(routes.rest, true)}>Rest</Button>
            </Link>
            <Link href={routes.graphql} prefetch>
              <Button color={isActive(routes.graphql)}>GraphQL</Button>
            </Link>
          </Toolbar>
        </Grid>
      </AppBar>
      <div className={classes.content}>
        {children}
      </div>
    </>
  )
}

export default MainApp
