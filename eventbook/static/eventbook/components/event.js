function EventComponent() {
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    fetch(`/events`)
      .then((response) => response.json())
      .then((events) => {
        setEvents(events);
      });
  }, []);

  return events.map((event) => (
    <div id={event.id} className="card" style={{ width: "18rem" }}>
      <img src={event.image_url} alt="event-image" className="card-img-top" />
      <div className="card-body">
        <p className="card-text">{event.start_time}</p>
        <h5 className="card-title">{event.title}</h5>
        <p class="card-text">{event.location}</p>
        <span>{event.interested_guests.length} Interested</span>
        <span>{event.going_guests.length} Going</span>
        <a href="#" class="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  ));
}

ReactDOM.render(<EventComponent />, document.querySelector("#events-section"));
