// All Custom Regional Tiers
// @author codelegend
// @license MIT

exports.Formats = [
	// Tier(s) of the Month
	////////////////////////////////////////////
	{
		name: "[Seasonal] Super Regional Staff Bros.",
		section: "Regional Metagames",
		column: 2,

		rated: false,
		// searchShow: false,
		debug: true,

		team: 'randomSeasonalRegStaff',
		ruleset: ['HP Percentage Mod', 'Cancel Mod']
	},

	// Tier Testing
	///////////////////////////////////////////
	{
		name: "1% Tier",
		section: "Regional Metagames (test)",
		column: 2,

		rated: false,
		searchShow: false,
		debug: true,

		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Little Cup'],
		banlist: [
			'LC Uber', 'LC UU', 'Gligar', 'Misdreavus', 'Scyther', 'Sneasel', 'Tangela', 'Aipom', 'Amaura', 'Archen', 'Anorith', 'Aron',
			'Blitzle', 'Bunnelby', 'Cacnea', 'Carvanha', 'Charmander', 'Chimchar', 'Chikorita', 'Clauncher', 'Corphish', 'Cranidos',
			'Croagunk', 'Cubchoo', 'Cubone', 'Cyndaquil', 'Darumaka', 'Deerling', 'Doduo', 'Deino', 'Onix', 'Nosepass', 'Noibat',
			'Minccino', 'Mienfoo', 'Pancham', 'Pumpkaboo', 'Riolu', 'Scraggy', 'Shellder', 'Shieldon', 'Snover', 'Snubbull', 'Swinub',
			'Tyrunt', 'Woobat', 'Ponyta', 'Magnemite', 'Machop', 'Voltorb', 'Trapinch', 'Rhyhorn', 'Hippopotas', 'Growlithe', 'Grimer',
			'Houndour', 'Honedge', 'Froakie', 'Dwebble', 'Drilbur', 'Sonic Boom', 'Swagger', 'Abra', 'Gastly', 'Eviolite', 'Dragon Claw'
		]
	},
	{
		name: "Heavymons",
		section: "Regional Metagames (test)",

		rated: false,
		searchShow: false,
		debug: true,

		ruleset: ['Pokemon', 'Standard', 'Team Preview'],
		banlist: ['Uber', 'metagrossite'],
		validateSet: function (set) {
			var template = this.getTemplate(set.species),
			    gogoat = this.getTemplate('gogoat');
			if (template.weightkg < gogoat.weightkg) {
				return [template.name + ' is not heavier than gogoat, and is not allowed in Heavymons.'];
			}
		}
	},
	{
		name: "Startermons",
		section: "Regional Metagames (test)",

		rated: false,
		searchShow: false,
		debug: true,

		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause', 'Mega Ban Mod'],
		banlist: ['Uber', 'Blaziken + Speed Boost', 'Greninja + Protean'],

		validateSet: function (set) {
			const allowedPokes = [
				'Bulbasaur', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon', 'Charizard', 'Squirtle', 'Wartortle', 'Blastoise',
				'Cyndaquil', 'Quilava', 'Typhlosion', 'Totodile', 'Croconaw', 'Feraligatr', 'Chikorita', 'Bayleef', 'Meganium',
				'Torchic', 'Combusken', 'Blaziken', 'Mudkip', 'Marshtomp', 'Swampert', 'Treecko', 'Grovyle', 'Sceptile',
				'Chimchar', 'Monferno', 'Infernape', 'Piplup', 'Prinplup', 'Empoleon', 'Turtwig', 'Grotle', 'Torterra',
				'Tepig', 'Pignite', 'Emboar', 'Oshawott', 'Dewott', 'Samurott', 'Snivy', 'Servine', 'Serperior',
				'Fennekin', 'Braxien', 'Delphox', 'Froakie', 'Frogadier', 'Greninja', 'Chespin', 'Quilladin', 'Chesnaught',
				'Pikachu', 'Raichu', 'Eevee', 'Flareon', 'Jolteon', 'Vaporeon', 'Umbreon', 'Espeon'
			];

			if (allowedPokes.indexOf(set.species) === -1) return [set.species + " is not a valid starter pokemon. (note: Megas are not allowed)."];
		},
		validateTeam: function (team) {
			if (team.length < 3) return ["You must have atleast three pokemon."];
		},
		onBegin: function () {
			this.debug('Cutting down to 3');
			this.p1.pokemon = this.p1.pokemon.slice(0, 3);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 3);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		}
	},
	{
		name: "Mixed Usage",
		section: "Regional Metagames (test)",

		rated: false,
		searchShow: false,
		debug: true,

		ruleset: ['OU', 'Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber'],
		validateTeam: function (team, format, teamHas) {
			const aboveNUTiers = {
				'OU': 1, 'UU': 1, 'RU': 1
			};
			var aboveNUPokes = 0;
			for (var i = 0; i < team.length; i++) {
				var template = this.getTemplate(team[i].species);
				var tier = template.tier;
				if (tier in aboveNUTiers) aboveNUPokes++;
			}
			if (aboveNUPokes > 3) return ["You cannot have more than three pokemon above NU."];
		}
	}

	// Old
	///////////////////////////////////////////

];
