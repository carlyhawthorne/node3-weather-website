console.log('client side javascript is loaded')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
//Target a id on element uses #
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=> {
    //Prevents default behaviour of refresh page and runs the page
    e.preventDefault()

    //get text out of box
    const location = search.value

    //generate url and pass to fetch

    console.log(location)
    messageOne.textContent = 'Loading......'

    //Fetch data then run the callback function
    //Fetch JSON data from a URL
    //fetch('http://localhost:3006/weather?address='+ location).then ((response) => {
        fetch('/weather?address='+ location).then ((response) => {
        response.json().then((data) => {
            if(data.error)
            {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            }
            else
            {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})
