import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { fetchGists, fetchOneGist } from "../../store/gists/thunks";
import { Box, Input, Typography } from '@mui/material';

const HomepageComponent = (props) => {
    const dispatch = useDispatch();
    const gists = useSelector((state) => state.gists.gists);
    
    useEffect(() => {
        dispatch(fetchGists({user: "emreoemreo"}));
        
        dispatch(fetchOneGist());
    }, []);

    return (
        <Box>
            <Typography sx={{textAlign: "center"}} variant="h1" gutterBottom>
                Gists from everyone!
            </Typography>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: "10px",
            }}>
                <Typography variant="p" gutterBottom>
                    Just search by github username
                </Typography>
                <Input id="outlined-basic" label="Outlined" variant="outlined" />
            </Box>
            {gists.map((el) => {
                return el}
                )}
        </Box>
    );
}

export default HomepageComponent;