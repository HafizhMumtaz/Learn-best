
// SLIDE-LEFT
const Slideleft = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element ENTERS view → slide in
                entry.target.classList.add("show");
            } else {
                // Element LEAVES view → slide out
                entry.target.classList.remove("show");
            }
        });
    }, {
        threshold: 0.1   // triggers when 10% of the element is visible
    })

    const SLideleftele = document.querySelectorAll('.Slide');
    SLideleftele.forEach(el => Slideleft.observe(el));

// Slide-RIGHT
    const SlideRight = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element ENTERS view → slide in
                entry.target.classList.add("show");
            } else {
                // Element LEAVES view → slide out
                entry.target.classList.remove("show");
            }
        });
    }, {
        threshold: 0.1   // triggers when 10% of the element is visible
    });

    const SlideRightele = document.querySelectorAll('.SlideR');
    SlideRightele.forEach(el => SlideRight.observe(el));