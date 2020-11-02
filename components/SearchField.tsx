import React, { FC, memo } from 'react'
import { createStyles, debounce, IconButton, InputBase, makeStyles, Paper, Theme } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';

export interface SearchFieldProps {
  label: string
  onChange: (values: { [key: string]: string }) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    input: {
      flex: 1,
      marginLeft: theme.spacing(2),
    },
    iconButton: {
      padding: theme.spacing(1),
    },
  }),
);

const SearchField: FC<SearchFieldProps> = memo(({ label, onChange }) => {
  const classes = useStyles()
  const handleChange = debounce(({ target: { name, value } }) => onChange({ [name]: value }), 500)

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        name="name"
        placeholder={label}
        className={classes.input}
        inputProps={{ 'aria-label': label }}
        onChange={handleChange}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  )
})

export default SearchField
