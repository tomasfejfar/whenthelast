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
        newTimer: {},
        showModal: false,
        newTimerTemplate: {type: TYPES.timer}
    },
    watch: {
        timers: {
            handler: function (timers) {
                timersStorage.save(timers)
            },
            deep: true
        },
    },
    created: function () {
        this.newTimer = this.newTimerTemplate;
        this.colors = new DistinctColors({
            lightMin: 70,
            lightMax: 95,
            count: 99,
        });
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
        dismissModal: function (timer) {
            this.showModal = false;
            this.newTimer = this.newTimerTemplate;
        },
        since: function (time) {
            return moment(time).fromNow();
        },
        humanize: function (time) {
            return moment(time).format()
        },
        colorFromHue: function (hue) {
            return 'hsla(' + hue + ', 100%, 80%, 1)';
        },
        randomColor: function () {
            this.newTimer.color = this.colors[Math.round(Math.random() * 30)];
            this.$forceUpdate();
        },
        addTimer: function () {
            const newTimer = this.newTimer;
            let timer = {
                title: newTimer.title,
                type: newTimer.type,
                color: newTimer.color ? newTimer.color : this.colors[Math.round(Math.random() * 30)],
            };
            if (newTimer.type === TYPES.timer) {
                timer.last = moment().toISOString();
            } else if (newTimer.type === TYPES.toggle) {
                timer.values = [newTimer.value1, newTimer.value2];
                timer.value = newTimer.value1;
            }
            this.newTimer = this.newTimerTemplate;
            this.randomColor();
            this.timers.push(timer);
        },
        removeTimer: function (timer) {
            this.timers.splice(this.timers.indexOf(timer), 1)
        },
        now: function () {
            return moment().format();
        },
    },
    moment: moment
});

setInterval(function() {
    app.$forceUpdate();
}, 10000);
