const weatherForm = document.querySelector('form')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()  //stop refreshing the page
    const searchValue = document.querySelector('input')
    
    messageOne.style.color = 'black'
    messageOne.textContent = 'loading ........'
    messageTwo.textContent = ' '

    
    fetch('http://localhost:3000/weather?address=' +searchValue.value).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.style.color = 'red'
            messageOne.textContent = data.error
            messageTwo.textContent = ' '
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
})