const txt_one = document.getElementById('text_one')
const txt_two = document.getElementById('text_two')
const search = document.getElementById('search')
const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    txt_two.textContent = ''

    const address = search.value
    if(address && address != "") {
        txt_one.textContent = 'loading...'
        const req = fetch(`/weather?address=${address}`)

        req.then(
            (response) => {
                response.json().then(data => {
                    if(data.error) {
                        return txt_one.textContent = data.error
                    }
                    txt_one.textContent = data.location
                    txt_two.textContent = data.forecast
                })
            }
        )
    }
    else {  
        txt_one.textContent = 'Merci de saisir votre adresse !'
    }

    fetch('/weather')
})