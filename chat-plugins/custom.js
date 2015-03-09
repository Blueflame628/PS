// Custom Commands.

exports.commands = {
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
	}
};
