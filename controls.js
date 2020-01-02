const animationBuilder = (direction) => {
  return function animateRotate() {
    switch (direction) {
      case 'up':
        globe.rotation.x -= 0.02;
        break;
      case 'down':
        globe.rotation.x += 0.02;
        break;
      case 'left':
        globe.rotation.y -= 0.02;
        break;
      case 'right':
        globe.rotation.y += 0.02;
        break;
      default:
        break;
    }
  }
}

let animateDirection = {
  up: animationBuilder('up'),
  down: animationBuilder('down'),
  left: animationBuilder('left'),
  right: animationBuilder('right')
}

const onKeyPress = (e) => {
  e = e || window.event;
  e.preventDefault();
 
  //based on keycode, trigger appropriate animation:
  if (e.keyCode == '38') {
    animateDirection.up();
  } else if (e.keyCode == '40') {
    animateDirection.down();
  } else if (e.keyCode == '37') {
    animateDirection.left();
  } else if (e.keyCode == '39') {
    animateDirection.right();
  }
}