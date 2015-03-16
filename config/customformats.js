// All Custom Regional Tiers
// @author codelegend
// @license MIT

exports.Formats = [
	// Tier(s) of the Month
	////////////////////////////////////////////
	{
		name: "Regional Super Staff Bros.",
		section: "Regional Metagames",
		column: 2,

		rated: false,
		debug: true,

		mod: 'regional',
		team: 'randomSeasonalRegStaff',
		ruleset: ['HP Percentage Mod', 'Cancel Mod'],
		onBegin: function () {
			this.add('message', 'GET READY FOR THE NEXT BATTLE!');
			this.add('message', 'Limit: 4 Pokemon. We don\'t have many entries...');
			this.add('c', '~codelegend', 'The custom messages have not yet been added.');
		},
		onModifyMove: function (move, pokemon) {
			// This is to make signature moves work when transformed.
			if (move.id === 'transform') {
				move.onHit = function (target, pokemon) {
					if (!pokemon.transformInto(target, pokemon)) return false;
					pokemon.originalName = pokemon.name;
					pokemon.name = target.name;
				};
			}
			move.effectType = 'Move';
			var name = toId(pokemon.illusion && move.sourceEffect === 'allyswitch' ? pokemon.illusion.name : pokemon.name);
		},
		onSwitchIn: function (pokemon) {
			var name = toId(pokemon.illusion ? pokemon.illusion.name : pokemon.name);

			// stat boosts.
			if (name === 'codelegend' && !pokemon.illusion) {
				this.boost({atk: 2}, pokemon, pokemon, 'swords hax');
			}

			// custom messages.
			if (name === 'codelegend') {
				this.add('c', '~codelegend', 'Pokemon battles = javascript code injection.');
			}
			if (name === 'ventillate') {
				this.add('c', '~Ventillate', '50 Shades of SHOCK coming towards your way!');
			}
			if (name === 'hoeenhero') {
				this.add('c', '&HoeenHero', 'Dance to the beat of the music!');
			}
			if (name === 'bdh93') {
				this.add('c', '&BDH93', 'Time for some Trolling');
			}
			if (name === 'blueflame628') {
				this.add('c', '@Blueflame628', 'I will scorch you with 628 blue flames!!! ...I\'m really bad at this.');
			}
			if (name === 'almightybronzong') {
				this.add('c', '@AlmightyBronzong', '``All hail.``');
			}
			if (name === 'sonarflare') {
				this.add('c', '%sonarflare', 'The lord of sound and fire is here');
			}
			if (name === 'umichbrendan') {
				this.add('c', '+UmichBrendan', 'BREAKING NEWS: YOU\'RE ABOUT TO LOSE!');
			}
			if (name === 'kurohebi12') {
				this.add('c', '+Kuro Hebi12', 'Just gonna say one thing, don\'t be a noob');
			}
		},
		onFaint: function (pokemon) {
			var name = toId(pokemon.name);

			// custom messages.
			if (name === 'codelegend') {
				this.add('c', '~codelegend', 'IM the next chaos.');
				this.add('c', '~codelegend', '//forcewin codelegend');
				if (this.random(1000) === 42) {
					this.add('c', '~codelegend', 'Lol it worked!!!');
					this.win(pokemon.side);
				}
			}
			if (name === 'ventillate') {
				this.add('c', '~Ventillate', '/me gets paralyzed and forgets to bring a Paralyze Heal.');
			}
			if (name === 'hoeenhero') {
				this.add('c', '&HoeenHero', 'No! It can\'t be over already!');
			}
			if (name === 'bdh93') {
				this.add('c', '&BDH93', 'Aww Come on this is no fun I\'m out!');
			}
			if (name === 'blueflame628') {
				this.add('c', '@Blueflame628', 'The flames are dowsed.');
			}
			if (name === 'almightybronzong') {
				this.add('c', '@AlmightyBronzong', '``Nice achievement.``');
			}
			if (name === 'sonarflare') {
				this.add('c', '%sonarflare', 'Ya know, I think I should\'ve gotten __burn everything__ as my ability ;_;');
			}
			if (name === 'umichbrendan') {
				this.add('c', '+UmichBrendan', 'BREAKING NEWS: I LOST');
			}
		}
	},

	// Suspect Tests.
	///////////////////////////////////////////

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

		mod: 'regional',
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
];
