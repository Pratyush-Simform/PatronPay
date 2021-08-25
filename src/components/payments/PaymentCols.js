export let cols = [
    {
        id: "amount",
        numeric: false,
        disablePadding: false,
        label: "Amount",
        width: 200,
      },
      {
        id: "card_number",
        numeric: false,
        disablePadding: false,
        label: "Card number",
        width: 200,
      },
      {
        id: "currency",
        numeric: false,
        disablePadding: false,
        label: "Currency",
        width: 200,
      },
      {
        id: "first_name",
        numeric: true,
        disablePadding: true,
        label: "Name",
        width: 200,
      },
      {
        id: "tip",
        numeric: true,
        disablePadding: true,
        label: "Tip",
        width: 200,
      },
      {
        id: "tax",
        numeric: true,
        disablePadding: true,
        label: "Tax",
        width: 200,
      },
      {
        id: "tip_tax",
        numeric: true,
        disablePadding: true,
        label: "Tip Tax",
        width: 200,
      },
      {
        id: "txn_type",
        numeric: true,
        disablePadding: true,
        label: "Transaction Type",
        width: 200,
      }
]

// amount_auth: 1.01
// auth_number: "      "
// card_type: "VISA"
// cc_last4: "6150"
// currency: "USD"
// date_created: "2021-06-11T06:19:53.996410-05:00"
// date_modified: "2021-06-11T06:19:53.996427-05:00"
// first_name: ""
// id: "719846f9-4b0c-470f-bd8f-7acc7251cfff"
// last_name: ""
// ref_id1: "1483872797"
// ref_id2: "116215574165"
// tip: 0
// tip_tax: 0
// txn_date_time: "2021-06-11T06:19:51.900821-05:00"
// txn_result: "NO REPLY"
// txn_type: "CC"

export let cashlessCols = [
  {
      id: "amount_auth",
      numeric: false,
      disablePadding: false,
      label: "Amount",
      width: 200,
    },
    {
      id: "card_type",
      numeric: false,
      disablePadding: false,
      label: "Card Type",
      width: 200,
    },
    {
      id: "currency",
      numeric: false,
      disablePadding: false,
      label: "Currency",
      width: 200,
    },
    {
      id: "first_name",
      numeric: true,
      disablePadding: true,
      label: "Name",
      width: 200,
    },
    {
      id: "tip",
      numeric: true,
      disablePadding: true,
      label: "Tip",
      width: 200,
    },
    {
      id: "tip_tax",
      numeric: true,
      disablePadding: true,
      label: "Tip Tax",
      width: 200,
    },
    {
      id: "txn_type",
      numeric: true,
      disablePadding: true,
      label: "Transaction Type",
      width: 200,
    }
]

// amount: 2
// currency: "USD"
// date_created: "2021-06-11T06:18:48.522395-05:00"
// date_modified: "2021-06-11T06:18:48.522409-05:00"
// id: "7a34354a-4e5c-40f3-a72c-a79e3789fdbb"
// tip: 0
// tip_tax: 0
// txn_date_time: "2021-06-11T06:18:42.459000-05:00"
// txn_type: "Cash"