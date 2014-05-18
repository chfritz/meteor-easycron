Package.describe({
  summary: "Specify cron like recuring jobs with an easier interface."
});

// Npm.depends({
//     'moment': '2.6.0',
//     'moment-recur': '1.0.0'
// });

Package.on_use(function (api, where) {
  api.use('underscore', 'server');
  api.add_files('cron.js', ['server']);
  if (api.export) {
    api.export('Cron');
  }
});
