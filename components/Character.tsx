import React, { FC } from 'react'
import Image from 'next/image'
import { Card, Badge, CardContent, CardMedia, Grid, makeStyles, Theme, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
    },
    badge: ({ status }: { status: string }) => ({
        '& .MuiBadge-badge': {
            right: -15,
            top: 15,
            backgroundColor: status === 'Alive'
                ? theme.palette.success.main
                : theme.palette.error.main
        }
    }),
}))

export interface CharacterProps {
    id: number
    created: Date
    episode: string[]
    gender: string
    image: string
    location: {
        name: string,
        url: string
    }
    origin: {
        name: string
        url: string
    }
    name: string
    species: string
    status: string
    type: string
    url: string
}

const CharacterCard: FC<CharacterProps> = ({ name, image, location, species, status }) => {
    const classes = useStyles({ status })

    return (
        <Card className={classes.root}>
            <CardMedia>
                <Image
                    src={image}
                    alt={name}
                    height={200}
                    width={200}
                    quality={1}
                    priority={false}
                />
            </CardMedia>
            <CardContent style={{ flex: '3' }}>
                <Grid container direction="column" justify="space-between">
                    <Grid item>
                        <Badge
                            variant="dot"
                            color="primary"
                            className={classes.badge}
                        >
                            <Typography noWrap variant="h6" gutterBottom>
                                {name}
                            </Typography>
                        </Badge>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                            Type:
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {species}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                            Last known location:
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {location.name}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default CharacterCard
