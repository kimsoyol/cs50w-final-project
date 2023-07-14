function EventComponent() {
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

  return events.map((event) => (
    <div id={event.id} className="card" style={{ width: "18rem" }} onClick={() => handleClick(event.id)}>
      <img src={event.image_url} alt="event-image" className="card-img-top" />
      <div className="card-body">
        <p className="card-text">{event.start_time}</p>
        <h5 className="card-title">{event.title}</h5>
        <p class="card-text">
          <span className="d-block">{event.location}</span>
          <span>{event.interested_guests.length} Interested</span>
          <span>{event.going_guests.length} Going</span>
        </p>
        <a href="#" class="btn btn-primary">
          Interested
        </a>
      </div>
    </div>
  ));
}

ReactDOM.render(<EventComponent />, document.querySelector("#events-section"));
