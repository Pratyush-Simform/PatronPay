import React from 'react';
import DatePicker from '../date/DatePicker';
import Typography from "@material-ui/core/Typography";
import "../../App.css";
import Toolbar from "@material-ui/core/Toolbar";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Paper from "@material-ui/core/Paper";

const Dashboard = () => {


    const setEndDate = () => {

    }

    const setStartDate = () => {

    }

    return (
        <div className="transHead pMainContainer">
            <Paper className="searchBox">
            <Toolbar className="pMainToolbar">
                <Typography variant="subtitle1" id="tableTitle">
                    {"Dashboard"}
                </Typography>
            </Toolbar>
            <div className="pFilterPanel">
                <DatePicker
                    setEndDate={setEndDate}
                    setStartDate={setStartDate}
                />
            </div>
            <div style={{margin: "20px",fontWeight: "bold"}}>
            <Typography variant="title" id="tableTitle" color="secondary">
                {"Totals"}
            </Typography>
            </div>
            <div>
                <Stack
                    direction="row"
                    justifyContent="space-around"
                    alignItems="baseline"
                    // spacing={2}
                    className="pProfileStatus"
                >
                    {/* <Stack direction="row" justifyContent="space-between" alignItems="baseline"> */}
                    <div style={{width: '100%'}} >
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" className="pProfileStatus__item">
                    <Typography variant="title" id="tableTitle">
                        {"Transactions"}
                    </Typography>
                    <Chip label={`$ ${20000}`} variant="outlined" />
                    </Stack>
                    </div>
                    {/* </Stack> */}
                    <div style={{width: '100%'}} >
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" className="pProfileStatus__item">
                    <Typography variant="title" id="tableTitle">
                        {"Transactions"}
                    </Typography>
                    <Chip label={`$ ${20000}`} variant="outlined" />
                    </Stack>
                    </div>

                    <div style={{width: '100%'}} >
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" className="pProfileStatus__item">
                    <Typography variant="title" id="tableTitle">
                        {"Transactions"}
                    </Typography>
                    <Chip label={`$ ${20000}`} variant="outlined" />
                    </Stack>
                    </div>

                </Stack>
            </div>

            <div style={{margin: "20px",fontWeight: "bold"}}>
            <Typography variant="title" id="tableTitle" color="secondary">
                {"Type"}
            </Typography>
            </div>
            <div>
                <Stack
                    direction="row"
                    justifyContent="space-around"
                    alignItems="baseline"
                    // spacing={2}
                    className="pProfileStatus"
                >
                    {/* <Stack direction="row" justifyContent="space-between" alignItems="baseline"> */}
                    <div style={{width: '100%'}} >
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" className="pProfileStatus__item">
                    <Typography variant="title" id="tableTitle">
                        {"Transactions"}
                    </Typography>
                    <Chip label={`$ ${20000}`} variant="outlined" />
                    </Stack>
                    </div>
                    {/* </Stack> */}
                    <div style={{width: '100%'}} >
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" className="pProfileStatus__item">
                    <Typography variant="title" id="tableTitle">
                        {"Transactions"}
                    </Typography>
                    <Chip label={`$ ${20000}`} variant="outlined" />
                    </Stack>
                    </div>

                    <div style={{width: '100%'}} >
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" className="pProfileStatus__item">
                    <Typography variant="title" id="tableTitle">
                        {"Transactions"}
                    </Typography>
                    <Chip label={`$ ${20000}`} variant="outlined" />
                    </Stack>
                    </div>

                </Stack>
            </div>

            <div style={{margin: "20px",fontWeight: "bold"}}>
            <Typography variant="title" id="tableTitle" color="secondary">
                {"Other"}
            </Typography>
            </div>
            <div>
                <Stack
                    direction="row"
                    justifyContent="space-around"
                    alignItems="baseline"
                    // spacing={2}
                    className="pProfileStatus"
                >
                    {/* <Stack direction="row" justifyContent="space-between" alignItems="baseline"> */}
                    <div style={{width: '100%'}} >
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" className="pProfileStatus__item">
                    <Typography variant="title" id="tableTitle">
                        {"Transactions"}
                    </Typography>
                    <Chip label={`$ ${20000}`} variant="outlined" />
                    </Stack>
                    </div>
                    {/* </Stack> */}
                    <div style={{width: '100%'}} >
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" className="pProfileStatus__item">
                    <Typography variant="title" id="tableTitle">
                        {"Transactions"}
                    </Typography>
                    <Chip label={`$ ${20000}`} variant="outlined" />
                    </Stack>
                    </div>

                    <div style={{width: '100%'}} >
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" className="pProfileStatus__item">
                    <Typography variant="title" id="tableTitle">
                        {"Transactions"}
                    </Typography>
                    <Chip label={`$ ${20000}`} variant="outlined" />
                    </Stack>
                    </div>

                </Stack>
            </div>

            <div style={{margin: "20px",fontWeight: "bold"}}>
            <Typography variant="title" id="tableTitle" color="secondary">
                {"Top Items"}
            </Typography>
            </div>
            <div>
                <Stack
                    direction="row"
                    justifyContent="space-around"
                    alignItems="baseline"
                    // spacing={2}
                    className="pProfileStatus"
                >
                    {/* <Stack direction="row" justifyContent="space-between" alignItems="baseline"> */}
                    <div style={{width: '100%'}} >
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" className="pProfileStatus__item">
                    <Typography variant="title" id="tableTitle">
                        {"Transactions"}
                    </Typography>
                    <div>
                        <Chip label={100} variant="outlined" />
                        <Chip label={`$ ${20000}`} variant="outlined" />
                    </div>
                    </Stack>
                    </div>
                    {/* </Stack> */}
                    <div style={{width: '100%'}} >
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" className="pProfileStatus__item">
                    <Typography variant="title" id="tableTitle">
                        {"Transactions"}
                    </Typography>
                    <div>
                        <Chip label={100} variant="outlined" />
                        <Chip label={`$ ${20000}`} variant="outlined" />
                    </div>
                    </Stack>
                    </div>

                    <div style={{width: '100%'}} >
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" className="pProfileStatus__item">
                    <Typography variant="title" id="tableTitle">
                        {"Transactions"}
                    </Typography>
                    <div>
                        <Chip label={100} variant="outlined" />
                        <Chip label={`$ ${20000}`} variant="outlined" />
                    </div>
                    </Stack>
                    </div>

                </Stack>
            </div>

            <div style={{margin: "20px",fontWeight: "bold"}}>
            <Typography variant="title" id="tableTitle" color="secondary">
                {"Bottom Items"}
            </Typography>
            </div>
            <div>
                <Stack
                    direction="row"
                    justifyContent="space-around"
                    alignItems="baseline"
                    // spacing={2}
                    className="pProfileStatus"
                >
                    {/* <Stack direction="row" justifyContent="space-between" alignItems="baseline"> */}
                    <div style={{width: '100%'}} >
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" className="pProfileStatus__item">
                    <Typography variant="title" id="tableTitle">
                        {"Transactions"}
                    </Typography>
                    <div>
                        <Chip label={100} variant="outlined" />
                        <Chip label={`$ ${20000}`} variant="outlined" />
                    </div>
                    </Stack>
                    </div>
                    {/* </Stack> */}
                    <div style={{width: '100%'}} >
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" className="pProfileStatus__item">
                    <Typography variant="title" id="tableTitle">
                        {"Transactions"}
                    </Typography>
                    <div>
                        <Chip label={100} variant="outlined" />
                        <Chip label={`$ ${20000}`} variant="outlined" />
                    </div>
                    </Stack>
                    </div>

                    <div style={{width: '100%'}} >
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" className="pProfileStatus__item">
                    <Typography variant="title" id="tableTitle">
                        {"Transactions"}
                    </Typography>
                    <div>
                        <Chip label={100} variant="outlined" />
                        <Chip label={`$ ${20000}`} variant="outlined" />
                    </div>
                    </Stack>
                    </div>
                </Stack>
            </div>
            </Paper>
        </div>
    );
}

export default Dashboard;