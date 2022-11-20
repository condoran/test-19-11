import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { fetchGists, fetchOneGist } from "../../store/gists/thunks";
import { Box, Button, Input, Typography, Tooltip } from '@mui/material';
import extensionTypeMap from "../../utils/filetypes";

const HomepageComponent = (props) => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState(null);
    const [rows, setRows] = useState(30);
    const [page, setPage] = useState(1);
    const gists = useSelector((state) => state.gists.gists);

    
    
    useEffect(() => {
        if (username)
            dispatch(fetchGists({user: username, page: page, per_page: rows}));
    }, [rows, page]);

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
            }}
            >
                <Typography variant="p" gutterBottom>
                    Just search by github username
                </Typography>
                <Input value={username} onChange={(e) => {setUsername(e.target.value)}} sx={{color: "white", '&::before': {borderColor: "white"}}} id="outlined-basic" label="Outlined" variant="outlined" />
                <Button onClick={() => {dispatch(fetchGists({user: username, page: page, per_page: rows}))}}>Search</Button>
            </Box>
            <Box sx={{margin: "40px 0", border: "1px solid white", borderRadius: "5px", paddingBottom: "50px", position: "relative"}}>
                {gists.length > 0 ? (gists.map((el) => {
                    return Object.values(el?.files).length > 0 && Object.values(el?.files)?.map((elem) => {return (
                        <Box onClick={() => {window.open(elem?.raw_url, '_blank', 'noopener,noreferrer');}} sx={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", cursor: "pointer", padding: "10px", gap: "20px", borderBottom: "1px solid white" }} key={el?.id}>
                            <Box>{elem?.filename || "-"}</Box>
                            <Box sx={{display: "flex", color: "white", border: "1px solid #36A1FF", width: "30px", height: "30px", borderRadius: "50%", backgroundColor: "#36A1FF", textAlign: "center", alignItems: "center", justifyContent: "center", alignContent: "center", }}>{extensionTypeMap[elem?.type] || "-"}</Box>
                            <Box>{el?.history ? el?.history.map((history) => {return <Box><Tooltip title="Delete"><Box component="img" sx={{borderRadius: "50%"}} width="30px" src={history?.user?.avatar_url} /></Tooltip></Box>}) : (<Tooltip title={el?.owner?.login}><Box component="img" sx={{borderRadius: "50%"}} width="25px" src={el?.owner?.avatar_url} /></Tooltip>)}</Box>
                        </Box>
                        )})}
                )) : (<Box sx={{display: "grid", gridTemplateColumns: "110px", padding: "10px", justifyContent: "center", borderBottom: "1px solid white" }}>No gists found!</Box>)}
                <Box sx={{position: "absolute", bottom: "15px", right: "10px", display: "flex"}}>
                    <Box>Rows: <Input value={rows} sx={{paddingLeft: "7px", width: "40px", color: "white", '&::before': {borderColor: "white"}}} onChange={(e) => {setRows(e.target.value)}} /></Box>
                    <Box>Page: <Input value={page} sx={{paddingLeft: "7px", width: "40px", color: "white", '&::before': {borderColor: "white"}}} onChange={(e) => {setPage(e.target.value)}} /></Box>
                </Box>
            </Box>
        </Box>
    );
}

export default HomepageComponent;