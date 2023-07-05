function EventContainer() {

  const [events, setEvents] = React.useState([])

  React.useEffect(() => { 
    fetch(`/events`)
    .then((response) => response.json())
    .then(events => {
      setEvents(events)
    })
   },[])

  return (
      events.map(event => (
        <div id={event.id}>
          <h3>{event.title}</h3>
          <span>{new Date(event.start_time).toLocaleString()}</span>
        </div>
      ))
  );
}

ReactDOM.render(<EventContainer />, document.querySelector("#events-section"));
