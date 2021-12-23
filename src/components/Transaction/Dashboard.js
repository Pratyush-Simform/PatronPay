import React, { useContext, useEffect } from 'react';
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
    
    useEffect(() => {
        getDashboardData().then((response) => {
            dispatch({ type: "DASHBOARD_DATA", payload: response.data.data.results });
        })
    },[dispatch]);
    
    const total_items = {
        "Transactions" : state.dashboardData?.totals?.transactions,
        "Deposit Amount" : state.dashboardData?.totals?.deposit_amount,
        "Refunds" : state.dashboardData?.totals?.refunds,
        "Processing Fees" : state.dashboardData?.totals?.processing_fees,
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
        "Tips": state.dashboardData?.other?.tips,
        "Tip Tax": state.dashboardData?.other?.tips_taxes,
        "Sales Tax": state.dashboardData?.other?.sales_tax,
        "Deposits": state.dashboardData?.other?.deposits,
        "Declined": state.dashboardData?.other?.declined,
    }

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
            <div className="pProfileStatus pRow">
                <div className="pCol pCol--col4">
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Peoples
                        </InputLabel>
                        <NativeSelect
                            defaultValue={0}
                            inputProps={{
                                name: 'age',
                                id: 'uncontrolled-native',
                            }}
                        >
                            <option value={0}>All People</option>
                            {state.dashboardData?.people?.map((res) => (
                                <option value={""}>{res}</option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                </div>
                <div className="pCol pCol--col4">
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Profiles
                        </InputLabel>
                        <NativeSelect
                            defaultValue={0}
                            inputProps={{
                                name: 'age',
                                id: 'uncontrolled-native',
                            }}
                        >
                            <option value={0}>All Profiles</option>
                            {state.dashboardData?.profiles?.map((res) => (
                                <option value={""}>{res}</option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                </div>
                <div className="pCol pCol--col4">
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Terminals
                        </InputLabel>
                        <NativeSelect
                            defaultValue={0}
                            inputProps={{
                                name: 'age',
                                id: 'uncontrolled-native',
                            }}
                        >
                            <option value={0}>All Terminals</option>
                            <option value={1}>#ID1</option>
                            <option value={2}>#ID2</option>
                        </NativeSelect>
                    </FormControl>
                </div>
            </div>
            <hr className="dashedline" />
            <div style={{margin: "20px 0px 0px 20px",fontWeight: "bold"}}>
            <Typography variant="title" id="tableTitle" color="secondary">
                {"Totals"}
            </Typography>
            </div>
            <div>
                <Stack
                    direction="row"
                    justifyContent="space-around"
                    alignItems="baseline"
                    className="pProfileStatus"
                >
                    {state.dashboardData?.totals !== undefined ? (
                        Object.entries(total_items).map((item) => (
                         <div>
                            <Stack direction="row" justifyContent="space-between" alignItems="baseline" className="pProfileStatus__item">
                                <Typography variant="title" id="tableTitle">
                                    {item[0]}
                                </Typography>
                                <Chip label={`$ ${item[1]}`} variant="outlined" />
                            </Stack>
                        </div>
                        ))
                    ) : null }
                </Stack>
            </div>
            <hr className="dashedline" />
            <div style={{margin: "20px 0px 0px 20px",fontWeight: "bold"}}>
            <Typography variant="title" id="tableTitle" color="secondary">
                {"Type"}
            </Typography>
            </div>
            <div>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    className="pProfileStatus"
                >
                    {state.dashboardData?.type !== undefined ? (
                        Object.entries(type_items).map((item) => (
                         <div style={{width: '100%'}}>
                            <Stack direction="row" justifyContent="space-between" alignItems="baseline" className="pProfileStatus__item">
                                <Typography variant="title" id="tableTitle">
                                    {item[0]}
                                </Typography>
                                <Chip label={`$ ${item[1]}`} variant="outlined" />
                            </Stack>
                        </div>
                        ))
                    ) : null }
                </Stack>
            </div>
            <hr className="dashedline" />
            <div style={{margin: "20px 0px 0px 20px",fontWeight: "bold"}}>
            <Typography variant="title" id="tableTitle" color="secondary">
                {"Other"}
            </Typography>
            </div>
            <div>
                <Stack
                    direction="row"
                    justifyContent="space-around"
                    alignItems="baseline"
                    className="pProfileStatus"
                >
                    {state.dashboardData?.other !== undefined ? (
                        Object.entries(other_items).map((item) => (
                         <div style={{width: '100%'}}>
                            <Stack direction="row" justifyContent="space-between" alignItems="baseline" className="pProfileStatus__item">
                                <Typography variant="title" id="tableTitle">
                                    {item[0]}
                                </Typography>
                                <Chip label={`$ ${item[1]}`} variant="outlined" />
                            </Stack>
                        </div>
                        ))
                    ) : null }
                </Stack>
            </div>
            <hr className="dashedline" />

            <div style={{margin: "20px 0px 0px 20px",fontWeight: "bold"}}>
            <Typography variant="title" id="tableTitle" color="secondary">
                {"Top Items"}
            </Typography>
            </div>
            <div>
                <Stack
                    direction="row"
                    justifyContent="space-around"
                    alignItems="baseline"
                    className="pProfileStatus"
                >
                    {state.dashboardData?.top_items?.map((item) => (
                        <div style={{width: '100%'}} >
                            <Stack direction="row" justifyContent="space-between" alignItems="baseline" className="pProfileStatus__item">
                                <Typography variant="title" id="tableTitle">
                                    {item[0]}
                                </Typography>
                                <div>
                                    <Chip label={item[1]} variant="outlined" />
                                    <Chip label={`$ ${item[2]}`} variant="outlined" />
                                </div>
                            </Stack>
                        </div>
                    ))}
                </Stack>
            </div>

            <hr className="dashedline" />
            <div style={{margin: "20px 0px 0px 20px",fontWeight: "bold"}}>
            <Typography variant="title" id="tableTitle" color="secondary">
                {"Bottom Items"}
            </Typography>
            </div>
            <div>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="baseline"
                    className="pProfileStatus"
                >
                    {state.dashboardData?.bottom_items?.map((item) => (
                        <div style={{width: '100%'}} >
                            <Stack direction="row" justifyContent="space-between" alignItems="baseline" className="pProfileStatus__item">
                                <Typography variant="title" id="tableTitle">
                                    {item[0]}
                                </Typography>
                                <div>
                                    <Chip label={item[1]} variant="outlined" />
                                    <Chip label={`$ ${item[2]}`} variant="outlined" />
                                </div>
                            </Stack>
                        </div>
                    ))}
                </Stack>
            </div>
            </Paper>
        </div>
    );
}

export default Dashboard;