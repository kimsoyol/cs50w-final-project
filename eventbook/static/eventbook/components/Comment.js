function EditBtn() {
  return (
    <a href="#" className="link-muted position-absolute top-0 end-0">
      <i className="bi bi-pencil" style={{ color: "black" }}></i>
    </a>
  );
}

function CommentComponent() {
  const eventId = document
    .querySelector(".cmt-component")
    .getAttribute("data-event-id");
  const user = document
    .querySelector(".cmt-component")
    .getAttribute("data-user");

  const [cmts, setCmts] = React.useState([]);
  const [newCmt, setNewCmt] = React.useState("");

  React.useEffect(() => {
    fetch(`/comment/${eventId}`)
      .then((response) => response.json())
      .then((comments) => {
        setCmts(comments);
      });
  }, [newCmt]);

  const addCmt = (e) => {
    if (e.key === "Enter") {
      fetch(`/comment/${eventId}`, {
        method: "POST",
        body: JSON.stringify({
          comment: newCmt,
        }),
      })
        .then((res) => res.json())
        .then((comment) => {
          // Append the new comment to the cmts
          setCmts((cmts) => [comment, ...cmts]);

          // Clear the input field
          setNewCmt("");
        });
    }
  };

  return (
    <div className="card-body p-4">
      <div className="pb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Type new comment..."
          onChange={(e) => setNewCmt(e.target.value)}
          value={newCmt}
          onKeyDown={addCmt}
        />
      </div>
      {cmts.map((cmt) => (
        <React.Fragment>
        <div className="card-body p-4">
          <h6 className="fw-bold mb-1"
            style={{ "text-transform": "capitalize" }}
          >
            {cmt.user}
          </h6>
          <div className="d-flex align-items-center mb-3 position-relative">
            <p className="mb-0 text-muted">
              <small>{cmt.comment_date}</small>
            </p>
            {/* Show edit btn if user's comment */}
            {cmt.user == user ? <EditBtn /> : <div></div>}
          </div>
          <p className="mb-0" id={cmt.id}>
            {cmt.content}
          </p>
         
        </div>
        <hr className="my-0" />
        </React.Fragment>
      ))}
    </div>
  );
}

ReactDOM.render(<CommentComponent />, document.querySelector(".cmt-component"));
