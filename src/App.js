import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';

import Almacen from './Components/Almacen';
import Clientes from './Components/Clientes';
import Compras from './Components/Compras';
import Empleados from './Components/Empleados';
import Productos from './Components/Productos';
import Proveedores from './Components/Proveedores';
import Sedes from './Components/Sedes';
import Ventas from './Components/Ventas';

function App() {
  return (
    <Fragment>
      <Router>
        <div className="App">
          <header className="App-header">
            <Link to='/'>
            
<div><p class="title">Negocio-Operativo</p>
<div class="wrapper">
      
      <div class="clip-text clip-text_one">JINTOS</div>
  <div class="clip-text clip-text_fifteen clip-text--no-textzone">JINTOS</div>
      <div class="clip-text clip-text_twelve clip-text--cover">JINTOS</div>
  <div class="clip-text clip-text_tree clip-text--no-textzone">JINTOS</div>
      <div class="clip-text clip-text_two">JINTOS</div>
      <div class="clip-text clip-text_fourteen clip-text--cover">JINTOS</div>
      <div class="clip-text clip-text_tree">JINTOS</div>
      <div class="clip-text clip-text_eleven clip-text--cover">JINTOS</div>
      <div class="clip-text clip-text_four">JINTOS</div>
      <div class="clip-text clip-text_five">JINTOS</div>
      <div class="clip-text clip-text_six">JINTOS</div>
      <div class="clip-text clip-text_seven">JINTOS</div>
      <div class="clip-text clip-text_eight">JINTOS</div>
      <div class="clip-text clip-text_nine">JINTOS</div>
      <div class="clip-text clip-text_ten">JINTOS</div>
      <div class="clip-text clip-text_thirteen clip-text--cover">JINTOS</div>
  </div>
</div>

            </Link>

            <div className="App">
              <div>
                <ul>
                  <li>
                    <Link to='/Almacen'>
                      <button>Almacen</button>
                    </Link>
                  </li>
                  <li>
                    <Link to='/Clientes'>
                      <button>Clientes</button>
                    </Link>
                  </li>
                  <li>
                    <Link to='/Compras'>
                      <button>Compras</button>
                    </Link>
                  </li>
                  <li>
                    <Link to='/Empleados'>
                      <button>Empleados</button>
                    </Link>
                  </li>
                  <li>
                    <Link to='/Productos'>
                      <button>Productos</button>
                    </Link>
                  </li>
                  <li>
                    <Link to='/Proveedores'>
                      <button>Proveedores</button>
                    </Link>
                  </li>
                  <li>
                    <Link to='/Sedes'>
                      <button>Sedes</button>
                    </Link>
                  </li>
                  <li>
                    <Link to='/Ventas'>
                      <button>Ventas</button>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

           
            <Routes>
              <Route path='/Almacen' element={<Almacen />} />
              <Route path='/Clientes' element={<Clientes />} />
              <Route path='/Compras' element={<Compras />} />
              <Route path='/Empleados' element={<Empleados />} />
              <Route path='/Productos' element={<Productos />} />
              <Route path='/Proveedores' element={<Proveedores />} />
              <Route path='/Sedes' element={<Sedes />} />
              <Route path='/Ventas' element={<Ventas />} />
              <Route path='/' element={<div />} />
            </Routes>
          </header>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
