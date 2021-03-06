console.log('js connected');

var gameSound = document.querySelector('.music');

$('.split').each(function() {
  $(this).html(
    $(this)
      .text()
      .replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>")
  );
});

anime.timeline({ loop: false }).add({
  targets: '.split .letter',
  scale: [5, 1],
  opacity: [0, 1],
  translateZ: 0,
  easing: 'easeOutExpo',
  duration: 500,
  delay: function(el, i) {
    return 35 * i;
  },
});
gameSound.play();
