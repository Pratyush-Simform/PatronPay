export let cols = [
  {
    id: "txn_date_time",
    numeric: false,
    disablePadding: false,
    label: "Date",
    width: 200,
  },
  {
    id: "txn_type",
    numeric: false,
    disablePadding: true,
    label: "Transaction Type",
    width: 300,
  },
  {
    id: "currency",
    numeric: false,
    disablePadding: false,
    label: "Currency",
    width: 200,
  },
    {
        id: "amount",
        numeric: false,
        disablePadding: false,
        label: "Amount $",
        width: 200,
      },
      {
        id: "tip",
        numeric: true,
        disablePadding: true,
        label: "Tip $",
        width: 300,
      },
      {
        id: "tip_tax",
        numeric: true,
        disablePadding: true,
        label: "Tip Tax $",
        width: 300,
      },
      {
        id: "first_name",
        numeric: false,
        disablePadding: true,
        label: "First Name",
        width: 200,
      },
      {
        id: "last_name",
        numeric: false,
        disablePadding: true,
        label: "Last Name",
        width: 200,
      },
      {
        id: "card_number",
        numeric: false,
        disablePadding: false,
        label: "Card number",
        width: 300,
      },

]

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
      width: 300,
    },
    {
      id: "tip",
      numeric: true,
      disablePadding: true,
      label: "Tip",
      width: 300,
    },
    {
      id: "tip_tax",
      numeric: true,
      disablePadding: true,
      label: "Tip Tax",
      width: 300,
    },
    {
      id: "txn_type",
      numeric: true,
      disablePadding: true,
      label: "Transaction Type",
      width: 300,
    }
]

export let cashCols = [
  {
    id: "txn_date_time",
    numeric: false,
    disablePadding: false,
    label: "Date",
    width: 200,
  },
  {
    id: "txn_type",
    numeric: true,
    disablePadding: true,
    label: "Transaction Type",
    width: 400,
  },
  {
    id: "currency",
    numeric: true,
    disablePadding: true,
    label: "Currency",
    width: 300,
  },
  {
    id: "amount",
    numeric: true,
    disablePadding: true,
    label: "Amount $",
    width: 300,
  },
  {
    id: "tip",
    numeric: true,
    disablePadding: true,
    label: "Tip $",
    width: 400,
  },
  {
    id: "tip_tax",
    numeric: true,
    disablePadding: true,
    label: "Tip Tax $",
    width: 400,
  },

]