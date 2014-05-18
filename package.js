Package.describe({
  summary: "Specify cron like recurring jobs with an easier interface."
});

Package.on_use(function (api, where) {
  api.use('underscore', 'server');
  api.add_files('cron.js', ['server']);
  if (api.export) {
    api.export('Cron');
  }
});
