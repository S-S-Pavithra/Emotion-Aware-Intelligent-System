const page = document.getElementById("page");
let discoColors = ["#ffff00","#ff0000","#00ff00","#0000ff","#ff00ff","#00ffff","#ff8800"];
let discoIndex = 0;
let discoInterval = setInterval(() => {
    page.style.background = discoColors[discoIndex];
    discoIndex = (discoIndex + 1) % discoColors.length;
}, 1500); // change color every 1.5 seconds

const particleLayer = document.createElement("div");
particleLayer.style.position = "absolute";
particleLayer.style.top = 0;
particleLayer.style.left = 0;
particleLayer.style.width = "100%";
particleLayer.style.height = "100%";
particleLayer.style.pointerEvents = "none";
particleLayer.style.zIndex = 0;
document.body.appendChild(particleLayer);

let particleInterval;

function createParticle(symbol, x, y, size, speed) {
    const p = document.createElement("span");
    p.innerText = symbol;
    p.style.position = "absolute";
    p.style.left = x + "px";
    p.style.top = y + "px";
    p.style.fontSize = size + "px";
    particleLayer.appendChild(p);

    let top = y;
    let anim = setInterval(() => {
        top += speed;
        p.style.top = top + "px";
        if(top > window.innerHeight + 50){
            particleLayer.removeChild(p);
            clearInterval(anim);
        }
    }, 50);
}

function launchParticles(emotion) {
    if(particleInterval) clearInterval(particleInterval);
    particleLayer.innerHTML = "";
    const width = window.innerWidth;

    if(emotion=="joy") particleInterval = setInterval(()=>createParticle("✨",Math.random()*width,0,20+Math.random()*20,2+Math.random()*3),200);
    else if(emotion=="anger") particleInterval = setInterval(()=>createParticle("🔥",Math.random()*width,0,20+Math.random()*15,3+Math.random()*2),200);
    else if(emotion=="sadness") particleInterval = setInterval(()=>createParticle("🌧️",Math.random()*width,0,20+Math.random()*10,4+Math.random()*2),200);
    else if(emotion=="anxiety") particleInterval = setInterval(()=>createParticle("💓",Math.random()*width,0,20+Math.random()*10,2+Math.random()*2),200);
    else if(emotion=="fear") particleInterval = setInterval(()=>createParticle("👻",Math.random()*width,0,20+Math.random()*10,2+Math.random()*2),200);
    else if(emotion=="envy") particleInterval = setInterval(()=>createParticle("🍃",Math.random()*width,0,20+Math.random()*10,2+Math.random()*2),200);
    else if(emotion=="embarrassed") particleInterval = setInterval(()=>createParticle("🙈",Math.random()*width,0,20+Math.random()*10,2+Math.random()*2),200);
    else if(emotion=="bored") particleInterval = setInterval(()=>createParticle("😴",Math.random()*width,0,20+Math.random()*10,1+Math.random()*2),300);
    
    else if(emotion=="neutral") particleInterval = setInterval(()=>createParticle("⚪",Math.random()*width,0,15+Math.random()*10,1+Math.random()*1.5),400);
}


const emotionKeywords = {
    joy: ["happy","good", "excited", "energetic", "delighted", "cheerful", "joyful", "elated", "thrilled"],
    anger: ["angry", "mad", "furious", "irritated", "annoyed", "frustrated"],
    sadness: ["sad", "tired", "down", "unhappy", "depressed", "blue", "gloomy"],
    anxiety: ["anxious", "nervous", "worried", "stressed", "tense", "overwhelmed"],
    fear: ["fear", "scared", "frightened", "afraid", "terrified", "panic"],
    embarrassed: ["embarrassed", "shy", "awkward", "self-conscious", "blush"],
    envy: ["envy", "jealous", "resentful", "covetous"],
    bored: ["bored", "uninterested", "meh", "tired of"],
  
    neutral: ["neutral","okay","fine","meh","so-so","average"]
};


function analyzeEmotion() {
    const text = document.getElementById("userInput").value.toLowerCase();
    const result = document.getElementById("emotionResult");
    const content = document.getElementById("adaptiveContent");
    const anim = document.getElementById("animation");

    
    clearInterval(discoInterval);

    anim.className = "";

    
    let detectedEmotion = "bored"; // default
    let emotionColor = "#eeeeee";

    for (let [emotion, keywords] of Object.entries(emotionKeywords)) {
        for (let word of keywords) {
            if (text.includes(word)) {
                detectedEmotion = emotion;
                break;
            }
        }
        if(detectedEmotion !== "bored") break;
    }

    
    switch(detectedEmotion){
        case "joy": emotionColor = "#ffff00"; break;
        case "anger": emotionColor = "#ff0000"; break;
        case "sadness": emotionColor = "#66ccff"; break;
        case "anxiety": emotionColor = "#cc99ff"; break;
        case "fear": emotionColor = "#d6ccff"; break;
        case "embarrassed": emotionColor = "#ffd6e8"; break;
        case "envy": emotionColor = "#ccffd9"; break;
        case "bored": emotionColor = "#eeeeee"; break;
        
        case "neutral": emotionColor = "#d3d3d3"; break;
    }

    page.style.background = emotionColor;

    
    launchParticles(detectedEmotion);

    const responses = {
        joy: ["Joy 😊","🎆✨","animate-pop","Celebrate creativity and energy!"],
        anger: ["Anger 😡","🔥🌋","animate-shake","Pause and release tension calmly."],
        sadness: ["Sadness 😔","🌧️💧","animate-wave","Take a breath and rest."],
        anxiety: ["Anxiety 😟","💓","animate-pulse","Slow breathing helps."],
        fear: ["Fear 😨","👻","animate-shake","You are safe. Move step by step."],
        embarrassed: ["Embarrassed 😳","🙈","animate-pop","It happens to everyone."],
        envy: ["Envy 😒","🍃","animate-wave","Focus on your growth."],
        bored: ["Bored 😐","😴","animate-wave","Try something new!"],
        // ✅ Neutral response
        neutral: ["Neutral 😐","⚪","animate-wave","A calm and balanced state."]
    };

    result.innerText = "Detected Emotion: " + responses[detectedEmotion][0];
    anim.innerText = responses[detectedEmotion][1];
    anim.classList.add(responses[detectedEmotion][2]);
    content.innerText = responses[detectedEmotion][3];
}
