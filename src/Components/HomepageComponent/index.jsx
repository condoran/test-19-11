import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { fetchGists, fetchOneGist } from "../../store/gists/thunks";
import { Box, Input, Typography } from '@mui/material';

var extensionTypeMap = {
    "video/3gpp": "3gp",
    "application/octet-stream": "so",
    "application/postscript": "ps",
    "audio/x-aiff": "aiff",
    "application/pgp-signature": "sig",
    "video/x-ms-asf": "asx",
    "text/x-asm": "s",
    "application/atom+xml": "atom",
    "audio/basic": "snd",
    "video/x-msvideo": "avi",
    "application/x-msdownload": "msi",
    "image/bmp": "bmp",
    "application/x-bzip2": "bz2",
    "text/x-c": "hh",
    "application/vnd.ms-cab-compressed": "cab",
    "application/vnd.ms-htmlhelp": "chm",
    "text/plain": "txt",
    "application/x-x509-ca-cert": "pem",
    "text/css": "css",
    "text/csv": "csv",
    "application/x-debian-package": "deb",
    "text/x-diff": "diff",
    "image/vnd.djvu": "djvu",
    "application/msword": "dot",
    "application/xml-dtd": "dtd",
    "application/x-dvi": "dvi",
    "application/java-archive": "war",
    "message/rfc822": "mime",
    "text/x-fortran": "for",
    "video/x-flv": "flv",
    "text/x-script.ruby": "ru",
    "image/gif": "gif",
    "application/x-gzip": "gz",
    "text/html": "html",
    "image/vnd.microsoft.icon": "ico",
    "text/calendar": "ifb",
    "text/x-java-source": "java",
    "application/x-java-jnlp-file": "jnlp",
    "image/jpeg": "jpg",
    "application/javascript": "js",
    "application/json": "json",
    "audio/x-mpegurl": "m3u",
    "video/mp4": "mp4v",
    "text/troff": "tr",
    "application/mathml+xml": "mml",
    "application/mbox": "mbox",
    "audio/midi": "midi",
    "video/x-mng": "mng",
    "video/quicktime": "qt",
    "audio/mpeg": "mp3",
    "video/mpeg": "mpg",
    "application/vnd.oasis.opendocument.presentation": "odp",
    "application/vnd.oasis.opendocument.spreadsheet": "ods",
    "application/vnd.oasis.opendocument.text": "odt",
    "application/ogg": "ogg",
    "text/x-pascal": "pas",
    "image/x-portable-bitmap": "pbm",
    "application/pdf": "pdf",
    "image/x-portable-graymap": "pgm",
    "application/pgp-encrypted": "pgp",
    "text/x-script.perl": "pl",
    "text/x-script.perl-module": "pm",
    "image/png": "png",
    "image/x-portable-anymap": "pnm",
    "image/x-portable-pixmap": "ppm",
    "application/vnd.ms-powerpoint": "ppt",
    "image/vnd.adobe.photoshop": "psd",
    "text/x-script.python": "py",
    "audio/x-pn-realaudio": "ram",
    "application/x-rar-compressed": "rar",
    "application/rdf+xml": "rdf",
    "application/x-redhat-package-manager": "rpm",
    "application/rss+xml": "rss",
    "application/rtf": "rtf",
    "text/sgml": "sgml",
    "application/x-sh": "sh",
    "image/svg+xml": "svgz",
    "application/x-shockwave-flash": "swf",
    "application/x-tar": "tar",
    "application/x-bzip-compressed-tar": "tbz",
    "application/x-tcl": "tcl",
    "application/tei+xml": "tei",
    "application/x-tex": "tex",
    "application/x-texinfo": "texinfo",
    "image/tiff": "tiff",
    "application/x-bittorrent": "torrent",
    "text/x-vcard": "vcf",
    "text/x-vcalendar": "vcs",
    "model/vrml": "wrl",
    "audio/x-wav": "wav",
    "audio/x-ms-wma": "wma",
    "video/x-ms-wmv": "wmv",
    "video/x-ms-wmx": "wmx",
    "application/wsdl+xml": "wsdl",
    "image/x-xbitmap": "xbm",
    "application/xhtml+xml": "xhtml",
    "application/vnd.ms-excel": "xls",
    "application/xml": "xsl",
    "image/x-xpixmap": "xpm",
    "application/xslt+xml": "xslt",
    "text/yaml": "yml",
    "application/zip": "zip"
}

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
            <Box sx={{margin: "40px 0", border: "1px solid white", borderRadius: "5px", paddingBottom: "50px", position: "relative"}}>
                {gists.map((el) => {
                    return Object.values(el?.files).length > 0 && Object.values(el?.files)?.map((elem) => {return (
                        <Box onClick={() => {window.open(elem?.raw_url, '_blank', 'noopener,noreferrer');}} sx={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", cursor: "pointer", padding: "10px", gap: "20px", borderBottom: "1px solid white" }} key={el?.id}>
                            <Box>{elem?.filename || "-"}</Box>
                            <Box sx={{display: "flex", color: "white", border: "1px solid #36A1FF", width: "25px", height: "25px", borderRadius: "50%", backgroundColor: "#36A1FF", textAlign: "center", alignItems: "center", justifyContent: "center", alignContent: "center", }}>{extensionTypeMap[elem?.type] || "-"}</Box>
                            <Box>{el?.history ? el?.history.map((history) => {return <Box><Box component="img" sx={{borderRadius: "50%"}} width="25px" src={history?.user?.avatar_url} /></Box>}) : (<Box component="img" sx={{borderRadius: "50%"}} width="25px" src={el?.owner?.avatar_url} />)}</Box>
                        </Box>
                        )})}
                )}
                <Box sx={{position: "absolute", bottom: "15px", right: "10px"}}>1/2</Box>
            </Box>
        </Box>
    );
}

export default HomepageComponent;