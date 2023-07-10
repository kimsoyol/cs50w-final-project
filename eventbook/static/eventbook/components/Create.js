
function CreateComponent() {
  const user = document.querySelector("#create-event").getAttribute("data-user")
  const [event, setEvent] = React.useState();
  const [create, setCreate] = React.useState(false);
  const { Modal, Button } = ReactBootstrap;


  const handleCreate = (e) => {
    setCreate(true);
  }

  const handleClose = () => {
    setCreate(false);
  }

  if (create) {
    return (
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={user} readOnly />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div>
      <button onClick={handleCreate}>Create</button>
    </div>
  )
}

ReactDOM.render(<CreateComponent />, document.querySelector("#create-event"));
