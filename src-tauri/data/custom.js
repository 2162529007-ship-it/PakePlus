window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }// 后台静音保活，解决切APP音乐卡顿
let keepAudio = new Audio("data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAA==");
keepAudio.loop = true;
let audioCtx = null;

document.addEventListener('visibilitychange', function () {
    // 页面切后台时唤醒音频、播放静音保活
    if(document.hidden){
        keepAudio.play().catch(()=>{});
        if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if(audioCtx.state === 'suspended') audioCtx.resume();
    }else{
        keepAudio.pause();
    }
});

// APP失去焦点也维持音频运行
window.addEventListener('blur',()=>{
    let allAudio = document.querySelectorAll('audio');
    allAudio.forEach(item=>{
        if(!item.paused) item.play().catch(e=>{});
    })
})
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })
