function getcurrentTime() {
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    hh = (hh < 10) ? "0" + hh : hh;
    mm = (mm < 10) ? "0" + mm : mm;
    ss = (ss < 10) ? "0" + ss : ss;

    let time = hh + ":" + mm;

    document.getElementById("myLocalTime").innerText = time;
    let t = setTimeout(function () { getcurrentTime() }, 1000);
}

function revealToSpan() {
    document.querySelectorAll(".reveal").forEach(function (elem) {
        let spanParent = document.createElement("span");
        let spanChild = document.createElement("span");

        spanParent.classList.add("parent")
        spanChild.classList.add("child")

        spanChild.innerHTML = elem.innerHTML;
        spanParent.appendChild(spanChild);

        elem.innerHTML = "";
        elem.appendChild(spanParent)
    });
}

function valueSetters() {
    gsap.set("#nav a ", { y: "-100%", opacity: 0 })
    gsap.set("#home .parent .child", { y: "100%" })
    gsap.set("#home .row img", { opacity: 0 })

    document.querySelectorAll("#Visual>g").forEach(function (e) {
        var character = e.childNodes[1].childNodes[1];

        character.style.strokeDasharray = character.getTotalLength() + 'px';
        character.style.strokeDashoffset = character.getTotalLength() + 'px';

    })
}

function loaderAnimation() {
    var tl = gsap.timeline();

    tl.from("#loader .child span", {
        x: 100,
        // delay : 1,
        stagger: 0.2,
        duration: 1,
        ease: Power3.easeInOut
    })

    tl.to("#loader .parent .child", {
        y: "-100%",
        duration: 1,
        delay: 0,
        ease: Expo.easeInOut
    })
    tl.to("#loader", {
        height: 0,
        delay: 0.1,
        duration: 1,
    })

    tl.to('#green', {
        height: "100%",
        duration: 0.5,
        delay: -1

    })

    tl.to('#home', {
        top: 0,
        height: "200vh",
        duration: 1,
        delay: -0.5,
        onComplete: function () {
            animateHomePage();
        }
    })
}

function animateHomePage() {
    let tl = gsap.timeline();

    tl.to("#nav a ", {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.2,
        ease: Expo.easeInOut
    })
    tl.to("#home .parent .child", {
        y: 0,
        stagger: 0.1,
        duration: 1,
        ease: Expo.easeInOut
    })
    tl.to("#home .row img", {
        opacity: 1,
        delay: -.5,
        ease: Expo.easeInOut,
        onComplete: function () {
            animateSvg();
        }
    })
}

function animateSvg() {

    gsap.to("#Visual>g>g>path , #Visual>g>g>polyline", {
        strokeDashoffset: 0,
        duration: 1,
        ease: Expo.easeInOut
    })

}


getcurrentTime();
revealToSpan();
valueSetters();
loaderAnimation();
