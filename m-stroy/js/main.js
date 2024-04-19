let fixedBlocks = document.querySelectorAll(".fixed-block")
const iconMenu = document.querySelector(".icon-menu")
const mobMenu = document.querySelector(".mob-menu")
const modalShowBtn = document.querySelectorAll(".modal-show-btn")
const modal = document.querySelectorAll(".modal")
const successModal = document.querySelector(".success-modal")
const errorModal = document.querySelector(".error-modal")
let animSpd = 400
window.addEventListener("load", () => {
    document.body.classList.add("loaded")
    document.body.classList.remove("no-scroll")
    setTimeout(() => {
        //intro fadeUp
        const intro = document.querySelector(".intro")
        if (intro) {
           intro.classList.add("animated")
        }
    }, 500);
});
//enable scroll
function enableScroll() {
    if (fixedBlocks) {
        fixedBlocks.forEach(block => block.style.paddingRight = '0px')
    }
    document.body.style.paddingRight = '0px'
    document.body.classList.remove("no-scroll")
}
//disable scroll
function disableScroll() {
    let paddingValue = window.innerWidth > 350 ? window.innerWidth - document.documentElement.clientWidth + 'px' : 0
    if (fixedBlocks) {
        fixedBlocks.forEach(block => block.style.paddingRight = paddingValue)
    }
    document.body.style.paddingRight = paddingValue
    document.body.classList.add("no-scroll");
}
// formSuccess
function formSuccess(form) {
    form.querySelectorAll(".item-form").forEach(item => () => {
        item.classList.remove("error")
        if (item.querySelector(".item-form__placeholder")) {
            item.querySelector(".item-form__placeholder").style.display = "block"
        }
        if (item.querySelector(".item-form__error")) {
            item.querySelector(".item-form__error").textContent = ""
        }
    })
    form.querySelectorAll("input").forEach(inp => {
        if (!["hidden", "checkbox", "radio"].includes(inp.type)) {
            inp.value = ""
        }
        if (["checkbox", "radio"].includes(inp.type) && !inp.classList.contains("required")) {
            inp.checked = false
        }
    })
    if (form.querySelector("textarea")) {
        form.querySelector("textarea").value = ""
    }
    let modal = document.querySelector(".modal.open")
    if (modal) {
        modal.classList.remove("open")
        successModal.classList.add("open")
    } else {
        openModal(successModal)
    }
}
//open modal
function openModal(modal) {
    if (!iconMenu.classList.contains("open")) {
        disableScroll()
    }
    modal.classList.add("open")
}
//close modal
function closeModal(modal) {
    modal.classList.remove("open")
    setTimeout(() => {
        if (!iconMenu.classList.contains("open")) {
            enableScroll()
        }
    }, animSpd);
}
// modal click outside
modal.forEach(mod => {
    mod.addEventListener("click", e => {
        if (!mod.querySelector(".modal__content").contains(e.target) || mod.querySelector(".modal__close").contains(e.target)) {
            closeModal(mod)
        }
    })
})
// modal button on click
modalShowBtn.forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault()
        let href = btn.getAttribute("data-modal")
        openModal(document.getElementById(href))
    })
})
//mob-menu show/unshow
iconMenu.addEventListener("click", () => {
    if (iconMenu.classList.contains("open")) {
        enableScroll()
    } else {
        disableScroll()
    }
    iconMenu.classList.toggle("open")
    mobMenu.classList.toggle("show")
})
//mask input
const inp = document.querySelectorAll('input[type=tel]')
if (inp) {
    inp.forEach(item => {
        Inputmask({ "mask": "8 999 999-99-99", "showMaskOnHover": false }).mask(item);
    })
}
// show/unshow custom input placeholder
if (document.querySelector(".item-form")) {
    document.querySelectorAll(".item-form").forEach(item => {
        let inp = item.querySelector("input")
        if (inp && item.querySelector(".item-form__placeholder")) {
            if (inp.type !== "tel") {
                inp.addEventListener("input", () => {
                    if (inp.value.length === 0) {
                        item.querySelector(".item-form__placeholder").style.display = "block"
                    } else {
                        item.querySelector(".item-form__placeholder").style.display = "none"
                    }
                })
            } else {
                inp.addEventListener("focus", () => {
                    console.log(inp.value)
                    item.querySelector(".item-form__placeholder").style.display = "none"
                })
                inp.addEventListener("blur", () => {
                    if (inp.value.length === 0) {
                        item.querySelector(".item-form__placeholder").style.display = "block"
                    }
                })
            }
        }
    })
}

//clients swiper
const clients = document.querySelector(".clients")
const clientsSwiper = document.querySelector(".clients .swiper")
if (clientsSwiper) {
    const swiper = new Swiper(clientsSwiper, {
        slidesPerView: 1.27,
        spaceBetween: 20,
        observe: true,
        observeParents: true,
        navigation: {
            prevEl: clients.querySelector(".nav-btn--prev"),
            nextEl: clients.querySelector(".nav-btn--next")
        },
        speed: 800,
        breakpoints: {
            1650.98: {
                slidesPerView: 4,
                spaceBetween: 30
            },
            1199.98: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            991.98: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            767.98: {
                slidesPerView: 2.45,
                spaceBetween: 20,
            },
            575.98: {
                slidesPerView: 2.2,
                spaceBetween: 20,
            },
            479.98: {
                slidesPerView: 2,
                spaceBetween: 20,
            }
        }
    })
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: clientsSwiper,
            start: "bottom bottom",
            invalidateOnRefresh: true,
          }
    })
    tl.fromTo(clientsSwiper, 
    {
        opacity: 0,
        xPercent: 25,
    },
    {
        opacity: 1,
        xPercent: 0,
        duration: 2,
    });
}
//anchor
if (document.querySelector(".js-anchor")) {
    document.querySelectorAll(".js-anchor").forEach(item => {
      item.addEventListener("click", e => {
        e.preventDefault()
        let windowTop = window.pageYOffset || document.documentElement.scrollTop
        let dest = document.querySelector(item.getAttribute("href"))
        if (iconMenu.classList.contains("open")) {
            iconMenu.click()
            setTimeout(() => {
                window.scrollTo({ top: windowTop + dest.getBoundingClientRect().top - 20, behavior: 'smooth' })
            }, 600);
        } else {
            window.scrollTo({ top: windowTop + dest.getBoundingClientRect().top - 20, behavior: 'smooth' })
        }      
      })
    })
}
//custom cursor
let myCursor = document.querySelectorAll(".my-cursor")
let cursorImg = document.querySelector(".cursor-img")
function mousePos(e) {
  cursorImg.style.left = e.clientX + "px"
  cursorImg.style.top = e.clientY + "px"
}
if (myCursor) {
  myCursor.forEach(item => {
    item.addEventListener("mouseenter", e => {
      mousePos(e)
      cursorImg.style.opacity = 1
      item.addEventListener("mousemove", e => mousePos(e))
      item.addEventListener("pointermove", e => {
        if (window.innerWidth > 1199) {
          mousePos(e)
        }
      })
      item.addEventListener("mouseleave", () => {
        cursorImg.style.opacity = 0
      })
    })
  })
}
// custom scroll FF
const customScroll = document.querySelectorAll(".custom-scroll")
let isFirefox = typeof InstallTrigger !== 'undefined';
if (isFirefox) {
  document.documentElement.style.scrollbarColor = "#FFBC02 #FCFCFC"
}
if (isFirefox && customScroll) {
  customScroll.forEach(item => { item.style.scrollbarColor = "#FFBC02 #FCFCFC" })
}
//materials fadeUp
const itemMat = document.querySelectorAll(".item-mat")
if (itemMat) {
    itemMat.forEach((item,idx) => {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: "top bottom",
                invalidateOnRefresh: true,
              }
        })
        tl.fromTo(item, 
        {
            opacity: 0,
            y: 100,
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: idx * 0.1
        },
        );
        tl.fromTo(item.querySelector(".item-mat__content"), 
        {
            y: 30,
            opacity: 0,
        }, 
        {
            y: 0,
            opacity: 1
        });
    })
}
//services fadeUp
const itemService = document.querySelectorAll(".item-service")
if (itemService) {
    itemService.forEach((item,idx) => {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: "top bottom",
                invalidateOnRefresh: true,
              }
        })
        tl.fromTo(item, 
        {
            opacity: 0,
            y: 100,
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: idx * 0.1
        },
        );
        tl.fromTo(item.querySelector(".item-service__content"), 
        {
            y: 30,
            opacity: 0,
        }, 
        {
            y: 0,
            opacity: 1,
            duration: .8
        });
    })
}
//about fadeUp
const itemAbout = document.querySelectorAll(".item-about")
if (itemAbout) {
    itemAbout.forEach((item,idx) => {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: "top bottom",
                invalidateOnRefresh: true,
              }
        })
        tl.fromTo(item, 
        {
            opacity: 0,
            y: 100,
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: idx * 0.1
        });
    })
}
//other fadeUp
const fadeUpItm = document.querySelectorAll(".fadeUp-item")
if (fadeUpItm) {
    fadeUpItm.forEach((item,idx) => {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: "50px bottom",
                invalidateOnRefresh: true,
              }
        })
        tl.fromTo(item, 
        {
            opacity: 0,
            y: 100,
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
        });
    })
}