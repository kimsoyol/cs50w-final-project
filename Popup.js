function PopupComponent() {
  const [create, setCreate] = React.useState(false);

  const hanleCreateBtn = () => {
    setCreate(true);
  };

  const handleAbort = () => {
    setCreate(false);
  };

  

  if (create) {
    document.addEventListener("click", handleAbort);
    console.log('hosy');
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-slate-100 flex justify-center items-center">
        <form action="">
          <input type="text" name="title" />
        </form>
      </div>
    );
  }

  return (
    <div>
      <button onClick={hanleCreateBtn}>Create Event</button>
    </div>
  );
}

ReactDOM.render(<PopupComponent />, document.querySelector("#create"));
