var fs = require('fs'),
    http = require('http');

global.rhcApp = {
	running: 0,
	tasksLeft: 0,
	done: function () {
		this.tasksLeft--;
		if (this.tasksLeft <= 0) return this.runapp();
		return false;
	},
	runapp: function () {
		if (this.running) return false;
		require('./app.js');
		return (this.running = true);
	},
	writefilesync: function (from, to) {
		try {
			var buff = fs.readFileSync(from);
			fs.writeFileSync(to, buff);
		} catch (e) {
			return e;
		}
	},
	writefile: function (from, to) {
		fs.readFile(from, function (err, data) {
			if (err) {
				console.log('Error in reading file : ' + err);
				return;
			}
			fs.writeFile(to, data, function (err) {
				if (err) {
					console.log('Error in writing file : ' + err);
					return;
				}
			});
		});
	},
	setupwatch: function (from, to) {
		fs.watchFile(from, function (curr, prev) {
			if (curr.mtime <= prev.mtime) return;
			try {
				this.writefile(from, to);
			} catch (err) {
				console.log('Error in writing file(watcher) : ' + err);
				return;
			}
		}.bind(this));
	},
	downloadfile: function (url, savedir, cb) {
		var req = http.get(url, function (res) {
			res.setEncoding('utf8');
			var data = '';
			res.on('data', function (chunk) {
				data += chunk;
			});
			res.on('end', function () {
				fs.writeFile(savedir, data, function (err) {
					if (err) {
						cb('error', err);
						return;
					}
					cb('success', savedir);
				});
			});
		});
		req.on('error', function (err) { cb('error', err); });
	}
};
var ddir = process.env['OPENSHIFT_DATA_DIR'];

rhcApp.writefilesync(ddir + 'usergroups.csv', 'config/usergroups.csv');
rhcApp.writefilesync(ddir + 'chatrooms.json', 'config/chatrooms.json');
rhcApp.writefilesync(ddir + 'lastbattle.txt', 'logs/lastbattle.txt');
rhcApp.writefilesync(ddir + 'custom.css', 'config/custom.css');

fs.readdirSync(ddir + 'avatars')
.forEach(function (pic) {
	rhcApp.writefilesync(ddir + 'avatars/' + pic, './config/avatars/' + pic);
});

rhcApp.setupwatch('config/usergroups.csv', ddir + 'usergroups.csv');
rhcApp.setupwatch('config/chatrooms.json', ddir + 'chatrooms.json');
rhcApp.setupwatch('logs/lastbattle.txt', ddir + 'lastbattle.txt');
rhcApp.setupwatch(ddir + 'custom.css', 'config/custom.css');
