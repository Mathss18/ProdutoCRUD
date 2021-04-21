import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import StaticMenuAdmin from '../../components/staticMenuAdmin'
import Axios from 'axios';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { If, Then, Else, When, Unless, Switch, Case, Default } from 'react-if';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/Mathss18">
        Matheus Filho
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);



export default function IndexProduto() {
  const classes = useStyles();
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function loadProdutos() {
      const response = await Axios.get("http://localhost:3001/produtos");

      setProdutos(response.data);
    }
    loadProdutos()
  }, [])

  async function deleteProduto(id) {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      var result = await Axios.delete("http://localhost:3001/produto/" + id)
      console.log(result.status);
      if (result.status == 200) {
        window.location.href = '/produtos';
      }
      else {
        alert('Erro ao excluir, tente novamente...')
      }
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <StaticMenuAdmin title="Lista de Produtos" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12} >
              <Paper className={classes.paper}>
                <h2>Listagem de Produtos</h2>
                <Grid item xs={12} sm={12} >
                  <Button variant="contained" color="primary" href={'/produtos/create'}>Criar novo produto</Button>
                </Grid>
                <br/>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TableContainer component={Paper}>
                      <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>Id</StyledTableCell>
                            <StyledTableCell align="right">Nome</StyledTableCell>
                            <StyledTableCell align="right">Descrição</StyledTableCell>
                            <StyledTableCell align="right">Quantidade</StyledTableCell>
                            <StyledTableCell align="right">Preço</StyledTableCell>
                            <StyledTableCell align="right">Situação</StyledTableCell>
                            <StyledTableCell align="right">Opções</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {produtos.map((row) => (
                            <StyledTableRow key={row.id}>
                              <StyledTableCell component="th" scope="row">
                                {row.id}
                              </StyledTableCell>
                              <StyledTableCell align="right">{row.nome}</StyledTableCell>
                              <StyledTableCell align="right">{row.descricao}</StyledTableCell>
                              <StyledTableCell align="right">{row.quantidade}</StyledTableCell>
                              <StyledTableCell align="right">{row.preco}</StyledTableCell>
                              <StyledTableCell align="right">
                                <If condition={row.quantidade >= 0 && row.quantidade <= 20}>
                                  <Then>
                                    <Badge color='error' badgeContent='Crítico' />
                                  </Then>
                                </If>
                                <If condition={row.quantidade >= 21 && row.quantidade <= 50}>
                                  <Then>
                                    <Badge color='secondary' badgeContent='Alerta' />
                                  </Then>
                                </If>
                                <If condition={row.quantidade >= 51}>
                                  <Then>
                                    <Badge color='primary' badgeContent='OK' />
                                  </Then>
                                </If>
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                <ButtonGroup aria-label="outlined primary button group">
                                  <Button color="primary" href={'/produtos/edit/' + row.id}>Editar</Button>
                                  <Button color="secondary" onClick={() => deleteProduto(row.id)}>Deletar</Button>
                                </ButtonGroup>
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}