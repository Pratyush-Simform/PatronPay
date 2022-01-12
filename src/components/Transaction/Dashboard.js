import React, { useContext, useEffect, useState } from 'react';
import DatePicker from '../date/DatePicker';
import Typography from "@material-ui/core/Typography";
import "../../App.css";
import Toolbar from "@material-ui/core/Toolbar";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Paper from "@material-ui/core/Paper";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { getDashboardData } from '../../services/dashboardApi';
import { Context } from "../../store/Context";

const Dashboard = () => {
    const [state, dispatch] = useContext(Context);
    const [payload, setPayload] = useState({});

    useEffect(() => {
        getDashboardData(payload).then((response) => {
            dispatch({ type: "DASHBOARD_DATA", payload: response?.data?.data?.results });
        })
    },[dispatch,payload]);
    
    const total_items = {
        "Transactions" : `$ ${state.dashboardData?.totals?.transactions}`,
        "Deposit Amount" : `$ ${state.dashboardData?.totals?.deposit_amount}`,
        "Refunds" : `$ ${state.dashboardData?.totals?.refunds}`,
        "Processing Fees" : `$ ${state.dashboardData?.totals?.processing_fees}`,
        "No. of Transactions" : state.dashboardData?.totals?.no_of_transactions,
        "No. of Items" : state.dashboardData?.totals?.no_of_transactions_items,
    }

    const type_items = {
        "Card": state.dashboardData?.type?.cashless,
        "Cash": state.dashboardData?.type?.cash,
        "Member": state.dashboardData?.type?.member,
        "Gift Card": state.dashboardData?.type?.gift_card,
        "Avarage Transactions": state.dashboardData?.type?.average
    }
    const other_items = {
        "Tips": `$ ${state.dashboardData?.other?.tips}`,
        "Tip Tax": `$ ${state.dashboardData?.other?.tips_taxes}`,
        "Sales Tax": `$ ${state.dashboardData?.other?.sales_tax}`,
        "Deposits": `$ ${state.dashboardData?.other?.deposits}`,
        "Declined": state.dashboardData?.other?.declined,
    }

    const handleSelectDateFilter = (startDate, endDate) => {
        const sDate = startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate();
        const eDate = endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate();
        setPayload((payload)=>({...payload,"start_date": sDate, "end_date": eDate}));
    }

    const onhandleChangePeoples = (event) => {
        setPayload((payload)=>({...payload, "fullname": event.target.value !== "0" ? event.target.value : ""}));
    }

    const onhandleChangeProfiles = (event) => {
        setPayload((payload)=>({...payload, "profiles": event.target.value !== "0" ? event.target.value : ""}));
    }

    const onhandleChangeTerminals = (event) => {
        setPayload((payload)=>({...payload, "terminals": event.target.value !== "0" ? event.target.value : ""}));
    }

    return (
        <div className="transHead pMainContainer">
            <Paper className="searchBox dashboard-page">
            <Toolbar className="pMainToolbar">
                <Typography variant="subtitle1" id="tableTitle">
                    {"Dashboard"}
                </Typography>
            </Toolbar>
            <div className="pFilterPanel">
                <DatePicker
                    setDateSelect={handleSelectDateFilter}
                    setButtonFilter={handleSelectDateFilter}
                />
            </div>
            <div className="pSelectionPanel">
                <div className="pRow">
                <div className="pSelectionPanel__item">
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Peoples
                        </InputLabel>
                        <NativeSelect
                            defaultValue={0}
                            inputProps={{
                                name: 'fullname',
                                id: 'uncontrolled-native',
                            }}
                            onChange={(e) => onhandleChangePeoples(e)}
                        >
                            <option value={0} key={0}>All People</option>
                            {state.dashboardData?.people?.map((res) => (
                                <option value={res} key={res}>{res}</option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                </div>
                <div className="pSelectionPanel__item">
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Profiles
                        </InputLabel>
                        <NativeSelect
                            defaultValue={0}
                            inputProps={{
                                name: 'profiles',
                                id: 'uncontrolled-native',
                            }}
                            onChange={(e) => onhandleChangeProfiles(e)}
                        >
                            <option value={0} key={0}>All Profiles</option>
                            {state.dashboardData?.profiles?.map((res) => (
                                <option value={res} key={res}>{res}</option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                </div>
                <div className="pSelectionPanel__item">
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Terminals
                        </InputLabel>
                        <NativeSelect
                            defaultValue={0}
                            inputProps={{
                                name: 'terminals',
                                id: 'uncontrolled-native',
                            }}
                            onChange={(e) => onhandleChangeTerminals(e)}
                        >
                            <option value={0} key={0}>All Terminals</option>
                            {state.dashboardData?.terminals?.map((res) => (
                                <option value={res} key={res}>{res}</option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                </div>
                </div>
            </div>

            <div className="pDashboardRow">
            <div className="pDashboardRow__header">
            <Typography variant="inherit" id="tableTitle" color="secondary">
                {"Totals"}
            </Typography>
            </div>
            <div className="pDashboardRow__body">
                <Stack
                    direction="row"
                    alignItems="baseline"
                    className="pDashboardRow__stack"
                >
                    {state.dashboardData?.totals !== undefined ? (
                        Object.entries(total_items).map((item) => (
                            <Stack key={item[0]} direction="row" alignItems="baseline" className="pDashboardRow__stackItem">
                                <Typography variant="inherit" id="tableTitle" className="pDashboardRow__stackTitle">
                                    {item[0]}
                                </Typography>
                                <Chip label={item[1]} variant="outlined" className="pDashboardRow__stackPrice" />
                            </Stack>
                        ))
                    ) : null }
                </Stack>
            </div>
            </div>

            <div className="pDashboardRow">
            <div className="pDashboardRow__header">
            <Typography variant="inherit" id="tableTitle" color="secondary">
                {"Type"}
            </Typography>
            </div>
            <div className="pDashboardRow__body">
                <Stack
                    direction="row"
                    alignItems="center"
                    className="pDashboardRow__stack"
                >
                    {state.dashboardData?.type !== undefined ? (
                        Object.entries(type_items).map((item) => (
                            <Stack direction="row" key={item[0]} alignItems="baseline" className="pDashboardRow__stackItem">
                                <Typography variant="inherit" id="tableTitle" className="pDashboardRow__stackTitle">
                                    {item[0]}
                                </Typography>
                                <Chip label={`$ ${item[1]}`} variant="outlined" className="pDashboardRow__stackPrice" />
                            </Stack>
                        ))
                    ) : null }
                </Stack>
            </div>
            </div>
            
            <div className="pDashboardRow">
            <div className="pDashboardRow__header">
            <Typography variant="inherit" id="tableTitle" color="secondary">
                {"Other"}
            </Typography>
            </div>
            <div className="pDashboardRow__body">
                <Stack
                    direction="row"
                    alignItems="baseline"
                    className="pDashboardRow__stack"
                >
                    {state.dashboardData?.other !== undefined ? (
                        Object.entries(other_items).map((item) => (
                            <Stack direction="row" key={item[0]} alignItems="baseline" className="pDashboardRow__stackItem">
                                <Typography variant="inherit" id="tableTitle" className="pDashboardRow__stackTitle">
                                    {item[0]}
                                </Typography>
                                <Chip label={item[1]} variant="outlined" className="pDashboardRow__stackPrice" />
                            </Stack>
                        ))
                    ) : null }
                </Stack>
            </div>
            </div>
            
            <div className="pDashboardRow">
            <div className="pDashboardRow__header">
            <Typography variant="inherit" id="tableTitle" color="secondary">
                {"Top Items"}
            </Typography>
            </div>
            <div className="pDashboardRow__body">
                <Stack
                    direction="row"
                    alignItems="baseline"
                    className="pDashboardRow__stack"
                >
                    {state.dashboardData?.top_items?.map((item) => (
                        <Stack direction="row" key={item[0]} alignItems="baseline" className="pDashboardRow__stackItem">
                            <Typography variant="inherit" id="tableTitle" className="pDashboardRow__stackTitle">
                                {item[0]}
                            </Typography>
                            <div>
                                <Chip label={item[1]} variant="outlined" />
                                <Chip label={`$ ${item[2]}`} variant="outlined" className="pDashboardRow__stackPrice" />
                            </div>
                        </Stack>
                    ))}
                </Stack>
            </div>
            </div>
            
            <div className="pDashboardRow">
            <div className="pDashboardRow__header">
            <Typography variant="inherit" id="tableTitle" color="secondary">
                {"Bottom Items"}
            </Typography>
            </div>
            <div className="pDashboardRow__body">
                <Stack
                    direction="row"
                    alignItems="baseline"
                    className="pDashboardRow__stack"
                >
                    {state.dashboardData?.bottom_items?.map((item) => (
                        <Stack direction="row" key={item[0]} alignItems="baseline" className="pDashboardRow__stackItem">
                            <Typography id="tableTitle" variant="inherit" className="pDashboardRow__stackTitle">
                                {item[0]}
                            </Typography>
                            <div>
                                <Chip label={item[1]} variant="outlined" />
                                <Chip label={`$ ${item[2]}`} variant="outlined" className="pDashboardRow__stackPrice" />
                            </div>
                        </Stack>
                    ))}
                </Stack>
            </div>
            </div>
           
            </Paper>
        </div>
    );
}

export default Dashboard;