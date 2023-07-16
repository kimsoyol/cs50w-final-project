function InterestedBtn () {
    const id = document.querySelector(".interestedBtn").getAttribute('data-event-id')

    const [interest, setInterest] = React.useState()
    const [going, setGoing] = React.useState()

    React.useEffect(() => {
        console.log('interestedBtn effect');
        fetch(`/going/${id}`)
        .then((response) => response.json())
        .then(data => {
            setInterest(data.interest)
            setGoing(data.going)
        })
    }, [interest, going])
    


    return (
        <div className="dropdown">
            <button className={interest ? "btn btn-primary dropdown-toggle" : "btn btn-outline-primary dropdown-toggle" } type="button" data-bs-togg le="dropdown" aria-expanded="false">
                {going ? 'Going' : 'Interested'}
            </button>
            <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Interested</a></li>
                <li><a className="dropdown-item" href="#">Going</a></li>
                <li><a className="dropdown-item" href="#"> 
                    {going ? 'Not Going' : 'Not Interested'}</a>
                </li>
            </ul>
        </div>
    )

}
    

const btn = document.querySelector(".interestedBtn")
if (btn){
    ReactDOM.render(<InterestedBtn />, btn);
}
