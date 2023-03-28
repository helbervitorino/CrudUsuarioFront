import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import './ListaUsuario.css';
import { BsPencilSquare } from 'react-icons/bs';
import { BsFillTrash3Fill } from 'react-icons/bs';

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [nomeUsuario, setnomeUsuario] = useState("");
  const [marcaCelular, setmarcaCelular] = useState("");
  const [sistemaOperacional, setSistemaOperacional] = useState("");
  const [modelo, setModeloCelular] = useState("");
  const [selectedIdUsuario, setSelectedIdUsuario] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:44337/api/Usuario/BuscarTodos");
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleDeleteUsuario = async (id) => {
    try {
      await axios.delete(`https://localhost:44337/api/Usuario/DeletarPorId/${id}`);
      setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
      window.location.reload(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCadastrarUsuario = async (event) => {
    event.preventDefault();
    const novoUsuario = {
      nomeUsuario,
      marcaCelular,
      sistemaOperacional,
      modelo,
    };

    try {
      const response = await axios.post("https://localhost:44337/api/Usuario/Cadastrar", novoUsuario);
      setUsuarios([...usuarios, response.data]);
      handleCloseModal();
      window.location.reload(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAlterarUsuario = async (event) => {
    event.preventDefault();
    const novoUsuario = {
      idUsuario: selectedIdUsuario,
      nomeUsuario,
      marcaCelular,
      sistemaOperacional,
      modelo,
    };

    try {
      const response = await axios.put("https://localhost:44337/api/Usuario/Alterar", novoUsuario);
      setUsuarios([...usuarios, response.data]);
      handleCloseModal();
      window.location.reload(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowModalEditar(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleShowModalEditar = async (idUsuario) => {
    setSelectedIdUsuario(idUsuario);
    try {
      const response = await axios.get(`https://localhost:44337/api/Usuario/BuscarPorId/${idUsuario}`);
      const { nomeUsuario, marcaCelular, sistemaOperacional, modelo } = response.data;
      setnomeUsuario(nomeUsuario);
      setmarcaCelular(marcaCelular);
      setSistemaOperacional(sistemaOperacional);
      setModeloCelular(modelo);
      setShowModalEditar(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <Button variant="primary" onClick={handleShowModal} style={{ margin: '2px' }}>
          Novo usuário
        </Button>
      </div>

      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data</th>
            <th>Marca</th>
            <th>MAC</th>
            <th>SO</th>
            <th>Modelo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.idUsuario}>
              <td>{usuario.nomeUsuario}</td>
              <td>{new Date(usuario.dataCadastro).toLocaleDateString()}</td>
              <td>{usuario.marcaCelular}</td>
              <td>{usuario.mac}</td>
              <td>{usuario.sistemaOperacional}</td>
              <td>{usuario.modelo}</td>
              <td>
                <div className="row">
                  <div className="col-md-6">
                    <Button variant="outline-secondary" onClick={() => handleShowModalEditar(usuario.idUsuario)}><BsPencilSquare /></Button>
                  </div>
                  <div className="col-md-6">
                    <Button variant="danger" onClick={() => handleDeleteUsuario(usuario.idUsuario)}><BsFillTrash3Fill /></Button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar Usuário</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleCadastrarUsuario}>

          <Modal.Body>
            <Form.Group className="meuGrupo" controlId="formNome">
              <Form.Label className="col-form-label">Nome:</Form.Label>
              <Form.Control className="meuInput" type="text" placeholder="Digite o nome do usuário" value={nomeUsuario} onChange={(event) => setnomeUsuario(event.target.value)} required />
            </Form.Group>
            <Form.Group className="meuGrupo" controlId="formNome">
              <Form.Label className="col-form-label">Marca do Celular:</Form.Label>
              <Form.Control className="meuInput" type="text" placeholder="Digite o nome a Marca" value={marcaCelular} onChange={(event) => setmarcaCelular(event.target.value)} required />
            </Form.Group>
            <Form.Group className="meuGrupo" controlId="formMac">
              <Form.Label>Modelo:</Form.Label>
              <Form.Control className="meuInput" type="text" placeholder="Digite o Modelo do Celular" value={modelo} onChange={(event) => setModeloCelular(event.target.value)} required />
            </Form.Group>
            <Form.Group className="meuGrupo" controlId="formSistemaOperacional">
              <Form.Label  >Sistema operacional</Form.Label>
              <Form.Control className="meuInput" as="select" value={sistemaOperacional} onChange={(event) => setSistemaOperacional(event.target.value)} required>
                <option value="">Selecione um sistema operacional</option>
                <option value="Android">Android</option>
                <option value="IOS">IOS</option>
                <option value="WindowsPhone">Windows Phone</option>
                <option value="Outros">Outros</option>
              </Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Cadastrar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showModalEditar} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuário</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAlterarUsuario}>
          <Modal.Body>
            <Form.Group className="meuGrupo" controlId="formNome">
              <Form.Label className="col-form-label">Nome:</Form.Label>
              <Form.Control className="meuInput" type="text" placeholder="Digite o nome do usuário" value={nomeUsuario} onChange={(event) => setnomeUsuario(event.target.value)} required />
            </Form.Group>
            <Form.Group className="meuGrupo" controlId="formNome">
              <Form.Label className="col-form-label">Marca do Celular:</Form.Label>
              <Form.Control className="meuInput" type="text" placeholder="Digite o nome a Marca" value={marcaCelular} onChange={(event) => setmarcaCelular(event.target.value)} required />
            </Form.Group>
            <Form.Group className="meuGrupo" controlId="formMac">
              <Form.Label>Modelo:</Form.Label>
              <Form.Control className="meuInput" type="text" placeholder="Digite o Modelo do Celular" value={modelo} onChange={(event) => setModeloCelular(event.target.value)} required />
            </Form.Group>
            <Form.Group className="meuGrupo" controlId="formSistemaOperacional">
              <Form.Label  >Sistema operacional</Form.Label>
              <Form.Control className="meuInput" as="select" value={sistemaOperacional} onChange={(event) => setSistemaOperacional(event.target.value)} required>
                <option value="">Selecione um sistema operacional</option>
                <option value="Android">Android</option>
                <option value="IOS">IOS</option>
                <option value="WindowsPhone">Windows Phone</option>
                <option value="Outros">Outros</option>
              </Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ListaUsuarios;
