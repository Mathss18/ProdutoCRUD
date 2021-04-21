import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './views/dashboard/index';
import Produtos from './views/produtos/index';
import ProdutosCreate from './views/produtos/create';
import ProdutosEdit from './views/produtos/edit';

export default function Routes(){

    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Dashboard}></Route>
                <Route path="/produtos" exact component={Produtos}></Route>
                <Route path="/produtos/create" exact component={ProdutosCreate}></Route>
                <Route path="/produtos/edit/:id" exact component={ProdutosEdit}></Route>
            </Switch>
        </BrowserRouter>
    )
}