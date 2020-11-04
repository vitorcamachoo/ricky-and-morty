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
import { useAuth } from 'hooks/firebase'

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    height: `93.4vh`,
    padding: theme.spacing(2),
  },
}))

const MainApp: FC = ({ children }) => {
  const { user, signInWithGoogle, logout } = useAuth()
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
            <Link href={routes.rest}>
              <Button color={isActive(routes.rest, true)}>Rest</Button>
            </Link>
            <Link href={routes.graphql}>
              <Button color={isActive(routes.graphql)}>GraphQL</Button>
            </Link>
            {
              user
                ? <Button onClick={logout}>Logout</Button>
                : <Button onClick={signInWithGoogle}>Login</Button>
            }
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
