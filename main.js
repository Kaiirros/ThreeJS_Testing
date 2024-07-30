



window.addEventListener('load', function(e){
    
})

const body = document.body;
const html = document.documentElement;
const height = Math.max(body.scrollHeight, body.offsetHeight,
html.clientHeight, html.scrollHeight, html.offsetHeight);

let viewDetailsButtons = document.getElementsByClassName('viewDetails')

function accordion(){
    Array.from(viewDetailsButtons).forEach(element => {
        let accordion = element.parentElement.parentElement
        element.addEventListener('click', function(e){
            if (accordion.classList.contains('accordionOpen')){
                accordion.classList.remove('accordionOpen')
            } else {
                accordion.classList.add('accordionOpen')
            }
            
        })
    });
}

accordion()

function navbarVisibility(scroll){
    if (scroll > 1){
        this.document.getElementById('navbar').classList.add('navbarHidden')
    } else {
        this.document.getElementById('navbar').classList.remove('navbarHidden')

    }
}

