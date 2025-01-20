const main = () => {
    try{
        toggleMenu()
        positionMenu()
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

    if(window.innerWidth >= 1200){
        for(let i = 0; i < lists.length; i++){
            lists[i].addEventListener('click', () => {
                for(let j = 0; j < lists.length; j++){
                    lists[j].style.border = 'none'
                }
                lists[i].style.borderBottom = '2px solid #08A6E4'
            })
        }

    }
}