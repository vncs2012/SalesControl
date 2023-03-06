import * as React from "react";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import { deleteApi, fetch_all } from "./api";
import { useEffect, useState } from "react";
import { deleteAlert, formatDate } from "../../util";
import { Detail } from "./detail";
import { Sale } from "../../layout/Sale";
import { TabelaPaginada } from "../../layout/TablePagination";

const colList = [
  {
    id: "id_sales",
    label: "ID",
    number: false,
    align: "center",
    pk_visible: true,
    array: "Sales",
  },
  {
    id: "no_client",
    label: "Cliente",
    number: false,
    align: "center",
    array: "Client",
  },
  {
    id: "nu_value",
    label: "Valor",
    number: true,
    align: "center",
    array: "Sales",
  },
  {
    id: "dt_sale",
    label: "Data",
    number: false,
    align: "center",
    array: "Sales",
    format: formatDate,
  },
];

export const List = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [idDetail, setidDetail] = useState();

  useEffect(() => {
    const getOrders = async () => {
      let { data } = await fetch_all();
      if (data) {
        setData(data);
      }
    };
    getOrders();
  }, []);

  const handleDelete = (id) => {
    deleteAlert(deleteApi, id, setData, data, "id_sales");
  };

  const handleDetail = (id) => {
    setidDetail(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Paper sx={{ minHeight: "100%", overflow: "hidden" }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ top: 2, left: 15 }}
        >
          <Grid item xs={4}>
            <Sale dados={data.day ? data.day : []} title={"DIA"} />
          </Grid>
          <Grid item xs={4}>
            <Sale
              title={"SEMANA (Ultimos 7 Dias)"}
              dados={data.week ? data.week : []}
            />
          </Grid>
          <Grid item xs={4}>
            <Sale
              title={"MES (Ultimos 30 dias)"}
              dados={data.month ? data.month : []}
            />
          </Grid>
          <Grid item xs={12}>
            <TabelaPaginada
              colunas={colList}
              dados={Array.isArray(data.list) ? data.list : []}
              handleDelete={handleDelete}
              handleDetail={handleDetail}
            />
          </Grid>
        </Grid>
      </Paper>
      {open ? (
        <Detail open={open} handleClose={handleClose} id={idDetail} />
      ) : null}
    </>
  );
};
