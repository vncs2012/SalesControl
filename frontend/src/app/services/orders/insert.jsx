import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from "@mui/styles";
import { insert, get_select } from './api';
import TextField from '@mui/material/TextField';
import {  Button, Grid,  Paper } from '@mui/material';
import { alertSucesso, hideLoading, NumberFormatCustom, showLoading } from '../../util';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    textField: {
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));


NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};  

export const Insert = () => {
    const classes = useStyles();
    const [client, setClient] = useState([]);
    const [save, setSave] = useState(false)
    const [form, setForm] = useState({ nu_value: '', id_client: '' });
    const [customerProducts, setCustomerProducts] = useState([{ customer_id: '', product_id: '', purchase_date: '', purchase_price: '', purchase_quantity: '', },]);

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    useEffect(() => {
        const getClient = async () => {
            let { data } = await get_select_insert('client')
            if (data) {
                setClient(data);
            }
        };
        getClient();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        showLoading()
        const { data } = await insert(form)
        if (data.status === 201) {
            hideLoading()
            alertSucesso(true, setSave, true)
        }
    }

    const handleAddCustomerProduct = () => {
        setCustomerProducts([
            ...customerProducts, { customer_id: '', product_id: '', purchase_date: '', purchase_price: '', purchase_quantity: '', },
        ]);
    };

    const handleRemoveCustomerProduct = index => {
        setCustomerProducts(customerProducts.filter((_, i) => i !== index));
    };

    const handleInputChange = (index, event) => {
        const values = [...customerProducts];
        values[index][event.target.name] = event.target.value;
        setCustomerProducts(values);
    };

    return (
        <Paper className={classes.root}>
            <Grid container direction="column" alignItems="center">
                {customerProducts.map((customerProduct, index) => (
                    <Grid item key={index}>
                        <Grid container direction="row" alignItems="center">
                            <TextField
                                label="Customer ID"
                                className={classes.textField}
                                name="customer_id"
                                value={customerProduct.customer_id}
                                onChange={event => handleInputChange(index, event)}
                            />
                            <TextField
                                label="Product ID"
                                className={classes.textField}
                                name="product_id"
                                value={customerProduct.product_id}
                                onChange={event => handleInputChange(index, event)}
                            />
                            <TextField
                                label="Purchase Date"
                                className={classes.textField}
                                name="purchase_date"
                                value={customerProduct.purchase_date}
                                onChange={event => handleInputChange(index, event)}
                            />
                            <TextField
                                label="Purchase Price"
                                className={classes.textField}
                                name="purchase_price"
                                value={customerProduct.purchase_price}
                                onChange={event => handleInputChange(index, event)}
                            />
                            <TextField
                                label="Purchase Quantity"
                                className={classes.textField}
                                name="purchase_quantity"
                                value={customerProduct.purchase_quantity}
                                onChange={event => handleInputChange(index, event)}
                            />
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleRemoveCustomerProduct(index)}
                            >
                                Remove
                            </Button>
                        </Grid>
                    </Grid>
                ))}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddCustomerProduct}
                >
                    Add Customer Product
                </Button>
            </Grid>
        </Paper>
    );
}