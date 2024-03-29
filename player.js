const video = document.getElementById('video');
const qualityList = document.querySelector('#quality-list');

const logoImage = {
    dark: 'https://telegra.ph/file/4380bb74b9faa4bc3d27b.png',
    light: 'https://telegra.ph/file/573ec10bf7b6cab25b499.png'
};

document.addEventListener("DOMContentLoaded", function() {
    var video = document.getElementById('video');
    var videoSrc = 'https://hls-origin278.showroom-cdn.com/liveedge/ngrp:6b84b500ddf6ec574b0ccffdee8d828247a35d6035a8b550c1e4e61344110e44_all/chunklist_b323675.m3u8'; // Ganti dengan URL file m3u8 kamu

    if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoSrc;
    }
});

function initialize() {
    const modeSwitch = document.getElementById('mode-switch');
    const logo = document.getElementById('logo');
    const body = document.body;

    modeSwitch.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        modeSwitch.classList.toggle('btn-light');
        modeSwitch.classList.toggle('btn-dark');
        modeSwitch.innerHTML = body.classList.contains('dark-mode') ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

        logo.src = body.classList.contains('dark-mode') ? logoImage.dark : logoImage.light;

        // Menyimpan preferensi mode pada local storage
        const preferredMode = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('preferredMode', preferredMode);
    });
}

initialize();

function playPause() {
    video.paused ? video.play() : video.pause();
}

function volumeUp() {
    if (video.volume <= 0.9) video.volume += 0.1;
}

function volumeDown() {
    if (video.volume >= 0.1) video.volume -= 0.1;
}

function seekRight() {
    video.currentTime += 5;
}

function seekLeft() {
    video.currentTime -= 5;
}

function vidFullscreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    }
}

playM3u8(window.location.href.split("#")[1]);
$(window).on('load', function () {
    $('#video').on('click', function () { this.paused ? this.play() : this.pause(); });
    Mousetrap.bind('space', playPause);
    Mousetrap.bind('up', volumeUp);
    Mousetrap.bind('down', volumeDown);
    Mousetrap.bind('right', seekRight);
    Mousetrap.bind('left', seekLeft);
    Mousetrap.bind('f', vidFullscreen);
});


if (window.innerWidth >= 1024) {
    video.style.cssText = 'height: 80vh; max-height: calc(100vw * 9 / 16);' //pc
} else {
    video.style.cssText = 'max-height: 80vh; max-width: 100%;' //hp
}

// Memeriksa preferensi mode pada local storage
const preferredMode = localStorage.getItem('preferredMode');
if (preferredMode === 'dark') {
    // Jika mode gelap dipilih sebelumnya, aktifkan dark mode
    document.body.classList.add('dark-mode');
    document.getElementById('mode-switch').classList.add('btn-dark');
    document.getElementById('mode-switch').innerHTML = '<i class="fas fa-sun"></i>';
    document.getElementById('links').classList.add('btn-dark');
    document.getElementById('logo').src = 'https://telegra.ph/file/4380bb74b9faa4bc3d27b.png';
}
