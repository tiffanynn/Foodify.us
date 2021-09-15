import React from "react"
import {Grid, Button} from "@material-ui/core"

export default function RecipeInfo(){
    return(
        <Grid 
            container
            direction = "row"
            spacing={2}>
                <Grid item direction="column" md={3}>
                    <div>Profile Pic</div>
                    <div><Button class ="MuiButton-root MuiButton-outlined">Follow</Button></div>
                    <div>User's name</div>
                </Grid>
                <Grid item container direction="column" md={8}>
                    <Grid item container direction="row" justifyContent="space-between">
                        <Grid item direction="column">
                            <div>Hashtag</div>
                            <div>Post title</div>
                            <div>Date and preparation time</div>
                        </Grid>
                        <Grid item>
                            <div>Number of stars review</div>
                        </Grid>
                    </Grid>
                    <Grid item container direction="row">
                        <Grid item>
                            <div>Picture</div>
                        </Grid>
                        <Grid item container direction="column">
                            <Grid item container direction="row">
                                <Grid item>
                                    <div>List of ingredients</div>
                                </Grid>
                                <Grid item>
                                    <div>Tags (pescatarian, paleo)</div>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <div>Instructions</div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
        </Grid>
    )
}

