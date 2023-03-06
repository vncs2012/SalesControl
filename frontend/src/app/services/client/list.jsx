import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Grid } from "@mui/material";
import { deleteApi, fetch_all } from './api'
import { useEffect, useState } from 'react';
import { deleteAlert} from '../../util';
import { Detail } from './detail';
import { Search } from './search';
import { TabelaPaginada } from '../../layout/TablePagination';


const colList = [
  {
    id: "id_client",
    label: "",
    number: false,
    align: "center",
    pk_visible: false,
  },
  { id: "no_client", label: "Nome", number: false, align: "center" },
  { id: "nu_document", label: "Documento", number: false, align: "center" },
  { id: "tp_sex", label: "Sexo", number: false, align: "center" },
  { id: "nu_contact", label: "Telefone", number: false, align: "center" },
];
  


export const List = () => {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)
    const [idDetail, setidDetail] = useState()

    useEffect(() => {
        const getClient = async () => {
          let { data } = await fetch_all();
          if (data) {
            setData(data);
          }
        };
        getClient();
    }, []);

    const handleDelete = (id) => {
        deleteAlert(deleteApi, id, setData, data, 'id_user')
    }

    const handleDetail = (id) => {
        setidDetail(id)
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false);
    };

    return (
      <Paper sx={{ minHeight: "100%", overflow: "hidden" }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ top: 2, left: 15 }}
        >
          <Search setData={setData} />
          <Grid item xs={12}>
            <TabelaPaginada
              colunas={colList}
              dados={data}
              handleDelete={handleDelete}
              handleDetail={handleDetail}
            />
          </Grid>
        </Grid>
        {open ? (
          <Detail open={open} handleClose={handleClose} id={idDetail} />
        ) : null}
      </Paper>
    );
}