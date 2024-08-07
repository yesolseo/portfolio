const headerNav = document.querySelector(".header__nav"), gnbItems = document.querySelectorAll(".header__nav-item");
const navBtn = document.querySelector(".menu-btn");
const secTitle = document.querySelectorAll(".section__title");
export {headerNav, navBtn, secTitle};

// PC, 모바일 불러오기
if (window.innerWidth >= 1024) {
    import('../js/pcScript.js').then(module => {
        const mediaMatchSize = module.mediaMatchSize; 
        module.changeMedia(mediaMatchSize);
    });
} else {
    import('../js/mobileScript.js').then(module => {
        const mediaMatchSizeMobile = module.mediaMatchSizeMobile;
        module.changeMediaMobile(mediaMatchSizeMobile);
    });
}

//새로고침하면 최상단으로
history.scrollRestoration = "manual";
// 헤더 애니메이션
const mainSections = document.querySelectorAll("section");
gnbItems.forEach((gnbItem,index)=>{
    // 헤더 메뉴 클릭시 스크롤 이동
    gnbItem.addEventListener("click", (e)=> {
        e.preventDefault();
        mainSections[index].scrollIntoView({ behavior: "smooth" });
        // 모바일 헤더 메뉴 클릭시 헤더 숨기기
        if ( window.innerWidth < 1024 ) {
            navBtn.classList.remove("active");
            headerNav.classList.remove("active");
            document.querySelector("body").classList.remove("overflowHidden");
        };
    });
});
// 헤더 방향감지하면 나타나기
window.addEventListener("wheel",(e) => {
    const wheelDirection = e.wheelDeltaY;
    if ( navBtn.classList.contains("active") == false ) {
        if ( wheelDirection > 0 ) {
            document.querySelector(".header").style.transform = "translateY(0)";
        } else {
            document.querySelector(".header").style.transform = "translateY(-100%)";
        };
    };
});
//헤더 메뉴 클릭하면 헤더 나타나기
navBtn.addEventListener("click", (e)=> {
    if ( navBtn.classList.contains("active") ) {
        navBtn.classList.remove("active");
        document.querySelector("body").classList.remove("overflowHidden");
        headerNav.classList.remove("active");
    } else {
        navBtn.classList.add("active");
        document.querySelector("body").classList.add("overflowHidden");
        headerNav.classList.add("active");
    };
});

// home__title 높이값 
function homeTitleHeightChange (){
    const heightChange = document.querySelector('.home__title--shape').clientHeight ;
    document.querySelector('.home__title').style.height = heightChange + 'px';
}
homeTitleHeightChange ();
window.onresize = function(e){
    homeTitleHeightChange ();
};

// GSAP 애니메이션
// main-project 스크롤 애니메이션
const projectSection = document.querySelector(".project__list");
gsap.to('.project__list',{
    x: () => -(projectSection.scrollWidth + 20) ,
    xPercent: 100,
    scrollTrigger: {
        trigger: ".project__list",
        start: "center center",
        end: "+=4000",
        pin: ".main-project",
        scrub: true,
        invalidateOnRefresh: true,
    }
});

// main-skill 스크롤 애니메이션
const skillAni = gsap.timeline();
gsap.set(".skill__list-item",{autoAlpha : 0})
skillAni.from(".skill__list-item",{
    x: 0,
    autoAlpha : 1
});

// 스크롤하면 합쳐지는 원
ScrollTrigger.create({
    animation: skillAni,
    trigger : ".main-skill",
    start: "top top",
    end: "+=3000",
    scrub: true,
    pin: true,
    anticipatePin: 1
});
// 스크롤하면 이름이 나타남
const nameAni = gsap.timeline();
nameAni.from(".skill__bottom",{
    duration: 6,
    autoAlpha: 0,
});
ScrollTrigger.create({
    animation: nameAni,
    trigger: ".main-skill",
    start: "top 0%",
    end: "+=3000",
    scrub: 1,
});
// main-end 애니메이션
ScrollTrigger.create({
    trigger: ".main-end",
    start: "top 15%",
    end: "+=1000",
    scrub: true,
    onEnter: () => {
        if( !document.querySelector(".end__content").classList.contains("active") ) {
            document.querySelector('.end__content').className += " active"
        };
    },

});