var fs = require('fs');

exports.commands = {
	downloadpic: function (target, room, user) {
		if (!this.can('hotpatch')) return false;

		target = ('' + target).split(',');
		if (target.length !== 2) return this.sendReply("Usage: /dowloadpic url,savedir");
		try {
			require('needle').get(target[0]).pipe(fs.createWriteStream(target[1]));
		} catch (e) {
			this.popupReply("Failed download: " + e);
		}
	},
	setavatar: function (target, room, user) {
		if (!this.can('hotpatch')) return false;

		target = ('' + target).split(',');
		if (target.length !== 3) return this.sendReply("Usage: /setavatar userid,url,extension");
		var userid = toId(target[0]),
		    url = target[1],
		    ext = toId(target[2]);
		const exts = {
			'jpg': 'jpg',
			'jpeg': 'jpg',
			'gif': 'gif',
			'png': 'png'
		};
		ext = exts[ext];
		if (!ext) return this.sendReply("Invalid extension: valid ones are jpg, png, gif");

		var avFile = userid + '.' + ext;
		try {
			require('needle').get(url)
			.pipe(fs.createWriteStream('config/avatars/' + avFile))
			.on('close', function () {
				this.parse('/bash cp config/avatars/' + avFile + ' $OPENSHIFT_DATA_DIR/avatars/' + avFile);
				Config.customavatars[userid] = avFile;
			}.bind(this));
			this.sendReply('"' + userid + '": "' + avFile + '"');
		} catch (e) {
			this.popupReply("Failed download: " + e);
		}
	},
	getcustomformats: 'reloadcustforms',
	reloadcustforms: function (target, room, user) {
		if (!this.can('hotpatch')) return false;
		var callback = function (status, resp) {
			this.sendReply(status);
			if (status === 'error') {
				try {
					this.sendReply('>> ' + resp);
				} catch (e) {}
			} else if (target === 'hotpatch') {
				this.parse('/hotpatch formats');
			}
			room.update();
		}.bind(this);
		rhcApp.downloadfile('http://pastebin.com/raw.php?i=HDmZqYyz', './config/customformats.js', callback);
	},
	roomlist: function () {
		if (!this.can('hotpatch')) return false;

		var rooms = Object.keys(Rooms.rooms),
			len = rooms.length,
			official = ['<b><font color="#1a5e00" size="2">Official rooms</font></b><br><br>'],
			nonOfficial = ['<hr><b><font color="#000b5e" size="2">Chat rooms</font></b><br><br>'],
			privateRoom = ['<hr><b><font color="#5e0019" size="2">Private rooms</font></b><br><br>'];
		while (len--) {
			var currRoom = Rooms.rooms[rooms[(rooms.length - len) - 1]];
			var button = '<button name = "send" value = "/join ' + currRoom.id + '">' + currRoom.title + '</button>';
			if (currRoom.type === 'chat') {
				if (currRoom.isOfficial) official.push(button);
				else if (currRoom.isPrivate)  privateRoom.push(button);
				else nonOfficial.push(button);
			}
		}
		this.sendReplyBox([].concat(official).concat(nonOfficial).concat(privateRoom).join('  '));
	}
};
