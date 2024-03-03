import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, CardColumns, Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function App() {
  const [projetos, setProjetos] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/projetos')
      .then(response => {
        setProjetos(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  const handleFavoritar = (projeto) => {
    if (favoritos.some((fav) => fav.id === projeto.id)) {
      setFavoritos(favoritos.filter((fav) => fav.id !== projeto.id));
    } else {
      setFavoritos([...favoritos, projeto]);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      <Carousel ref={carouselRef} interval={5000} indicators={false} wrap={false}>
        {projetos.map((projeto, index) => (
          <Carousel.Item key={projeto.id}>
            <CardColumns className="d-flex justify-content-center">
              {projetos.slice(index, index + 4).map(projeto => (
                <Card key={projeto.id} style={{ width: '18rem', margin: '0 0.5rem' }}>
                  <Card.Body>
                    <Card.Title style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{projeto.nome}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{projeto.municipio} - {projeto.uf}</Card.Subtitle>
                    <Card.Text style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>{projeto.acessibilidade}</Card.Text>
                  </Card.Body>
                  <Card.Footer style={{ backgroundColor: 'transparent', borderTop: 'none' }}>
                  <p className="text-muted">Aprovado:<small className="text-muted font-weight-bold"> R$ {projeto.valor_aprovado.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true }).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</small></p>

                  </Card.Footer>
                  <Card.Footer style={{ backgroundColor: 'transparent', borderTop: 'none' }}>
                    <p className="text-muted">Captado:<small className="text-muted font-weight-bold"> R$ {projeto.valor_aprovado.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true }).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</small></p>
                  </Card.Footer>
                  <Card.Footer style={{ backgroundColor: 'transparent', borderTop: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button variant="primary" style={{ backgroundColor: '#f2f2f2', width: '80%', border: 'none', color: '#444' }}>Adicionar</Button>
                    <FontAwesomeIcon icon={favoritos.some((fav) => fav.id === projeto.id) ? faHeartSolid : faHeart} onClick={() => handleFavoritar(projeto)} style={{ color: favoritos.some((fav) => fav.id === projeto.id) ? 'red' : '#444', padding: '12px'}} />
                  </Card.Footer>




                </Card>
              ))}
            </CardColumns>

          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default App;
