// localStorage persistence
const STORAGE_KEY = 'timers-vuejs-2.0';
const timersStorage = {
    fetch: function () {
        const timers = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        timers.forEach(function (timer, index) {
            timer.id = index
        });
        timersStorage.uid = timers.length;
        return timers;
    },
    save: function (todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
};

const TYPES = {
    timer: 1,
    toggle: 2,
};

const app = new Vue({
    el: '#app',
    data: {
        timers: timersStorage.fetch(),
        TYPES: TYPES,
        newTimer: { type: TYPES.timer }
    },
    watch: {
        timers: {
            handler: function (timers) {
                timersStorage.save(timers)
            },
            deep: true
        }
    },
    methods: {
        actOnTimer: function (timer) {
            switch (timer.type) {
                case TYPES.timer:
                    timer.last = moment().toISOString();
                    break;
                case TYPES.toggle:
                    timer.value = timer.values.filter(function(item) {return item !== timer.value})[0];
            }
        },
        since: function (time) {
            return moment(time).fromNow();
        },
        humanize: function (time) {
            return moment(time).format()
        },
        colorFromHue: function (hue) {
            return 'hsla(' + hue + ', 100%, 85%, 1)';
        },
        addTimer: function () {
            const newTimer = this.newTimer;
            let timer = {
                title: newTimer.title,
                type: newTimer.type,
                backgroundHue: Math.random() * 360,
            };
            if (newTimer.type === TYPES.timer) {
                timer.last = moment().toISOString();
            } else if (newTimer.type === TYPES.toggle) {
                timer.values = [newTimer.value1, newTimer.value2];
                timer.value = newTimer.value1;
            }

            this.timers.push(timer);
        },
        removeTimer: function (timer) {
            this.timers.splice(this.timers.indexOf(timer), 1)
        }
    },
    moment: moment
});
