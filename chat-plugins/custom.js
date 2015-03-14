/**
* Custom Commands for the Regional Server.
* Modify pre-defined commands to certain extent.
**/
Users.User.prototype.getIdentity = function (roomid) {
	var name = this.name;
	if (this.away) name += ' - ' + this.away;
	if (this.locked) return '‽' + name;
	if (this.hiding) return ' ' + name;
	if (this.customSymbol) return this.customSymbol + name;
	if (roomid) {
		if (this.mutedRooms[roomid]) {
			return '!' + name;
		}
		var room = Rooms.rooms[roomid];
		if (room && room.auth) {
			if (room.auth[this.userid]) {
				return room.auth[this.userid] + name;
			}
			if (room.isPrivate) return ' ' + name;
		}
	}
	return this.group + name;
};

var commands = exports.commands = {
	stafflist: function (target, room, user, connection) {
		var rankLists = {};
		for (var userid in Users.usergroups) {
			var group = Users.usergroups[userid].substr(0, 1);
			if (!rankLists[group]) rankLists[group] = [];
			rankLists[group].push(userid);
		}
		var buffer = [];
		Object.keys(rankLists).sort(function (a, b) {
			return Config.groups[b].rank - Config.groups[a].rank;
		}).forEach(function (r) {
			buffer.push(Config.groups[r].name + "s (" + r + "):\n" + rankLists[r].sort().join(", "));
		});
		if (!buffer.length) return this.sendReply("This server has no staff.");
		connection.popup(buffer.join("\n\n"));
	},

	showavatar: function (target, room, user) {
		var userid = toId(target), pic = Config.customavatars[userid];
		if (!pic) return this.sendReply("User " + target + " does not have a custom avatar.");
		if (!this.canBroadcast()) return false;

		this.sendReplyBox('<img src="' + Config.serverurl + 'avatars/' + pic + '" alt="' + pic + '" height=80 width=80 />');
	},
	busy: 'away',
	afk: 'away',
	coding: 'away',
	eating: 'away',
	sleeping: 'away',
	away: function (target, room, user, conn, cmd) {
		if (!user.ignorePMs) this.parse('/ignorepms');
		if (!user.blockChallenges) this.parse('/blockchallenges');

		user.away = cmd.split('').map(function (s) {
			function ascii(s) {
				s = string(s).substr(0, 1) || '';
				return s.charCodeAt(0);
			}
			const one = ascii('\u2460') - ascii('1'),
				smalla = ascii('\u24d0') - ascii('a'),
				capa = ascii('\u24b6') - ascii('A');
			var code = ascii(s);
			if (code >= ascii('1') && code <= ascii('9')) return String.fromCharCode(code + one);
			if (code >= ascii('A') && code <= ascii('Z')) return String.fromCharCode(code + capa);
			if (code >= ascii('a') && code <= ascii('z')) return String.fromCharCode(code + smalla);
			return ' ';
		}).join('');

		user.updateIdentity();
		this.sendReply("You are now set as " + cmd + ".");
	},
	back: function (target, room, user) {
		if (!user.away) return this.sendReply('You are not set as away.');
		if (user.ignorePMs) this.parse('/unignorepms');
		if (user.blockChallenges) this.parse('/allowchallenges');

		delete user.away;
		user.updateIdentity();
		this.sendReply("You are now back.");
	}
};
