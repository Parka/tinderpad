// Enable chromereload by uncommenting this line:
import 'chromereload/devonly';
//import * as gp from 'gamepad.js';
console.log(`'Allo 'Allo! Content script!`);

var gp = require('gamepad.js');
const vel = 10;
const gamepad = new gp();
var mapping = {
  "button_1": [".close",".modalManager",".needsclick",".profileCard__backArrow"],
  "button_2": [".close",".modalManager",".recsGamepad__button--like"],
  "button_3": [".close",".modalManager",".recsGamepad__button--dislike"],
  "button_4": [".close",".modalManager",".recsGamepad__button--superlike"],
  "shoulder_top_left": [".close",".modalManager",".needsclick",".pageButton:first-of-type"],
  "shoulder_top_right": [".close",".modalManager",".needsclick",".pageButton:last-of-type"],
  "shoulder_bottom_left": [".close",".modalManager",".profileCard__backArrow",".recsGamepad__button"],
  "shoulder_bottom_right": [".close",".modalManager",".profileCard__backArrow",".recsGamepad__button--boost"],
  "select": [".close",".desktopNavbar>div>a",".desktopNavbar__profile"],
  "start": [".close",".modalManager button.button"],
  "stick_button_left": [".close",".modalManager",".profileCard__textContent .react-swipeable-view-container>div>div>div"],
  "stick_button_right": [".close",".modalManager","audio+div>div:last-child"],
  "d_pad_up": [".close",".modalManager",".recsGamepad__button--superlike"],
  "d_pad_down":[".close",".modalManager",".needsclick",".profileCard__backArrow"],
  "d_pad_left": [".close",".modalManager",".recsGamepad__button--dislike"],
  "d_pad_right": [".close",".modalManager",".recsGamepad__button--like"],
  // "vendor": ".recsGamepad__button--"
};

for (var button_name in mapping) {
  if (mapping.hasOwnProperty(button_name)) {
    gamepad.on('press', button_name, e => {
      console.log(`${e.button} was pressed!
        value equals = ${e.value}`);

      if (typeof mapping[e.button] == "string") {
        mapping[e.button] = [mapping[e.button]];
      }
      for (var i = 0; i < mapping[e.button].length; i++) {
        if(document.querySelector(mapping[e.button][i])){
          document.querySelector(mapping[e.button][i]).click();
          break;
        }
      }
    });
  }
}

gamepad.on('hold','stick_axis_right',e=>{
  if(document.querySelector(".profileCard__card"))
    document.querySelector(".profileCard__card").scrollBy(e.value[0]*vel,e.value[1]*vel);
});
gamepad.on('hold','stick_axis_left',e=>{
  if(document.querySelector(".modalManager>div>div>div:last-child"))
    document.querySelector(".modalManager>div>div>div:last-child").scrollBy(e.value[0]*vel,e.value[1]*vel);
})
gamepad.on('connect', e => {
    console.log(`controller ${e.index} connected!`);
});
