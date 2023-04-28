/* scroll direction */
// Initial state
let prevTopPos = 0;
let postCardInViewPercentage = 0;
// adding scroll event
const scrollingWrapper = document.querySelector('.wrapper');
const postcard = document.querySelector(".postcard-container");
const joinUs = document.querySelector(".logo-path");

scrollingWrapper.addEventListener('scroll', function () {
    // detects new state and compares it with the new one
    const currentTopPos = scrollingWrapper.scrollTop;
    if (currentTopPos > prevTopPos) {
        document.getElementsByTagName('body')[0].classList.add("scrollDown");
        document.getElementsByTagName('body')[0].classList.remove("scrollUp");
    } else {
        document.getElementsByTagName('body')[0].classList.add("scrollUp");
        document.getElementsByTagName('body')[0].classList.remove("scrollDown");
    }
    // saves the new position for iteration.
    prevTopPos = currentTopPos;

    // postcard 
    postCardInViewPercentage = getViewPercentage(postcard);
    if (postCardInViewPercentage > 30) {
        joinUs.classList.add('writing');
    }
    postcard.style.translate = `${(postCardInViewPercentage - 100) * 1.5}% 0`
});

/* prev and next experience */
const experienceDetails = [
    {
        title: "<span>Santa's</span>Sleigh Ride",
        content: "What better way to begin a visit to the North Pole than jump on a sleigh and ride in style?<br /> <br />Reindeers Wilfred and Harvey will be harnessed, sprout - fuelled and ready to fly you direct to North Pole Airport; guided by an advanced magical navigation system and expertly flown by one of our elite Top Fun sleighpilots. After all, we’d hate for you to miss the runway and take a detour through the mystical thicket that surrounds the landing area…",
        background: "../img/1x/bg-sleigh-ride.jpg"
    },
    {
        title: "Memory Lane",
        content: "Come and take a trip down Memory Lane to see where Santa’s Elves live. Stroll through the quaint high street and don’t forget to pop in to the Bar Humbug Sweet Shop for a special Christmas treat, before heading off down the twinkling tunnel of lights.",
        background: "../img/1x/memory_lane.jpg"
    },
    {
        title: "<span>Santa's</span>Sleigh Ride",
        content: "What better way to begin a visit to the North Pole than jump on a sleigh and ride in style?<br /> <br />Reindeers Wilfred and Harvey will be harnessed, sprout - fuelled and ready to fly you direct to North Pole Airport; guided by an advanced magical navigation system and expertly flown by one of our elite Top Fun sleighpilots. After all, we’d hate for you to miss the runway and take a detour through the mystical thicket that surrounds the landing area…",
        background: "../img/1x/bg-sleigh-ride.jpg"
    },
    {
        title: "Memory Lane",
        content: "Come and take a trip down Memory Lane to see where Santa’s Elves live. Stroll through the quaint high street and don’t forget to pop in to the Bar Humbug Sweet Shop for a special Christmas treat, before heading off down the twinkling tunnel of lights.",
        background: "../img/1x/memory_lane.jpg"
    }

]


const experienceCarouselContainer = document.querySelector(".experience-image-carousel");
const experienceBackgroundPhoto = document.querySelector(".experience");
const experienceImageContainer = document.querySelector(".experience-image-container");
const experienceTitleContainer = document.querySelector(".experience-description h3");
const experienceContentContainer = document.querySelector(".experience-description p");
const backdrop = document.querySelector(".background-transition");
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");

const lotties = experienceCarouselContainer.querySelectorAll("lottie-player");
const experienceImageWidth = 33.3;

let currentInd = 0;

function playLottie() {
    lotties.forEach((lottie, ind) => {
        if (ind == currentInd) {
            lottie.classList.add("active-lottie");
            lottie.play();
        } else {
            lottie.classList.remove("active-lottie");
            lottie.pause();
        }
    });
}

function prev() {
    currentInd--;
    if (currentInd === 0) { prevButton.disabled = true; }
    if (currentInd !== experienceDetails.length - 1) { nextButton.disabled = false; }
    backdrop.classList.remove("backdrop-effect");
    void backdrop.offsetWidth;
    backdrop.classList.add("backdrop-effect");
    setTimeout(function () {
        experienceBackgroundPhoto.style.backgroundImage = `url(${experienceDetails[currentInd].background})`;
    }, 100);
    experienceTitleContainer.innerHTML = experienceDetails[currentInd].title;
    experienceContentContainer.innerHTML = experienceDetails[currentInd].content;
    experienceImageContainer.style.translate = `${-1 * experienceImageWidth * (currentInd - 1)}dvw 0`;
    playLottie();
}

function next() {
    currentInd++;
    if (currentInd !== 0) { prevButton.disabled = false; }
    if (currentInd == experienceDetails.length - 1) { nextButton.disabled = true; }
    backdrop.classList.remove("backdrop-effect");
    void backdrop.offsetWidth;
    backdrop.classList.add("backdrop-effect");
    setTimeout(function () {
        experienceBackgroundPhoto.style.backgroundImage = `url(${experienceDetails[currentInd].background})`;
    }, 100);
    experienceTitleContainer.innerHTML = experienceDetails[currentInd].title;
    experienceContentContainer.innerHTML = experienceDetails[currentInd].content;
    experienceImageContainer.style.translate = `${-1 * experienceImageWidth * (currentInd - 1)}dvw 0`;
    playLottie();
}

/* ticket image */
const ticketImage = document.querySelector(".ticket-image");
const ticketButton = document.querySelector(".ticket .button");

ticketButton.addEventListener("mouseover", () => { ticketImage.classList.add("ticket-image-hover") });
ticketButton.addEventListener("mouseout", () => { ticketImage.classList.remove("ticket-image-hover") });


/* stardust cursor trail */
function fairyDustCursor(options) {
    let possibleColors = (options && options.colors) || [
        "#d61c59",
        "#f4eb99",
        "#7ed7e5",
    ];
    let hasWrapperEl = options && options.element;
    let element = hasWrapperEl || document.body;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const cursor = { x: width / 2, y: width / 2 };
    const lastPos = { x: width / 2, y: width / 2 };
    const particles = [];
    const canvImages = [];
    let canvas, context, animationFrame;

    const char = "*";

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    // Re-initialise or destroy the cursor when the prefers-reduced-motion setting changes
    prefersReducedMotion.onchange = () => {
        if (prefersReducedMotion.matches) {
            destroy();
        } else {
            init();
        }
    };

    function init() {
        // Don't show the cursor trail if the user has prefers-reduced-motion enabled
        if (prefersReducedMotion.matches) {
            console.log(
                "This browser has prefers reduced motion turned on, so the cursor did not init"
            );
            return false;
        }

        canvas = document.createElement("canvas");
        context = canvas.getContext("2d");
        canvas.style.top = "0px";
        canvas.style.left = "0px";
        canvas.style.pointerEvents = "none";

        if (hasWrapperEl) {
            canvas.style.position = "absolute";
            element.appendChild(canvas);
            canvas.width = element.clientWidth;
            canvas.height = element.clientHeight;
        } else {
            canvas.style.position = "fixed";
            element.appendChild(canvas);
            canvas.width = width;
            canvas.height = height;
        }

        context.font = "14px serif";
        context.textBaseline = "middle";
        context.textAlign = "center";

        possibleColors.forEach((color) => {
            let measurements = context.measureText(char);
            let bgCanvas = document.createElement("canvas");
            let bgContext = bgCanvas.getContext("2d");

            bgCanvas.width = measurements.width;
            bgCanvas.height =
                measurements.actualBoundingBoxAscent +
                measurements.actualBoundingBoxDescent;

            bgContext.fillStyle = color;
            bgContext.textAlign = "center";
            bgContext.font = "14px serif";
            bgContext.textBaseline = "middle";
            bgContext.fillText(
                char,
                bgCanvas.width / 2,
                measurements.actualBoundingBoxAscent
            );

            canvImages.push(bgCanvas);
        });

        bindEvents();
        loop();
    }

    // Bind events that are needed
    function bindEvents() {
        element.addEventListener("mousemove", onMouseMove);
        element.addEventListener("touchmove", onTouchMove, { passive: true });
        element.addEventListener("touchstart", onTouchMove, { passive: true });
        window.addEventListener("resize", onWindowResize);
    }

    function onWindowResize(e) {
        width = window.innerWidth;
        height = window.innerHeight;

        if (hasWrapperEl) {
            canvas.width = element.clientWidth;
            canvas.height = element.clientHeight;
        } else {
            canvas.width = width;
            canvas.height = height;
        }
    }

    function onTouchMove(e) {
        if (e.touches.length > 0) {
            for (let i = 0; i < e.touches.length; i++) {
                addParticle(
                    e.touches[i].clientX,
                    e.touches[i].clientY,
                    canvImages[Math.floor(Math.random() * canvImages.length)]
                );
            }
        }
    }

    function onMouseMove(e) {
        window.requestAnimationFrame(() => {
            if (hasWrapperEl) {
                const boundingRect = element.getBoundingClientRect();
                cursor.x = e.clientX - boundingRect.left;
                cursor.y = e.clientY - boundingRect.top;
            } else {
                cursor.x = e.clientX;
                cursor.y = e.clientY;
            }

            const distBetweenPoints = Math.hypot(
                cursor.x - lastPos.x,
                cursor.y - lastPos.y
            );

            if (distBetweenPoints > 1.5) {
                addParticle(
                    cursor.x,
                    cursor.y,
                    canvImages[Math.floor(Math.random() * possibleColors.length)]
                );

                lastPos.x = cursor.x;
                lastPos.y = cursor.y;
            }
        });
    }

    function addParticle(x, y, color) {
        particles.push(new Particle(x, y, color));
    }

    function updateParticles() {
        if (particles.length == 0) {
            return;
        }

        context.clearRect(0, 0, width, height);

        // Update
        for (let i = 0; i < particles.length; i++) {
            particles[i].update(context);
        }

        // Remove dead particles
        for (let i = particles.length - 1; i >= 0; i--) {
            if (particles[i].lifeSpan < 0) {
                particles.splice(i, 1);
            }
        }

        if (particles.length == 0) {
            context.clearRect(0, 0, width, height);
        }
    }

    function loop() {
        updateParticles();
        animationFrame = requestAnimationFrame(loop);
    }

    function destroy() {
        canvas.remove();
        cancelAnimationFrame(animationFrame);
        element.removeEventListener("mousemove", onMouseMove);
        element.removeEventListener("touchmove", onTouchMove);
        element.removeEventListener("touchstart", onTouchMove);
        window.addEventListener("resize", onWindowResize);
    };

    function Particle(x, y, canvasItem) {
        const lifeSpan = Math.floor(Math.random() * 30 + 60);
        this.initialLifeSpan = lifeSpan; //
        this.lifeSpan = lifeSpan; //ms
        this.velocity = {
            x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
            y: Math.random() * 0.7 + 0.9,
        };
        this.position = { x: x, y: y };
        this.canv = canvasItem;

        this.update = function (context) {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            this.lifeSpan--;

            this.velocity.y += 0.02;

            const scale = Math.max(this.lifeSpan / this.initialLifeSpan, 0);

            context.drawImage(
                this.canv,
                this.position.x - (this.canv.width / 2) * scale,
                this.position.y - this.canv.height / 2,
                this.canv.width * scale,
                this.canv.height * scale
            );
        };
    }

    init();

    return {
        destroy: destroy
    }
}
new fairyDustCursor();

/* sparkles */
$(function () {

    // rainbow as a color generates random rainbow colros
    // count determines number of sparkles
    // overlap allows sparkles to migrate... watch out for other dom elements though.
    $("nav a, .logo a").sparkleh({
        color: "rainbow",
        count: 30,
        overlap: 10
    });
    $("h1, h2").sparkleh({
        color: "rainbow",
        count: 100,
        overlap: 10
    });

});

$.fn.sparkleh = function (options) {

    return this.each(function (k, v) {

        var $this = $(v).css("position", "relative");

        var settings = $.extend({
            width: $this.outerWidth(),
            height: $this.outerHeight(),
            color: "#FFFFFF",
            count: 30,
            overlap: 0,
            speed: 1
        }, options);

        var sparkle = new Sparkle($this, settings);

        $this.on({
            "mouseover focus": function (e) {
                sparkle.over();
            },
            "mouseout blur": function (e) {
                sparkle.out();
            }
        });

    });

}

function Sparkle($parent, options) {
    this.options = options;
    this.init($parent);
}

Sparkle.prototype = {

    "init": function ($parent) {

        var _this = this;

        this.$canvas =
            $("<canvas>")
                .addClass("sparkle-canvas")
                .css({
                    position: "absolute",
                    top: "-" + _this.options.overlap + "px",
                    left: "-" + _this.options.overlap + "px",
                    "pointer-events": "none"
                })
                .appendTo($parent);

        this.canvas = this.$canvas[0];
        this.context = this.canvas.getContext("2d");

        this.sprite = new Image();
        this.sprites = [0, 6, 13, 20];
        this.sprite.src = this.datauri;

        this.canvas.width = this.options.width + (this.options.overlap * 2);
        this.canvas.height = this.options.height + (this.options.overlap * 2);


        this.particles = this.createSparkles(this.canvas.width, this.canvas.height);

        this.anim = null;
        this.fade = false;

    },

    "createSparkles": function (w, h) {

        var holder = [];

        for (var i = 0; i < this.options.count; i++) {

            var color = this.options.color;

            if (this.options.color == "rainbow") {
                color = '#' + ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6);
            } else if ($.type(this.options.color) === "array") {
                color = this.options.color[Math.floor(Math.random() * this.options.color.length)];
            }

            holder[i] = {
                position: {
                    x: Math.floor(Math.random() * w),
                    y: Math.floor(Math.random() * h)
                },
                style: this.sprites[Math.floor(Math.random() * 4)],
                delta: {
                    x: Math.floor(Math.random() * 1000) - 500,
                    y: Math.floor(Math.random() * 1000) - 500
                },
                size: parseFloat((Math.random() * 2).toFixed(2)),
                color: color
            };

        }

        return holder;

    },

    "draw": function (time, fade) {

        var ctx = this.context;

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (var i = 0; i < this.options.count; i++) {

            var derpicle = this.particles[i];
            var modulus = Math.floor(Math.random() * 7);

            if (Math.floor(time) % modulus === 0) {
                derpicle.style = this.sprites[Math.floor(Math.random() * 4)];
            }

            ctx.save();
            ctx.globalAlpha = derpicle.opacity;
            ctx.drawImage(this.sprite, derpicle.style, 0, 7, 7, derpicle.position.x, derpicle.position.y, 7, 7);

            if (this.options.color) {

                ctx.globalCompositeOperation = "source-atop";
                ctx.globalAlpha = 0.5;
                ctx.fillStyle = derpicle.color;
                ctx.fillRect(derpicle.position.x, derpicle.position.y, 7, 7);

            }

            ctx.restore();

        }

    },

    "update": function () {

        var _this = this;

        this.anim = window.requestAnimationFrame(function (time) {

            for (var i = 0; i < _this.options.count; i++) {

                var u = _this.particles[i];

                var randX = (Math.random() > Math.random() * 2);
                var randY = (Math.random() > Math.random() * 3);

                if (randX) {
                    u.position.x += ((u.delta.x * _this.options.speed) / 1500);
                }

                if (!randY) {
                    u.position.y -= ((u.delta.y * _this.options.speed) / 800);
                }

                if (u.position.x > _this.canvas.width) {
                    u.position.x = -7;
                } else if (u.position.x < -7) {
                    u.position.x = _this.canvas.width;
                }

                if (u.position.y > _this.canvas.height) {
                    u.position.y = -7;
                    u.position.x = Math.floor(Math.random() * _this.canvas.width);
                } else if (u.position.y < -7) {
                    u.position.y = _this.canvas.height;
                    u.position.x = Math.floor(Math.random() * _this.canvas.width);
                }

                if (_this.fade) {
                    u.opacity -= 0.02;
                } else {
                    u.opacity -= 0.005;
                }

                if (u.opacity <= 0) {
                    u.opacity = (_this.fade) ? 0 : 1;
                }

            }

            _this.draw(time);

            if (_this.fade) {
                _this.fadeCount -= 1;
                if (_this.fadeCount < 0) {
                    window.cancelAnimationFrame(_this.anim);
                } else {
                    _this.update();
                }
            } else {
                _this.update();
            }

        });

    },

    "cancel": function () {

        this.fadeCount = 100;

    },

    "over": function () {

        window.cancelAnimationFrame(this.anim);

        for (var i = 0; i < this.options.count; i++) {
            this.particles[i].opacity = Math.random();
        }

        this.fade = false;
        this.update();

    },

    "out": function () {

        this.fade = true;
        this.cancel();

    },

    "datauri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAHCAYAAAD5wDa1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozNDNFMzM5REEyMkUxMUUzOEE3NEI3Q0U1QUIzMTc4NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozNDNFMzM5RUEyMkUxMUUzOEE3NEI3Q0U1QUIzMTc4NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjM0M0UzMzlCQTIyRTExRTM4QTc0QjdDRTVBQjMxNzg2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjM0M0UzMzlDQTIyRTExRTM4QTc0QjdDRTVBQjMxNzg2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+jzOsUQAAANhJREFUeNqsks0KhCAUhW/Sz6pFSc1AD9HL+OBFbdsVOKWLajH9EE7GFBEjOMxcUNHD8dxPBCEE/DKyLGMqraoqcd4j0ChpUmlBEGCFRBzH2dbj5JycJAn90CEpy1J2SK4apVSM4yiKonhePYwxMU2TaJrm8BpykpWmKQ3D8FbX9SOO4/tOhDEG0zRhGAZo2xaiKDLyPGeSyPM8sCxr868+WC/mvu9j13XBtm1ACME8z7AsC/R9r0fGOf+arOu6jUwS7l6tT/B+xo+aDFRo5BykHfav3/gSYAAtIdQ1IT0puAAAAABJRU5ErkJggg=="

};

// $('img.photo',this).imagesLoaded(myFunction)
// execute a callback when all images have loaded.
// needed because .load() doesn't work on cached images

// mit license. paul irish. 2010.
// webkit fix from Oren Solomianik. thx!

// callback function is passed the last image to load
//   as an argument, and the collection as `this`


$.fn.imagesLoaded = function (callback) {
    var elems = this.filter('img'),
        len = elems.length,
        blank = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

    elems.bind('load.imgloaded', function () {
        if (--len <= 0 && this.src !== blank) {
            elems.unbind('load.imgloaded');
            callback.call(elems, this);
        }
    }).each(function () {
        // cached images don't fire load sometimes, so we reset src.
        if (this.complete || this.complete === undefined) {
            var src = this.src;
            // webkit hack from https://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
            // data uri bypasses webkit log warning (thx doug jones)
            this.src = blank;
            this.src = src;
        }
    });

    return this;
};

/* interactive heading */
const mouse = newV2();
const center = newV2();
const distanceFromCenter = newV2();
const distanceLerped = newV2();
let simulateMouseMovement = false;

const perspective = 500;
const translateZ = -12;
const rotate = 1;
const skew = 1;

const container = document.querySelector(".title-container");
const copies = document.querySelectorAll(".copy");

/* parallax bg mouse move */
const halfWidth = window.innerWidth / 2;
const halfHeight = window.innerHeight / 2;

const farBackground = document.querySelector(".far-background");
const background = document.querySelector(".background");
const foreground = document.querySelector(".foreground");

function updateCenter() {
    const rect = container.getBoundingClientRect();
    center.x = rect.left + rect.width / 2;
    center.y = rect.top + rect.height / 2;
}

function trackMousePosition(event) {
    simulateMouseMovement = false;
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    distanceFromCenter.x = center.x - mouse.x;
    distanceFromCenter.y = center.y - mouse.y;
}

function fakeMousePosition(t) {
    distanceFromCenter.x = Math.sin(t / 500) * window.innerWidth * 0.5;
    distanceFromCenter.y = Math.cos(t / 500) * window.innerWidth * 0.2;
}

function updateTextPosition(t) {
    if (simulateMouseMovement) fakeMousePosition(t);

    lerpV2(distanceLerped, distanceFromCenter);

    for (var i = 1; i < copies.length + 1; i++) {
        const copy = copies[i - 1];
        copy.style.transform = makeTransformString(
            i * distanceLerped.y * 0.03,
            i * translateZ,
            i * rotate * (distanceLerped.x * 0.003),
            i * skew * (distanceLerped.x * 0.003)
        );
    }

    let movementXpercentage = distanceFromCenter.x / halfWidth;
    let movementYpercentage = distanceFromCenter.y / halfHeight;
    foreground.style.left = `${movementXpercentage * 80}px`;
    foreground.style.top = `${movementYpercentage * 40}px`;
    background.style.left = `${movementXpercentage * 30}px`;
    background.style.top = `${movementYpercentage * 15}px`;

    requestAnimationFrame(updateTextPosition);
}

function makeTransformString(y, z, rotate, skew) {
    return `perspective(${perspective}px) translate3d(0px, ${y}px, ${z}px) rotate(${rotate}deg) skew(${skew}deg)`;
}

function lerpV2(position, targetPosition) {
    position.x += (targetPosition.x - position.x) * 0.2;
    position.y += (targetPosition.y - position.y) * 0.2;
}

function newV2(x = 0, y = 0) {
    return {
        x: x,
        y: y
    };
}

updateCenter();
document.addEventListener("mousemove", trackMousePosition);
window.addEventListener("resize", updateCenter);
requestAnimationFrame(updateTextPosition);


/* percentage in view */
function getViewPercentage(element) {
    const viewport = {
        center: window.pageYOffset + window.innerHeight / 2
    };

    const elementBoundingRect = element.getBoundingClientRect();

    const initialElementPos = elementBoundingRect.height / 2 + window.pageYOffset - 200;

    const elementPos = {
        center: elementBoundingRect.y + elementBoundingRect.height / 2 + window.pageYOffset
    };

    let percentageInView = 100 - (viewport.center - elementPos.center) / viewport.center * 100;

    if (percentageInView > 80 && percentageInView < 120) { percentageInView = 100; }

    return Math.round(percentageInView);
}

