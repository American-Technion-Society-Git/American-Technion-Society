
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(ScrollTrigger,SplitText);
window.scrollTo(0,0)


gsap.utils.toArray(".textreveal").forEach(element => {
  var childSplit = new SplitText(element, {
      type: "lines",
      linesClass: "split-child"
    });
    var parentSplit = new SplitText(element, {
      type: "lines",
      linesClass: "split-parent"
    });
  gsap.from(childSplit.lines, {
    duration: 1.5,
    yPercent: 100,
    ease: "power4",
    stagger: 0.1,
    scrollTrigger: {
      trigger: element,
      start: "center 90%",
      toggleActions: "play reverse play reverse"
    }
  });
});
