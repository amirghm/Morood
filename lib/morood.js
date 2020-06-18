let isPlayingParam = false;
let isPlayCallbackRegistered = false;
let isOnAnimationLoadedRegistered = false;
let isOnAnimationLoopCompleteRegistered = false;

class Key {
    constructor(frame, position) {
        this.frame = frame;
        this.position = position;
    }
}

class Layer {
    constructor(layerIndex, name, keys) {
        this.layerIndex = layerIndex;
        this.name = name;
        this.keys = keys;
    }
}

anim.setSubframe(false);
anim.addEventListener("DOMLoaded", function () {
    MoroodClient.onAnimationLoaded();
    anim.addEventListener("enterFrame", function (e) {
        if (isPlayCallbackRegistered) {
            MoroodClient.onAnimationPlay(parseInt(e.currentTime), parseInt(e.totalTime), anim.frameRate);
        }
    });

    anim.addEventListener("loopComplete", function () {
        if (isOnAnimationLoopCompleteRegistered)
            MoroodClient.onAnimationLoopComplete(anim.loop);
    });
});

function setXY(x, y) {
    anim.animationData.layers[0].ks.p.k[0].s = [x, y, 0];
    anim.animationData.layers[0].ks.p.k[1].s = [x, y, 0];
}

function getAllLayers() {
    let layersKeys = {};
    for (let layerIndex in anim.animationData.layers) {
        let keys = [];
        anim.animationData.layers[layerIndex].ks.p.k.forEach(function (element) {
            if (element.s != null)
                keys.push(new Key(element.t, element.s))
        });
        layersKeys[anim.animationData.layers[layerIndex].nm] = new Layer(layerIndex, anim.animationData.layers[layerIndex].nm, keys);
    }
    return layersKeys;
}

function getLayerByName(name) {
    return getAllLayers()[name];
}

function editKeyPosition(layerName, keyIndex, point) {
    let layerIndex = getLayerByName(layerName).layerIndex;
    anim.animationData.layers[layerIndex].ks.p.k[keyIndex].s = point;
}

function getCurrentFrameTime() {
    return currentFrame;
}

function isPlaying() {
    return !anim.isPaused;
}

function isLoop() {
    return anim.loop;
}

function setAutoPlay(autoPlay) {
    anim.autoplay = autoPlay;
}

function seekTo(frame, play) {
    if (play)
        anim.goToAndPlay(frame, true);
    else
        anim.goToAndStop(frame, true);
}

function playSegment(start, end) {
    anim.playSegments([start, end], true)
}

function play() {
    anim.play();
}

function pause() {
    anim.pause();
}

function stop() {
    anim.stop();
}

function setLoop(value) {
    anim.loop = value;
}

function sendHelloToAndroid() {
    // user confirmation needed
    let dataString = "data to android";
    let messageToAndroid = "Hello Android";
    MoroodClient.helloAndroid('helloCallback', dataString, messageToAndroid);
}

function registerPlayCallback() {
    isPlayCallbackRegistered = true;
}

function unRegisterPlayCallback() {
    isPlayCallbackRegistered = false;
}

function registerAnimationLoadedCallback() {
    isOnAnimationLoadedRegistered = true;
}

function unRegisterAnimationLoadedCallback() {
    isOnAnimationLoadedRegistered = false;
}

function registerAnimationLoopCompletedCallback() {
    isOnAnimationLoopCompleteRegistered = true;
}

function unRegisterAnimationLoopCompletedCallback() {
    isOnAnimationLoopCompleteRegistered = false;
}

function seekToAnimation(frame, play) {
    seekTo(frame, play);
}

