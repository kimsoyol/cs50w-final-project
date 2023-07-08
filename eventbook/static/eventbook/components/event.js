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
    <div id={event.id} className="shrink-0 w-80 rounded-xl shadow-lg">
      <img
        src={event.image_url}
        alt="event-image"
        className="rounded-lg"
      />
      <div className="mt-4">
        <span>{event.start_time}</span>
        <h3>{event.title}</h3>
        <p>{event.location}</p>
        <span>{event.interested_guests.length} Interested</span>
        <span>{event.going_guests.length} Going</span>
      </div>
    </div>
  ));
}

ReactDOM.render(<EventComponent />, document.querySelector("#events-section"));
