# notify-me
simple and customisable notification's system.

Add ES6 structure for notify lib

## for to use notification's system it's easy:

- run bower install notify_me
- you can use browserify or requirejs or webpack for require the library on your app code
- you can use my librairie

that's all


## using example:

- an object:

```
var Notifyme = require('../../lib/js/notify');
var notif = new Notifyme({
    message: "un message",
    title: "un titre",
    closable: false,
    duration: 10000,
    position: "top-left",
    etat: "warning",
    entry: "flipInX",
    exit: "flipOutX",
    button: false
});
notif.render('.notif');
```

- an string:

```
var Notifyme = require('../../lib/js/notify');
var notifString = new Notifyme('un titre de notif', 'un message de notification ');
notifString.render('.notif');
```

and in the html page just add your js file with library and 

- css:

```
<link rel="stylesheet" href="lib/css/notify.css">
```
- HTML tag:

```
<div class="notif"></div>
```

if you want customise my notification's css, it's easy, in lib folder, there are all scss files file for notification's stylesheet
###### this library embed font-awsome if you want customise my notification with icons 
and animate.css for choose your notification's animation configuration