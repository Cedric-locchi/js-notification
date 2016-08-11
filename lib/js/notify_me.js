"use strict";

var Notify = function () {
    var args = arguments;

    if ("object" === typeof args[0]) {

        this.message  = args[0].message || "";
        this.title    = args[0].title || "";
        this.closable = args[0].closable || false ;
        this.duration = args[0].duration || "";
        this.position = args[0].position || "";
        this.etat     = args[0].etat || "";
        this.entry    = args[0].entry;
        this.exit     = args[0].exit;
        this.button   = args[0].button || false;

    } else if("string" === typeof args[0]) {

        this.title    = args[0];
        this.message  = args[1];
        this.closable = false;
        this.duration = "";
        this.position = "";
        this.etat     = "";
        this.entry    = "fadeIn";
        this.exit     = "fadeOut";
        this.button   = false

    } else {
        throw new Error('notify take an object or a string in his constructor')
    }
};

/**
 * allows to check the notification's position on the page
 *
 * @param elem
 * @private
 */
Notify.prototype._checkPosition = function(elem) {
    this.position !== "" ? elem.classList.add(this.position) : elem.classList.add('top-right');
};

/**
 * allows to check notification's state and define the state css class
 *
 * @param elem
 * @private
 */
Notify.prototype._checkState = function(elem) {
    this.etat === 'success' ? elem.classList.add("success"): "";
    this.etat === 'error' ? elem.classList.add("error") : "";
    this.etat === 'warning' ? elem.classList.add("warning") : "";
    this.etat === '' ? elem.classList.add("default") : "";
};

/**
 * allows to check if notification's auto remove is activated
 *
 * @param elem
 * @private
 */
Notify.prototype._checkIsClosable = function(elem) {
    this.closable === true ? elem.className += "" : elem.classList.add("close");
};

/**
 * allows to append content and title on the notification
 *
 * @param elem
 * @param container
 * @private
 */
Notify.prototype._getContent = function(elem, container) {

    var h2    = document.createElement('h2');
    var p     = document.createElement('p');
    var i     = document.createElement('i');
    var entry = this.entry;
    var exit  = this.exit;

    i.className = "fa fa-close";

    this.title !== "" ? h2.textContent = this.title : h2.textContent = 'title';
    this.message !== "" ? p.textContent = this.message : p.textContent = "Notifyme";

    elem.appendChild(h2);
    elem.appendChild(p);

    if(h2.parentNode.classList[2] === 'close'){
        h2.appendChild(i);
    }

    i.addEventListener('click', function (e) {
        e.preventDefault();

        elem.classList.remove(entry);
        elem.classList.add(exit);
        setTimeout(function () {
            container.removeChild(elem);
        }, 1000);
    });

};

/**
 * allows to close automatically a notification
 *
 * @param elem
 * @param container
 * @private
 */
Notify.prototype._closable = function(elem, container) {

    var entry = this.entry;
    var exit  = this.exit;

    if( this.closable === true ) {
        if(entry && exit) {
            setTimeout(function () {
                elem.classList.remove(entry);
                elem.classList.add(exit);

                setTimeout(function () {
                    container.removeChild(elem);
                }, 700);

            }, this.duration);
        } else {
            setTimeout(function () {
                container.removeChild(elem);
            }, this.duration);
        }
    }

};


/**
 * allows to animate the notification's opening and closing
 *
 * @param elem
 * @private
 */
Notify.prototype._checkIfIsAnimate = function (elem) {

    if(this.entry !== '' && this.exit !== '') {
        elem.classList.add('animated');
        elem.classList.add(this.entry);
    }

};

/**
 * allows to create action buttons on the notification
 * "ok" and "cancel" for build new event on this actions button
 *
 * @param elem
 * @private
 */
Notify.prototype._checkIfButton = function (elem) {

    if(this.button === true) {

        var notify = document.querySelector('.notify');

        var btn1   = document.createElement('button');
        var btn2   = document.createElement('button');

        btn1.className   = 'btn-ok';
        btn1.id          = 'btn-' + Math.random();
        btn1.textContent = "ok";

        btn2.className   = 'btn-cancel';
        btn2.id          = 'btn-' + Math.random();
        btn2.textContent = 'cancel';

        elem.appendChild(btn1);
        elem.appendChild(btn2);
    }

};

/**
 * displays the notification on the page
 *
 * @param parent
 */
Notify.prototype.render = function (parent) {

    var container = document.querySelector(parent);
    var elem      = document.createElement('div');

    elem.className = "notify ";
    elem.id        = "notify-" + Math.random();

    this._checkPosition(elem);
    this._checkIsClosable(elem);
    this._checkState(elem);
    this._checkIfButton(elem);

    this._closable(elem, container);
    this._getContent(elem, container);

    this._checkIfIsAnimate(elem);

    container.appendChild(elem);
};

module.exports = Notify;