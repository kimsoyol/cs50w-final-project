function EventComponent() {
  const user = document.querySelector(".events-content").getAttribute('data-user')

  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    console.log('effectEvent');
    fetch(`/events`)
      .then((response) => response.json())
      .then((events) => {
        setEvents(events);
      });
  }, []);
  
  const handleClick = (id) => {
    window.location.href = `/event_details/${id}`
  }


  const handleInterested = (id) => {
    console.log('clicked');
    const event = events.find(e => e.id === id)
    let status = ''
    console.log(event.interested_guests);
    if (event.interested_guests.includes(user)){
      status = 'remove'
      console.log('remove from interested')
    } else {
      status = 'add'
      console.log('add to interested')
    }

    fetch(`/interested/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        status: status
      })
    })
      
  }

  return events.map((event) => (
    <div id={event.id} className="card" style={{ width: "18rem" }} onClick={() => handleClick(event.id)}>
      <img src={event.image_url} alt="event-image" className="card-img-top" />
      <div className="card-body">
        <p className="card-text">{event.start_time}</p>
        <h5 className="card-title">{event.title}</h5>
        <p className="card-text">
          <span className="d-block">{event.location}</span>
          <span>{event.interested_guests.length} Interested</span>
          <span>{event.going_guests.length} Going</span>
        </p>
        
        <button href="#" className={event.interested_guests.includes(user) ? "btn btn-primary": "btn btn-outline-primary"} onClick={() => handleInterested(event.id)}>
          Interested
        </button>
      </div>
    </div>
  ));
}

ReactDOM.render(<EventComponent />, document.querySelector("#events-section"));
