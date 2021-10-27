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
        width: 300,
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
    id: "amount",
    numeric: true,
    disablePadding: true,
    label: "Amount",
    width: 300,
  },
  {
    id: "currency",
    numeric: true,
    disablePadding: true,
    label: "Currency",
    width: 300,
  },
  {
    id: "tip",
    numeric: true,
    disablePadding: true,
    label: "Tip",
    width: 400,
  },
  {
    id: "tip_tax",
    numeric: true,
    disablePadding: true,
    label: "Tip Tax",
    width: 400,
  },
  {
    id: "txn_type",
    numeric: true,
    disablePadding: true,
    label: "Transaction Type",
    width: 400,
  }
]