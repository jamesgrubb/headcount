

function app(){
  const conversation = [
    {
      text:'Say you organize an event 🏃🏽‍♂️',
      grid:'tl'
    },
    {
      text:'word gets out and a few people turn up',
      grid:'br'
    },
    {
      text:'you get asked how many people turned up?',
      grid:'tr'
    },
    {
      text:'load a picture up into head count to get a quick head count',
      grid:'bl'
    }  
  ];  
  var object= {
    value: 0
  }
  return{
    init($refs){
      var obj = {
        value: 1
      }
      console.log(conversation[0].text)
      var group = this.$refs.group
      group.addEventListener('load', (event)=>{
        console.log('SVG Laoded' + event)
      })
      var people = Array.prototype.slice.call(group.querySelectorAll("g"));
      this.count = people.length
      console.log(this.count)
      console.log("🚀 ~ file: script.js ~ line 9 ~ init ~ group", group)
      var phone = SVG('#phone').attr({
        preserveAspectRatio : 'xMidYMid',
        width: '100%',
        height: '100%',
        xyz: 'fade in up duration-20'
      }).addClass('xyz-in transform translate-y-12 sm:-translate-y-0')
      var box = phone.bbox()
    
      var size = {
        w: box.width,
        h: box.height,
        x: box.cx,
        y: box.cy,
        get arc() {
          return {r: this.w * 0.7}
        },
        get head(){
          return { r: this.w * 0.5}
        }
      }
      console.log("🚀 ~ file: script.js ~ line 25 ~ size", size)
      
      
      // ARC
      var arcOuter = phone.path(`M0,${size.arc.r} A ${size.arc.r / 2} ${size.arc.r / 2} 0 0 1 ${size.arc.r} ${size.arc.r}`)
      arcOuter.stroke({ color: 'currentColor', linecap: 'round', width: 16 })
      var arcInner = arcOuter.clone()
      var arcInnerLength = arcInner.length()
      arcInner.addClass('text-brand-500')
      arcOuter.addClass('text-red-200')
      arcInner.stroke({ color: 'currentColor', linecap: 'round', width: 6, dasharray: [arcInnerLength,arcInnerLength], dashoffset: 0 })
      var arcGroup = phone.group()
      arcGroup.add(arcOuter).add(arcInner)
      
      
      
      // HEAD GROUP
      var headGroup = phone.group()
      // HEAD MASK
      var headMaskRect = phone.rect().size(size.head.r,size.head.r).fill('white')
      var headCount = phone.plain('')
      console.log("🚀 ~ file: script.js ~ line 59 ~ init ~ headCount", headCount)
      headCount.font({
        size: 0.74,
        family: '"Ultra"',
        anchor: 'middle',
        fill: 'black',
        'x-ref': 'counterText'
      })
      
      headCount.cx(0.5).cy(0.75)
      var headMaskGroup = phone.group()
      headMaskGroup.add(headMaskRect).add(headCount)
      
      var headMask = phone.mask()
      headMask.attr({
        maskContentUnits: 'objectBoundingBox'
      })
      
      headMask.add(headMaskGroup)
      
      var head = phone.circle(size.head.r).fill('currentColor').addClass('text-red-200')
      head.maskWith(headMask)
      headGroup.add(head)
      headGroup.attr({
        id: 'headGroup'
      })
      
      // ARC
      arcGroup.attr({
        id: 'arcGroup'
      })
      headGroup.cx(size.x).cy(size.y - (size.arc.r * 0.75))
      arcGroup.cx(size.x).cy(size.y)
      
      
      
      
      var counterGroup = phone.group()
      counterGroup.add(headGroup).add(arcGroup)
      
      
    
      
      this.$nextTick(() => {
        gsap.registerPlugin(ScrollTrigger)
        const tl = gsap.timeline()
          tl.from(people,
            {opacity: 0, 
              stagger:{
                grid:[9,4],
                from: 'random',
                amount: 10
              },
              
          })
          tl.to(obj,{value:this.count, snap:{value:1},onUpdate: updateHeadNumber, duration : 10},"-=10")
          function updateHeadNumber(){
          headCount.node.innerHTML = obj.value
          }
          tl.from(arcInner.node, {attr:{"stroke-dashoffset": arcInnerLength}, duration:10},"-=10")
          const person = document.querySelector('.person-icon')
          console.log("🚀 ~ file: script.js ~ line 121 ~ this.$nextTick ~ person", person)
          
          gsap.set(".person-icon", {y: 10, opacity:0});

          var conversationTL = gsap.timeline({paused: true})
          conversationTL.to(object,{value: conversation.length -1, duration:2, snap:{value:1}, repeat: -1,onUpdate:()=>{
            this.speech = {text:conversation[object.value].text,
              grid:conversation[object.value].grid} || ""              
          }})
          // conversationTL.from($refs.bubble,{opacity: 0, duration:1},"-=10")
          conversationTL.play()

ScrollTrigger.batch(".person-icon", {
  start: "top bottom-=100px",
  onEnter: batch => gsap.to(batch, {opacity: 0.2, y: 0, stagger: 0.15}),
  onLeaveBack: batch => gsap.to(batch, {opacity: 0, y: 10, stagger: 0.1})
});




// when ScrollTrigger does a refresh(), it maps all the positioning data which 
// factors in transforms, but in this example we're initially setting all the ".box"
// elements to a "y" of 100 solely for the animation in which would throw off the normal 
// positioning, so we use a "refreshInit" listener to reset the y temporarily. When we 
// return a gsap.set() in the listener, it'll automatically revert it after the refresh()!
ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".person-icon", {y: 0, opacity: 0}));
          
      })
      
    },
    hello: 'Hello',
    count: '',
    people: '',
    speech: '',
    scrollTop: true,
  }
}


barba.init({
  transitions: [{
    name: 'opacity-transition',
    leave(data) {
      return gsap.to(data.current.container, {
        opacity: 0
      });
    },
    enter(data) {
      return gsap.from(data.next.container, {
        opacity: 0
      });
    }
  }]
});