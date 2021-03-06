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
    },
    reset: function () {
        localStorage.setItem(STORAGE_KEY, '[]');
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
    },
    methods: {
        actOnTimer: function (timer) {
            if (!confirm('Really?')) {
                return;
            }
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
            let duration = moment.duration(moment().diff(moment(time)));
            if (duration.asHours() < 24) {
                return moment().hours(duration.hours()).minutes(duration.minutes()).format('HH:mm');
            }
            return duration.humanize();
        },
        humanize: function (time) {
            return moment(time).format()
        },
        addTimer: function () {
            const newTimer = this.newTimer;
            let timer = {
                title: newTimer.title,
                type: newTimer.type,
                color: newTimer.color ? newTimer.color : '#ffffff',
            };
            if (newTimer.type === TYPES.timer) {
                timer.last = moment().toISOString();
            } else if (newTimer.type === TYPES.toggle) {
                timer.values = [newTimer.value1, newTimer.value2];
                timer.value = newTimer.value1;
            }
            this.newTimer = this.newTimerTemplate;
            this.timers.push(timer);
            this.showModal = false;
        },
        removeTimer: function (timer) {
            this.timers.splice(this.timers.indexOf(timer), 1)
        },
        now: function () {
            return moment().format();
        },
        reset: function () {
            if (!confirm('Really?')) {
                return;
            }
            timersStorage.reset();
            this.timers = timersStorage.fetch();
        }
    },
    moment: moment
});

setInterval(function() {
    app.$forceUpdate();
}, 10000);
