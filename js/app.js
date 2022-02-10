
const sections = document.querySelectorAll("section");
const navbarContent= document.createElement('ul');

// detecting active class
let activeSectinObserver = new IntersectionObserver((entries) =>{
    for (let entry of entries){
        let entryClasses = entry.target.classList;
        if (entry.isIntersecting){
            entryClasses.add('active');
        }
        else{
            entryClasses.remove('active');
        }
    }
},{threshold:.6});


//Loading the navbar content 
for (let section of sections){

    let listItem=document.createElement('li');
    let listLink=document.createElement('a');
    listLink.textContent=section.getAttribute('data-nav');
    listLink.setAttribute('href',`#${section.getAttribute('id')}`);
    listItem.appendChild(listLink);
    navbarContent.appendChild(listItem);

    //aplying the observer to each section
    activeSectinObserver.observe(section);

}

document.querySelector(".navbar_menue").appendChild(navbarContent);


//implementing Scroll to section behavior
navbarContent.addEventListener('click', (event)=>{
    event.preventDefault();
    let section = document.querySelector(event.target.getAttribute('href'))
    section.scrollIntoView({behavior:'smooth',block:'start'});
})


//making the header invisible unless the user is scrolling
let scrollTimer=null
document.addEventListener('scroll',() => {
    const header = document.querySelector('.page_header');
    header.style.visibility='visible';
    if (scrollTimer!=null){
        clearTimeout(scrollTimer);
    }
    scrollTimer=setTimeout(()=>{
        let srollPos = document.querySelector('html').scrollTop ;
        //keeping the header visible if the user at the top of the page
        if (srollPos> 0){ 
            header.style.visibility='hidden';
        }
    },1000);
})

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