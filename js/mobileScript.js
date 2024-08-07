const projectItems = document.querySelectorAll(".project__item");
const aboutSec = document.querySelector(".main-about"), aboutSecTop = aboutSec.getBoundingClientRect().top;

import {headerNav, navBtn, secTitle} from '../js/script.js'

const mediaMatchSizeMobile = window.matchMedia("(max-width: 1024px)");
const changeMediaMobile = function(e) {
    window.addEventListener('scroll', function(){

        // section 제목 나타나기
        for ( let i=0; i < secTitle.length; i++ ){
            const secTitleTop = secTitle[i].getBoundingClientRect().top ;
            if ( scrollY > secTitleTop ) secTitle[i].classList.add("on");
        }
        // about 클래스 추가
        if (scrollY > aboutSecTop - 100) aboutSec.classList.add("on")
        // project-list 나타나기
        for ( let i=0; i < projectItems.length; i++ ){
            const projectItemTop = projectItems[i].getBoundingClientRect().top ;        
            if ( i == 0 || i == 1 || i == 2) {    
                if (scrollY  > projectItemTop + window.innerHeight) {
                    projectItems[i].classList.add("on");
                }
            } else {
                projectItems[i].classList.add("on");
            };

        };
    });
    headerNav.classList.remove("active");
};
mediaMatchSizeMobile.addListener(changeMediaMobile);
changeMediaMobile(mediaMatchSizeMobile);

export {mediaMatchSizeMobile, changeMediaMobile}
