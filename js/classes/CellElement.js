function CellElement(row, col) {
    this.create = function () {
        this.createElement(row, col);
        this.sqrNumber = calculateSqrNumber(row, col);
        this.addEventListeners();
        this.observers = [];
    }

    this.createElement = function () {
        // TODO data-row and data-col useful after refactoring?
        this.row = row;
        this.col = col;

        this.el = document.createElement("input");
        this.el.setAttribute('type', 'number');
        this.el.setAttribute('min', 1);
        this.el.setAttribute('max', 9);
        this.el.setAttribute('data-row', this.row);
        this.el.setAttribute('data-col', this.col);
    }

    this.gainsFocus = function () {
        this.addClass('usr-input');
    }

    this.losesFocus = function () {
        if (!this.hasVal()) {
            this.removeClass('usr-input');
        }
    }

    this.getElement = function () {
        return this.el;
    }

    this.addClass = function (className) {
        this.el.classList.add(className);
    }

    this.removeClass = function (className) {
        this.el.classList.remove(className);
    }

    this.addError = function () {
        this.addClass("wrong-input");
    }

    this.removeError = function () {
        this.removeClass("wrong-input");
    }

    // TODO replace by explicit calls to either addError() or removeError()
    this.update = function (hasError) {
        if (hasError) {
            this.addError();
        } else {
            this.removeError();
        }
    }

    this.registerObserver = function (observer) {
        this.observers.push(observer);
    }

    this.removeObserver = function (observer) {
        var index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }

    this.notifyObservers = function () {
        for (var i = 0; i < this.observers.length; i++) {
            this.observers[i].update(this);
        }
    }

    this.addEventListeners = function () {
        // TODO check if event is correct for value change
        var self = this;

        this.el.addEventListener('focus', function () {
            self.gainsFocus();
        })
        this.el.addEventListener('blur', function () {
            self.losesFocus();
        })

        this.el.addEventListener('change', function () {
            self.setVal(self.el.value);
            self.notifyObservers();
        })
    }

    // TODO params required in create ?
    this.create();
}

CellElement.prototype = new Cell();