
function InterestedBtn () {
    const id = document.querySelector(".interestedBtn").getAttribute('data-event-id')
    let totalPeopleEle = document.querySelector("#ppl-responded")
    let textIndex = totalPeopleEle.indexOf(" people responded")
    let totalPeople = parseInt(totalPeopleEle.slice(0, textIndex));

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

    const handleInterest = () => {
        const status = !interest
        fetch(`/going/${id}`, {
            method: 'PUT',
            body : JSON.stringify({
                engage: 'interest',
                status: status 
            })
        }).then((response) => response.json())
        .then(data => setInterest(data.status))
        console.log('interest set to ' + status);
        let newCount = !interest ? totalPeople + 1 : totalPeople - 1
        totalPeopleEle.textContent = `${newCount} people responded`;
    }

    const handleGoing = () => {
        const status = !going
        fetch(`/going/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                engage: 'going',
                status: status
            })
        }).then((response) => response.json())
        .then(data => setGoing(data.status))
        console.log('going set to ' + status);
        totalPeopleEle.textContent = !interest ? Number(totalPeople) + 1 : Number(totalPeople) - 1

    }
 
    console.log('outside interset ' + interest);
    console.log('outside going ' + going);
    console.log('=================================' );

    return (
        <div class="btn-group" role="group" >
            <input type="radio" class="btn-check" id="btnradio1" autocomplete="off" checked={interest} onClick={handleInterest}/>
            <label class="btn btn-outline-primary" for="btnradio1">Interested</label>

            <input type="radio" class="btn-check" id="btnradio2" autocomplete="off" checked={going} onClick={handleGoing}/>
            <label class="btn btn-outline-primary" for="btnradio2">Going</label>
        </div>
    )

}
    

const btn = document.querySelector(".interestedBtn")
if (btn){
    ReactDOM.render(<InterestedBtn />, btn);
}




