const main = () => {
    try{
        toggleMenu()
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