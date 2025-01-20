const main = () => {
    try{
        toggleMenu()
        positionMenu()
        handleContactForm()
    }catch(error){
        console.error(error)
    }
}

main()

function toggleMenu() {
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

function positionMenu() {
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

function handleContactForm(){
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

    contactInputButton.addEventListener('click', () => {
        name = nameInput.value
        email = emailInput.value
        check = checkBoxPrivacity.value

        nameInput.style.borderBottom = '2px solid gray'
        emailInput.style.borderBottom = '2px solid gray'
        checkBoxPrivacity.style.border = '2px solid gray'

        if(name.length > 2 && name. length < 100 
            && emailRegex.test(email)
            && check){
                alert('Form sent successfully')
                nameInput.value = ''
                emailInput.value = ''
                nameInput.style.borderBottom = '2px solid gray'
                emailInput.style.borderBottom = '2px solid gray'
                checkBoxPrivacity.style.border= '2px solid gray'

                fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        check: check
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    }
                }).then((response) => response.json())
                .then((json) => console.log(json))

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