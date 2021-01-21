import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Row, Col, Card, ListGroup, Img, Modal, Container, Pagination } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const API_KEY = 'b12b8bf0';

const MovieDetailModal = (props) => {
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.movie.Title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <div className="row el-center">
          <img src={props.movie.Poster} />
        </div>
      </Modal.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Type: {props.movie.Type}</ListGroup.Item>
        <ListGroup.Item>Year: {props.movie.Year}</ListGroup.Item>
        <ListGroup.Item>imdbID: {props.movie.imdbID}</ListGroup.Item>
      </ListGroup>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
const Movie = (props) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Img className="card-img" variant="top" src={props.movie.Poster} />
        <Card.Body>
          <Card.Title className="h-40" >{props.movie.Title}</Card.Title>
        </Card.Body>
        <Button variant="primary" onClick={() => setModalShow(true)}>Show Detail</Button>
      </Card>

      <MovieDetailModal
        movie={props.movie}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  )
}

const MovieList = (props) => {
  return (
    <>
      <Container className="cnt-mar">
        <Row>
          {props.movies.map((movie, index) => (
            <Col><Movie movie={movie} /></Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

const SearchBox = (props) => {
  return (
    <div className='col col-sm-4'>
      <input
        className='form-control'
        value={props.value}
        onChange={(event) => props.setSearchValue(event.target.value)}
        placeholder='Type to search...'
      ></input>
    </div>
  );
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('Hababam');
  //pagination val not finish!
  const [firstMovie, setFirstMovie] = useState(0);
  const [lastMovie, setLastMovie] = useState(4);
  const [pages, setPages] = useState([1, 2, 3]);
  const [selectedPage, setSelectedPage] = useState(2);


  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Movie Heaven
        </p>
      </header>
      <div className="MovieHeaven">
        <div className='row mt-4 mb-4 el-center'>
          <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
        </div>
        <div className='row'>
          {/* <MovieList movies={movies.slice(firstMovie, lastMovie)} /> */}
          <MovieList movies={movies} />
        </div>
        <div className='row mt-4 el-center'>
          {pages.map((page, index) => (
            <p className="pag-num" >{page}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
