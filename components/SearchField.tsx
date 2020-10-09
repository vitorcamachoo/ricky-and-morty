import { FC, memo, useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core"

export interface SearchFieldProps {
    label: string
    onSubmit: Function
}

const SearchField: FC<SearchFieldProps> = memo(({ label, onSubmit }) => {
    const [filter, setFilter] = useState({})
    const handleChange = (event) => {
        const { name, value } = event.target
        return setFilter({
            ...filter,
            [name]: value
        })
    }

    return (
        <Grid>
            <Grid container xl={3} lg={5} md={6} sm={10} xs={12} item justify="space-around">
                <TextField size="small" name="name" label={label} variant="outlined" onChange={handleChange} />
                <Button onClick={() => onSubmit(filter)} size="small" variant="contained" color="primary">Search</Button>
            </Grid>
        </Grid>
    )
})

export default SearchField