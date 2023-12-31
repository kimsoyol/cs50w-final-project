function CreateComponent() {
  const user = document
    .querySelector("#create-event")
    .getAttribute("data-user");

  // Get current date and time to prefill in form
  const currentDate = new Date();
  // Format date and time strings
  const currentDateString = currentDate.toISOString().split("T")[0];
  // To calculate Time for time input values
  const currentTime = currentDate.getHours() + 1;

  const [time, setTime] = React.useState(currentTime)
  const [timeValues, setTimeValues] = React.useState([])
  const [create, setCreate] = React.useState(false);
  const { Modal, Button } = ReactBootstrap;
  const [event, setEvent] = React.useState({
    title: "",
    start_date: currentDateString,
    start_time: '',
    description: "",
    location: "",
    image_url: "",
    privacy: "Public",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEvent({
      ...event,
      [name]: value,
    });
  };

  const handleDateChange = (e) => {
    // Set the start time options upon user date input
    const userDate = new Date(e.target.value);
    if (userDate > currentDate) {
      // If user choose future date time options are 24 hours
      setTime(0)
    } else {
      // If user choose today time options start from right now + 1h
      setTime(currentTime)
    }

    setEvent({
      ...event,
      start_date: e.target.value,
    });
  };


  React.useEffect(() => {
    let values = []
    let hour = 0
    let min = 0
    let meridiem = ' AM'

    if (time == 24){
      for (let i=0; i<60; i+=15){
        min = i
        values.push(12 +':'+ min + meridiem)
      }
    } else {
      for (let i=time; i<24; i++){
        for (let j=0; j<60; j+=15){
          if (i > 12) {
            hour = i - 12
            meridiem = ' PM'
          } else if (i == 12){
            hour = 12
            meridiem = ' PM'
          }else if (i == 0){
            hour = 12
          } else {
            hour = i
          }
          if (j === 0) {
            min = '00'
          } else ( min = j)
  
          values.push(hour +':'+ min + meridiem)
        }
      }
    } 
    // for start_time options
    setTimeValues(values)

    // set the initial state for start_time
    setEvent({
      ...event,
      start_time: values[0]
    })

  }, [event.start_date])


  // Show the modal
  const handleCreate = () => {
    setCreate(true);
  };

  // Close the modal
  const handleClose = () => {
    setCreate(false);
  };

  // Check if Form is filled
  const isFormValid = () => {
    return (
      event.title
    );
  };

  const handleSubmit = () => {
    setCreate(false);
    
    fetch('create_event', {
      method: "POST",
      body: JSON.stringify({
        event: event
      })
    })
      .then(res => res.json())
      .then(() => {
        console.log('event created');
      })
    
  };

  if (create) {
    return (
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="">
            <p>Host - {user}</p>
            <div className="form-group">
              <input
                name="image_url"
                type="text"
                placeholder="Add cover photo"
                className="form-control mb-3"
                onInput={handleChange}
              />
              <input
                name="title"
                type="text"
                placeholder="Event name"
                className="form-control mb-3"
                onInput={handleChange}
                required
              />
              <input
                name="location"
                type="text"
                placeholder="Add location"
                className="form-control mb-3"
                onInput={handleChange}
                required
              />
              <div className="form-group d-flex mb-3 gap-2">
                <div className="flex-fill">
                  <label htmlFor="startDate">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="start_date"
                    id="startDate"
                    value={event.start_date}
                    onChange={handleDateChange}
                    min={currentDateString}
                    required
                  />
                </div>
                {/* Start Time */}
                <div className="flex-fill">
                  <label htmlFor="startTime">Start Time</label>
                  <select className="time-value form-select form-control" id="startTime" onChange={handleChange} name="start_time">
                    {timeValues.map((timeValue) => {
                      return(
                        <option key={timeValue} value={timeValue}>{timeValue}
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>
              <textarea
                name="description"
                placeholder="Event's details?"
                className="form-control mb-3"
                onInput={handleChange}
              ></textarea>
              <select
                name="privacy"
                className="form-control mb-3"
                value={event.privacy}
                onChange={handleChange}
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
                <option value="Friends">Friends</option>
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            disabled={!isFormValid()}
            onClick={handleSubmit}
            className="form-control"
          >
            Create Event
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return ( <button className="btn btn-outline-primary me-2" onClick={handleCreate}>Create</button>
  );
}

ReactDOM.render(<CreateComponent />, document.querySelector("#create-event"));
