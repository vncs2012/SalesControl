import { Autocomplete, Button, Fab, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Typography,} from "@mui/material";
import { alertSucesso, Android12Switch, hideLoading, NumberFormatCustom, showLoading, } from "../../util";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import React, { useState, useEffect } from "react";
import { insert, get_select_insert } from "./api";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export const Insert = () => {
  const [select, setSelect] = useState([]);
  const [save, setSave] = useState(false);
  const [form, setForm] = useState({
    id_client: "",
    delivery: false,
    items: [ {  id_product: "",  bo_border: false,  purchase_quantity: "",  description: "",}],
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]:
        event.target.name == "delivery"
          ? event.target.checked
          : event.target.value,
    });
  };

  useEffect(() => {
    const getSelectData = async () => {
      showLoading('Aguarde...')
      let { data } = await get_select_insert();
      if (data) {
        setSelect(data);
        hideLoading()
      }
    };
    getSelectData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    showLoading();
    const { data } = await insert(form);
    if (data.status === 201) {
      hideLoading();
      alertSucesso(true, setSave);
    }
  };

  const handleAddCustomerProduct = () => {
    const newItem ={  id_product: "",  bo_border: false,  purchase_quantity: "",  description: "",}
    setForm({...form, items:[...form.items, newItem]})
  };

  const handleRemoveCustomerProduct = (index) => {
    const newItems = form.items.filter((_, i) => i !== index)
    setForm({...form, items:newItems})
  };

  const handleInputChange = (index, event) => {
    form.items[index][event.target.name] =
      event.target.name == "bo_border" ? event.target.checked: event.target.value;
      setForm({...form})
  };
  return (
    <Paper sx={{ width: "100vh", padding: 2, marginTop: 5 }} elevation={4}>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={4} md={6}>
          <Autocomplete
            id="id_client"
            onChange={(event, newValue) => {
              setForm({
                ...form,
                id_client: newValue ? newValue.id_client : "",
              });
            }}
            options={select["client"] ?? []}
            getOptionLabel={(option) =>
              option.nu_document + " - " + option.no_client
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Clientes"
                placeholder="Clientes"
                variant="standard"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControlLabel
            control={<Android12Switch />}
            label="Fazer entrega?"
            name="delivery"
            onChange={(event) => handleChange(event)}
          />
        </Grid>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddCustomerProduct}
            sx={{ marginTop: 5 }}
          >
            <ShoppingCartRoundedIcon /> Adicionar Produto
          </Button>
        </Grid>

        {form.items.map((customerProduct, index) => (
          <Paper
            elevation={2}
            sx={{ padding: 3, marginLeft: 6, marginTop: 2, marginBottom: 2 }}
          >
            <Grid item key={index}>
              <Grid container direction="column" alignItems="center">
                <Typography sx={{ fontSize: 14 }} gutterBottom>
                  Produto {index + 1}º
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="id_product-label">Produto</InputLabel>
                  <Select
                    labelId="id_product-label"
                    id="id_product"
                    name="id_product"
                    value={customerProduct.id_product}
                    label="Produto"
                    variant="standard"
                    onChange={(event) => handleInputChange(index, event)}
                  >
                    {select["product"]
                      ? select["product"].map((i) => (
                          <MenuItem value={i.id}>{i.name}</MenuItem>
                        ))
                      : ""}
                  </Select>
                </FormControl>

                <TextField
                  label="Quantidade"
                  name="purchase_quantity"
                  variant="standard"
                  value={customerProduct.purchase_quantity}
                  onChange={(event) => handleInputChange(index, event)}
                />
                <FormControlLabel
                  control={
                    <Android12Switch checked={customerProduct.bo_border} />
                  }
                  value={customerProduct.bo_border}
                  variant="standard"
                  name="bo_border"
                  id="bo_border"
                  onChange={(event) => handleInputChange(index, event)}
                  label="Borda?"
                />
                <TextField
                  label="Anotação do item"
                  name="description"
                  variant="standard"
                  multiline
                  value={customerProduct.description}
                  onChange={(event) => handleInputChange(index, event)}
                />
                <Fab size="small" aria-label="delete" sx={{ margin: 2 }}>
                  <CloseIcon
                    onClick={() => handleRemoveCustomerProduct(index)}
                  />
                </Fab>
              </Grid>
            </Grid>
          </Paper>
        ))}
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button
            onClick={handleSubmit}
            variant="contained"
            endIcon={<SendIcon />}
            sx={{ float: "right", position: "flex", margin: 3, width: 150 }}
          >
            Salvar
          </Button>
        </Grid>
      </Grid>
      {save && (
        <Navigate to="/orders" replace={true} />
      )}
    </Paper>
  );
};
