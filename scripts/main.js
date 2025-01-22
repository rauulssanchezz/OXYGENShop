const main = () => {
    try{
        toggleMenu()
        positionMenu()
        selectCurrency()
        handleContactForm()
        progressBar()
        modalForm()
        returnButton()
    }catch(error){
        console.error(error)
    }
}

main()

function toggleMenu () {
    const toggleMenu = document.getElementById('toggle-menu')
    const spans = document.getElementsByClassName('toggle-span')
    const nav = document.getElementById('nav')

    toggleMenu.addEventListener('click', () => {
        for(let i = 0; i < spans.length; i++){
            spans[i].style.display = spans[i].style.display === 'none' ? 'block' : 'none'
        }
        
        if(toggleMenu.style.backgroundImage.includes('close.png')){
            toggleMenu.style.backgroundImage = 'none'
        }else{
            toggleMenu.style.backgroundImage = 'url(./assets/close.png)'
        }

        toggleMenu.style.backgroundSize = 'contain'
        toggleMenu.style.marginInlineEnd = toggleMenu.style.marginInlineEnd === '0.5rem' ? '0' : '0.5rem'
        toggleMenu.style.marginTop= toggleMenu.style.marginTop === '0.5rem' ? '0' : '0.5rem'
        nav.style.display = nav.style.display === 'block' ? 'none' : 'block'
    })
}

function positionMenu () {
    const lists = document.getElementsByClassName('nav-li')
    const returnButton = document.getElementById('return-button')

    for(let i = 0; i < lists.length; i++){
        lists[i].addEventListener('click', () => {
            for(let j = 0; j < lists.length; j++){
                lists[j].style.border = 'none'
            }
            lists[i].style.borderBottom = '2px solid #08A6E4'
        })
    }

    returnButton.addEventListener('click', () => {
        for(let i = 0; i < lists.length; i++){
            lists[i].style.border = 'none'
        }
        lists[0].style.borderBottom = '2px solid #08A6E4'
    })
}

async function handleContactForm () {
    const nameInput = document.getElementById('name')
    const emailInput = document.getElementById('email')
    const contactInputButton = document.getElementById('contact-input-button')
    const checkBoxPrivacity = document.getElementById('privacity')

    let name = ''
    let email = ''
    let check = false

    const emailRegex = new RegExp(
    '^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$'
    )

    contactInputButton.addEventListener('click', async () => {
        name = nameInput.value
        email = emailInput.value
        check = checkBoxPrivacity.checked

        nameInput.style.borderBottom = '2px solid gray'
        emailInput.style.borderBottom = '2px solid gray'
        checkBoxPrivacity.style.border = '2px solid gray'

        if(name.length > 2 && name. length < 100 && emailRegex.test(email) && check){
            const objBody = {
                name: name,
                email: email,
                privacity: check
            }

            const response = await fetchFormData(objBody)

            alert('Form sent successfully')
            nameInput.value = ''
            emailInput.value = ''
            nameInput.style.borderBottom = '2px solid gray'
            emailInput.style.borderBottom = '2px solid gray'
            checkBoxPrivacity.style.border= '2px solid gray'

        }else if(name === '' || (name <= 2 && name >= 100)){
            alert('Name is required and have to be between 2 and 100 characters')
            nameInput.style.borderBottom ='2px solid red'
            return
            
        }else if(email === '' || !email.match(emailRegex)){
            alert('Email is required and have to be a valid email')
            emailInput.style.borderBottom ='2px solid red'
            return

        }else if(!check){
            alert('You have to accept the privacity policy')
            checkBoxPrivacity.style.border ='2px solid red'
            return

        }
    })
}

//not functional
function progressBar() {
    console.log('progressBar')
    console.log({window})
    console.log({document})
    try{
        console.log(window.onscroll = () => {})
        window.onscroll = () => {
            console.log('scrolling')
            const progressBar = document.getElementById('progress-bar')
    
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    
            const scrollTop = document.documentElement.scrollTop
    
            const progress = (scrollTop / scrollHeight) * 100
    
            progressBar.style.width = `${progress}%`
    
           console.log(`changing: ${progress}`)
        }
    }catch(error){
        console.error(error)
    }
}

async function selectCurrency () {
    const select = document.getElementById('currency-select')
    const priceBasic = document.getElementById('price-basic')
    const pricePro = document.getElementById('price-professional')
    const pricePremium = document.getElementById('price-premium')

    let currency = select.value

    const rawCurrencies = await getCurrencies(currency)
    const currencies = rawCurrencies[0][currency]

    const basicValue = Number.parseInt(priceBasic.textContent.slice(1,priceBasic.textContent.length))
    const proValue = Number.parseInt(pricePro.textContent.slice(1,pricePro.textContent.length))
    const premiumValue = Number.parseInt(pricePremium.textContent.slice(1,pricePremium.textContent.length))

    const currencyChange = []

    currencyChange.push(currencies['eur'])
    currencyChange.push(currencies['gbp'])

    const values = {
        usdBasicValue: basicValue,
        usdProValue: proValue,
        usdPremiumValue: premiumValue,
        eurBasicValue: Math.round(basicValue * currencyChange[0]),
        eurProValue: Math.round(proValue * currencyChange[0]),
        eurPremiumValue: Math.round(premiumValue * currencyChange[0]),
        gbpBasicValue: Math.round(basicValue * currencyChange[1]),
        gbpProValue: Math.round(proValue * currencyChange[1]),
        gbpPremiumValue: Math.round(premiumValue * currencyChange[1])
    }

    const currenciesSymbols = {
        eur: '€',
        usd: '$',
        gbp: '£'
    }

    select.addEventListener('change', () => {
        previousCurrency = currency
        currency = select.value

        const selectedCurrency = [`${currency}BasicValue`, `${currency}ProValue`, `${currency}PremiumValue`]

        priceBasic.textContent = `${currenciesSymbols[currency]}${values[selectedCurrency[0]]}`
        pricePro.textContent = `${currenciesSymbols[currency]}${values[selectedCurrency[1]]}`
        pricePremium.textContent = `${currenciesSymbols[currency]}${values[selectedCurrency[2]]}`
    })   
}

async function getCurrencies (currency) {
    let currencies = []
    await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
    .then((response) => response.json())
    .then((data) => currencies.push(data))
    .catch((error) => console.error(error))

    return currencies
}

function modalForm () {
    const modal = document.getElementById('modal')
    const closeModal = document.getElementById('close-modal')
    modal.showModal()

    const modalGreet = document.getElementById('modal-greet')

    const emailInput = document.getElementById('email-newsletter')
    const submitButton = document.getElementById('submit-newsletter')

    let email = ''

    submitButton.addEventListener('click', async () => {
        email = emailInput.value

        const emailRegex = new RegExp(
            '^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$'
        )

        if(email === '' || !email.match(emailRegex)){
            alert('Email is required and have to be a valid email')
            emailInput.style.borderBottom ='2px solid red'
            return
        }

        const objBody = {
            email: email
        }

        const response = await fetchFormData(objBody)
        console.log({response})

        if(response){
            emailInput.value = ''
            emailInput.style.borderBottom = '2px solid gray'
            modal.close()

            setTimeout(() => {
                modalGreet.showModal()
                setTimeout(() => {
                    modalGreet.close()
                },1000)
            },500)
        }
    })

    closeModal.addEventListener('click', () => {
        modal.close()
    })

    window.addEventListener('click', (event) => {
        if(event.target === modal){
            modal.close()
        }
    })

    window.addEventListener('keydown', (event) => {
        if(event.key === 'Escape'){
            modal.close()
        }
    })
}

async function fetchFormData (objBody) {
    let response = ''
    await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            objBody
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }).then((response) => response.json())
    .then((json) => response = json)
    .catch((error) => console.error(error))

    return response
}

function returnButton(){
    const returnButton = document.getElementById('return-button')
    returnButton.addEventListener('click', () => {
        window.scrollTo({
            top: 400,
            behavior: 'smooth'
        })
    })
}