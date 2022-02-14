//declaring global variables
const sections = document.querySelectorAll("section");
const navbarContent= document.createElement('ul');
let pageHeader = document.querySelector('.page_header');
let activeSection=document.querySelector('#section1')
let scrollTimer=null


// detecting active class
let activeSectinObserver = new IntersectionObserver((entries) =>{
    for (let entry of entries){
        const entryClasses = entry.target.classList;
        const entryNavlinkClasses = navbarContent.querySelector(`#${entry.target.id}-link`).classList;
        if (entry.isIntersecting){
            entryClasses.add('active-section');
            entryNavlinkClasses.add('active-nav-link');
        }
        else{
            entryClasses.remove('active-section');
            entryNavlinkClasses.remove('active-nav-link');
        }
    }
},{threshold:.8});

//Loading the navbar content 
for (let section of sections){

    let listItem=document.createElement('li');
    let listLink=document.createElement('a');
    listLink.textContent=section.getAttribute('data-nav');
    listLink.setAttribute('href',`#${section.id}`);
    listLink.id=`${section.id}-link`
    listItem.appendChild(listLink);
    navbarContent.appendChild(listItem);
    navbarContent.classList.add('collapsed_navbar');

    //aplying the observer to each section
    activeSectinObserver.observe(section);



}

document.querySelector(".navbar_menue").appendChild(navbarContent);


//implementing Scroll to section behavior
navbarContent.addEventListener('click', (event)=>{
    event.preventDefault();
    let section = document.querySelector(event.target.getAttribute('href'))
    section.scrollIntoView({behavior:'smooth',block:'start'});

    //hiding the navbar on small screen after choosing section
    navbarContent.classList.add('collapsed_navbar');

})


//making the header invisible unless the user is scrolling on screens larger than 768px
document.addEventListener('scroll',() => {
    var mediaSize = window.matchMedia("(min-width: 768px)")
    if (mediaSize.matches){
        pageHeader.style.visibility='visible';
        if (scrollTimer!=null){
            clearTimeout(scrollTimer);
        }
        scrollTimer=setTimeout(()=>{
            let srollPos = document.querySelector('html').scrollTop ;
            
            //keeping the header visible if the user at the top of the page
            if (srollPos> 0){ 
                pageHeader.style.visibility='hidden';
            }
        },1000);
    }
    else{
        pageHeader.style.visibility='visible';
    }
});

//scroll to tob button
//button functionality
document.querySelector('#btn_scroll_top').addEventListener('click',()=>{
    window.scrollTo({
        top: 0,
        screenLeft:0 ,
        behavior: 'smooth'
    });
})

//scroll to tob button
//making the button invisible when the page is at the top
document.addEventListener('scroll',()=>{
    const scrollPos = document.querySelector('html').scrollTop ;
    const scrollTobBtn = document.querySelector('#btn_scroll_top')
    if (scrollPos>0){
        scrollTobBtn.style.visibility="visible";
    }
    else{
        scrollTobBtn.style.visibility="hidden";
    }
})

//show&hide the navbar on small screen after clicking hamburger icon
document.querySelector('.hamburger').addEventListener('click',()=>{
    navbarContent.classList.toggle('collapsed_navbar');
})

