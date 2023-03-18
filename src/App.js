import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Button, CardColumns } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/projetos')
      .then(response => {
        setProjetos(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  return (
    <Row xs={1} md={2} className="g-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <CardColumns>
          {projetos.map(projeto => (
            <Card key={projeto.id}>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>{projeto.nome}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{projeto.municipio} - {projeto.uf}</Card.Subtitle>
                <Card.Text>{projeto.acessibilidade}</Card.Text>
                <Card.Footer>
                  <small className="text-muted">Valor aprovado: R$ {projeto.valor_aprovado}</small>
                </Card.Footer>
                <Card.Footer>
                  <small className="text-muted">Valor captado: R$ {projeto.valor_captado}</small>
                </Card.Footer>
              </Card.Body>
              <Card.Footer>
                <Button variant="primary">Adicionar</Button>{' '}
                <Button variant="secondary">Favoritar</Button>
              </Card.Footer>
            </Card>
          ))}
        </CardColumns>
      ))}
 </Row>
  );
}

export default App;
