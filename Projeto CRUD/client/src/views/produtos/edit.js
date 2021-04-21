import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import StaticMenuAdmin from '../../components/staticMenuAdmin'
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router-dom';
import Axios from 'axios';


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
  }, title: { flexGrow: 1, }, appBarSpacer: theme.mixins.toolbar, content:
  {
    flexGrow: 1, height: '100vh',
    overflow: 'auto',
  }, container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  }, paper: {
    padding: 15,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));



export default function EditProduto() {
  const classes = useStyles();

  const [nome, setNomeProduto] = useState('')
  const [descricao, setDescricaoProduto] = useState('')
  const [preco, setPrecoProduto] = useState('')
  const [quantidade, setQuantidadeProduto] = useState('')
  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    async function getProduto() {
      var response = await Axios.get("http://localhost:3001/produtos/"+id)
      setNomeProduto(response.data.nome);
      setDescricaoProduto(response.data.descricao);
      setPrecoProduto(response.data.preco);
      setQuantidadeProduto(response.data.quantidade);
    }
    getProduto();
  }, [])

  const submit = async function () {

    if (nome == '' || descricao == '' || preco == '' || quantidade == '') {
      alert('Favor preencher todos os campos');
    }
    else {
      const response = await Axios.put("http://localhost:3001/produtos/"+id, { nome, descricao, preco, quantidade })

      if (response.status == 200) {
        alert('Sucesso ao editar');
        history.push('/produtos')
      }
      else {
        alert('Erro ao editar produto!');
      }
    }

  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <StaticMenuAdmin title={"Edição de Produto"} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2>Formulário de Edição</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="nome"
                      name="nome"
                      label="Nome"
                      fullWidth
                      autoComplete="Nome"
                      value={nome}
                      onChange={(e) => {
                        setNomeProduto(e.target.value)
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="descricao"
                      name="descricao"
                      label="Descricão"
                      fullWidth
                      autoComplete="Descricão"
                      value={descricao}
                      onChange={(e) => {
                        setDescricaoProduto(e.target.value)
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="quantidade"
                      name="quantidade"
                      label="Quantidade"
                      fullWidth
                      autoComplete="Quantidade"
                      type="number"
                      value={quantidade}
                      onChange={(e) => {
                        setQuantidadeProduto(e.target.value)
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="preco"
                      name="preco"
                      label="Preço"
                      fullWidth
                      autoComplete="Preço"
                      type="number"
                      value={preco}
                      onChange={(e) => {
                        setPrecoProduto(e.target.value)
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Button variant="contained" color="primary" onClick={submit} type="submit">
                      Editar
                    </Button>
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