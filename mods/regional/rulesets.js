// Custom regional rulesets
// @author codelegend

exports.BattleFormats = {
	megabanmod: {
		effectType: 'Rule',
		onStart: function () {
			this.add('rule', 'Mega Evolution Ban Mod: You cannot mega evolve your pokemon');
			for (var i = 0; i < this.sides[0].pokemon.length; i++) this.sides[0].pokemon[i].canMegaEvo = false;
			for (var i = 0; i < this.sides[1].pokemon.length; i++) this.sides[1].pokemon[i].canMegaEvo = false;
		}
	}
};
