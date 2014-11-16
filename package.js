Package.describe({
    summary: "Specify cron like recurring jobs with an easier interface.",
    git: 'https://github.com/chfritz/meteor-easycron.git',
    version: '0.0.3'
});

Package.on_use(function (api, where) {
    api.versionsFrom('0.9.0');
    api.use('underscore', 'server');
    if (api.export) {
        api.export('Cron','server');
    }
    api.add_files('cron.js', ['server']);
});
