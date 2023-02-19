import React, { useState } from "react";
import { NotData, StyledTableCell } from "../util";
import { Options } from "./Options";
import { Paper, Table, TableBody,TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { ButtonAdd } from "./ButtonAdd";

export const TabelaPaginada = ({colunas, dados, handleDelete, handleDetail}) => {

  const [pagina, setPagina] = useState(0);
  const [linhasPorPagina, setLinhasPorPagina] = useState(12);

  const handleChangePagina = (event, novaPagina) => {
    setPagina(novaPagina);
  };

  const handleChangeLinhasPorPagina = (event) => {
    setLinhasPorPagina(+event.target.value);
    setPagina(0);
  };

  return (
    <Paper sx={{ minHeight: "100%", overflow: "hidden"}}>
      <TableContainer sx={{ width: "100%", height: "76.6vh" }} key={999}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow key={999}>
              {colunas.map((col,index) =>
                "pk_visible" in col && !col.pk_visible ? (
                  ""
                ) : (
                  <StyledTableCell align={col.align} key={index}>
                    {col.label}
                  </StyledTableCell>
                )
              )}
              <StyledTableCell align={"center"}>Opções</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(dados) ? (
              dados
                .slice(
                  pagina * linhasPorPagina,
                  pagina * linhasPorPagina + linhasPorPagina
                )
                .map((row,index) => (
                  <TableRow hover tabIndex={-1} key={("array" in colunas[0] ? row[colunas[0].array][colunas[0].id]: row[colunas[0].id])+'_'+index}>
                    {colunas.map((col) =>
                      "pk_visible" in col && !col.pk_visible ? (
                        ""
                      ) : (
                        <StyledTableCell align={col.align} >
                          {col.number
                            ? "array" in col ? row[col.array][col.id].toString().replace(".", ",") 
                            : row[col.id].toString().replace(".", ",")
                            : "array" in col ?  row[col.array] ? "format" in col ? col.format(row[col.array][col.id]) : row[col.array][col.id] : 'Não identificado' 
                            : "format" in col ? col.format(row[col.id]) : row[col.id]}
                        </StyledTableCell>
                      )
                    )}
                    <StyledTableCell align="center" key={("array" in colunas[0] ? row[colunas[0].array][colunas[0].id]: row[colunas[0].id]) + '_options'}>
                      <Options
                        id={"array" in colunas[0] ? row[colunas[0].array][colunas[0].id]: row[colunas[0].id]}
                        handleDelete={handleDelete}
                        handleDetail={handleDetail}
                      />
                    </StyledTableCell>
                  </TableRow>
                ))
            ) : (
              <NotData />
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[12, 18, 25]}
          component="div"
          count={dados.length}
          rowsPerPage={linhasPorPagina}
          page={pagina}
          onPageChange={handleChangePagina}
          onRowsPerPageChange={handleChangeLinhasPorPagina}
        />
      </TableContainer>
      <ButtonAdd />
    </Paper>
  );
};
