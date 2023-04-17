import { useState } from "react";
import { registerUser } from "../apis/user";
import { Form, Button, Modal } from "react-bootstrap";

function RegistrationForm() {
  /* creo constantes de los campos que se usaran para el registro */
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [password, setPassword] = useState("");

  /* cosntantes para manejar el mensaje de registro exitoso */
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    /* aqui armo el json que se enviara  */
    try {
      const userData = {
        firstName: name,
        lastName,
        email,
        address: {
          zip: postalCode,
        },
        password,
      };

      /* llamo a mi componente que consume el api y le paso el json que se envia */
      const data = await registerUser(userData);

      /* estados para el mensaje si es que fue exitoso */
      setSuccessMessage(`Registro exitoso. ID: ${data.id}`);
      setShowSuccessMessage(true);
      setName("");
      setLastName("");
      setEmail("");
      setPostalCode("");
      setPassword("");
    } catch (error) {
      /* cacho si hay algun error al registrar */
      console.error(error);
    }
  };

  /* creo el formulario */
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Nombre:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresa tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>Apellidos:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresa tus apellidos"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Correo electrónico:</Form.Label>
        <Form.Control
          type="email"
          placeholder="Ingresa tu correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPostalCode">
        <Form.Label>Código postal:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresa tu código postal"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña:</Form.Label>
        <Form.Control
          type="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Registrarse
      </Button>

      {/* construi un modal con react-boostrap, este modal sale si el registro fue exitoso devuelvo el mesaje y el id de registro */}
      <Modal
        show={showSuccessMessage}
        onHide={() => setShowSuccessMessage(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>¡Registro exitoso!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{successMessage}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowSuccessMessage(false)}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
}

export default RegistrationForm;
