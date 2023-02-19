import PropTypes from "prop-types";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import { insert, get_select_insert } from "./api";
import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import {
  Autocomplete,
  Button,
  Fab,
  FormControlLabel,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import {
  alertSucesso,
  Android12Switch,
  hideLoading,
  NumberFormatCustom,
  showLoading,
} from "../../util";

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export const Insert = () => {
  const [select, setSelect] = useState([]);
  const [save, setSave] = useState(false);
  const [form, setForm] = useState({ nu_value: "", id_client: "" });
  const [customerProducts, setCustomerProducts] = useState([
    {
      customer_id: "",
      product_id: "",
      purchase_date: "",
      purchase_price: "",
      purchase_quantity: "",
    },
  ]);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const getSelectData = async () => {
      // showLoading('Aguarde...')
      let { data } = await get_select_insert();
      if (data) {
        setSelect(data);
        // hideLoading()
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
      alertSucesso(true, setSave, true);
    }
  };

  const handleAddCustomerProduct = () => {
    setCustomerProducts([
      ...customerProducts,
      {
        customer_id: "",
        product_id: "",
        purchase_date: "",
        purchase_price: "",
        purchase_quantity: "",
      },
    ]);
  };

  const handleRemoveCustomerProduct = (index) => {
    setCustomerProducts(customerProducts.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, event) => {
    const values = [...customerProducts];
    values[index][event.target.name] = event.target.value;
    setCustomerProducts(values);
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
            <Grid item xs={6} md={6}>
              <FormControlLabel
                control={<Android12Switch defaultChecked />}
                label="Fazer entrega?"
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
        {customerProducts.map((customerProduct, index) => (
          <Paper
            elevation={2}
            sx={{ padding: 3, marginLeft: 6, marginTop: 2, marginBottom: 2 }}
          >
            <Grid item key={index}>
              <Grid container direction="column" alignItems="center">
                <Typography sx={{ fontSize: 14 }} gutterBottom>
                  Produto {index + 1}º
                </Typography>
                <Autocomplete
                  sx={{ width: "100%" }}
                  id="id_product"
                  onChange={(event) => handleInputChange(index, event)}
                  options={select["product"] ?? []}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Produto"
                      placeholder="Produto"
                      variant="standard"
                    />
                  )}
                />
                <FormControlLabel
                control={<Android12Switch defaultChecked />}
                value={customerProduct.product_id}
                variant="standard"
                onChange={(event) => handleInputChange(index, event)}
                label="Borda?"
              />
                <TextField
                  label="Purchase Date"
                  name="purchase_date"
                  variant="standard"
                  value={customerProduct.purchase_date}
                  onChange={(event) => handleInputChange(index, event)}
                />
                <TextField
                  label="Purchase Price"
                  name="purchase_price"
                  variant="standard"
                  value={customerProduct.purchase_price}
                  onChange={(event) => handleInputChange(index, event)}
                />
                <TextField
                  label="Purchase Quantity"
                  name="purchase_quantity"
                  variant="standard"
                  value={customerProduct.purchase_quantity}
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
    </Paper>
  );
};
