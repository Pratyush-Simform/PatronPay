import React from "react";
import axios from "axios";
import "../../App.css";
import EnhancedTable from "../DndTable/Table";

function ProfileItems() {
    let cols = [
        {
          id: "barcode",
          numeric: false,
          disablePadding: false,
          label: "Barcode",
          width: 200,
        },
        {
          id: "description",
          numeric: false,
          disablePadding: false,
          label: "Description",
          width: 200,
        },
        {
          id: "short_name",
          numeric: true,
          disablePadding: true,
          label: "Short Name",
          width: 200,
        },
        {
          id: "price",
          numeric: true,
          disablePadding: true,
          label: "Price($)",
          width: 300,
        },
      ];
  const [id, setId] = React.useState([]);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    async function fetchApi() {
      const api = `https://tenant3.mypatronpay.us/api/patron_configuration_item/`;
      const token = localStorage.getItem("token");
      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setData(response.data.data.results);
      setId(response.data.data.results[0].pcf_id);
    }
    fetchApi();
    //     async function fetchProfileApi() {
    //         const api = `https://tenant3.mypatronpay.us/api/patron_configuration_item/pcf_id=${id}`
    //         const token = localStorage.getItem("token")
    //         const response = await axios.get(api, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         })
    //         console.log(response);
    //     }
    //     fetchProfileApi();
  }, [id]);
  return (
    <div className="profile">
      <EnhancedTable data={data} columnData={cols} name="Profile Items" />
    </div>
  );
}

export default ProfileItems;
