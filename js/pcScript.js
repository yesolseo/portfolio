// PC만
const cursorPointer = document.querySelector(".cursor-pointer"), cursorTxt = document.querySelector('.cursor-txt');
const anchorPoints = document.querySelectorAll('a');
const homeSubtit = document.querySelector(".home__subtitle"), homeSmile = document.querySelector(".home__subtitle--smile");
const projectItems = document.querySelectorAll(".project__item");
const aboutSec = document.querySelector(".main-about"), aboutSecTop = aboutSec.getBoundingClientRect().top;

import {headerNav, navBtn, secTitle} from '../js/script.js'

const mediaMatchSize = window.matchMedia("(min-width: 1024px)");
const changeMedia = function(e) {
    // 모바일에서 -> PC 헤더 변경
    document.querySelector("body").classList.remove("overflowHidden");
    navBtn.classList.remove("active");
    headerNav.classList.remove("active");

    // 마우스 애니메이션
    if ( e.matches ) {
        document.addEventListener("mousemove",(e) => {
            const cursorX = e.clientX - 10 ;
            const cursorY = e.clientY - 10 ;
            const centerPageX = (window.innerWidth/2 - cursorX);
            const centerPageY = (window.innerWidth/2 - cursorY);
            
            cursorPointer.style.left = cursorX + "px";
            cursorPointer.style.top = cursorY + "px";
                
            homeSubtit.style.transform = "translate(-23%,-13%) rotate(" + (-15 + centerPageX/500)  + "deg)";
            homeSmile.style.transform = "translate(" + centerPageX/80 + "px," + centerPageY/80 + "px)";
        });

        // 마우스오버 시 scale 변경
        anchorPoints.forEach(anchorPoint => {
            anchorPoint.addEventListener('mouseenter', (event) => {
                cursorPointer.style.cssText = "transform: scale(3.5)";
                cursorTxt.style.visibility = "visible";
            }); 
            anchorPoint.addEventListener('mouseleave', (event) => {
                cursorPointer.style.cssText = "transform: scale(1)";
                cursorTxt.style.visibility = "hidden";
            });
        });

        window.addEventListener('scroll', function(){
            const scrollY = window.scrollY

            // section 제목 나타나기
            for (let i=0; i < secTitle.length; i++){
                const secTitleTop = secTitle[i].getBoundingClientRect().top ;
                if ( scrollY > secTitleTop + window.innerHeight) secTitle[i].classList.add("on");
            };
            // about 클래스 추가
            if (scrollY > aboutSecTop - 100) aboutSec.classList.add("on")
            // project-list 나타나기
            for (let i=0; i < projectItems.length; i++ ){
                const projectItemTop = projectItems[i].getBoundingClientRect().top ;
                const projectItemLeft = projectItems[i].getBoundingClientRect().left ;
            
                if (i == 0 || i == 1 || i == 2 || i == 3) {    
                    if (scrollY > projectItemTop + window.innerHeight) projectItems[i].classList.add("on");
                } else if (i == 4 || i == 5){
                    if (scrollY  > projectItemLeft + i * 50) projectItems[i].classList.add("on");
                } else {
                    if (scrollY  > projectItemLeft + i * 100) projectItems[i].classList.add("on");
                };
            };
        });
    };
};
mediaMatchSize.addListener(changeMedia);
changeMedia(mediaMatchSize);

export {mediaMatchSize, changeMedia}
