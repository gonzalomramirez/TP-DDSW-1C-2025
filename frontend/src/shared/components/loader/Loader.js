import {Box, CircularProgress} from "@mui/material";
import React from "react";
import "./Loader.css"

export const Loader = () => (
    <Box className="loader-circular-container">
        <CircularProgress size={50} />
    </Box>
)