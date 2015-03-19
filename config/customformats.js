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

			var allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (var i = 0, len = allPokemon.length; i < len; i++) {
				var pokemon = allPokemon[i];
				var last = pokemon.moves.length - 1;
				if (pokemon.moves[last]) {
					pokemon.moves[last] = toId(pokemon.set.signatureMove);
					pokemon.moveset[last].move = pokemon.set.signatureMove;
					pokemon.baseMoveset[last].move = pokemon.set.signatureMove;
				}
			}
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
			if (name === 'hydrostatics') {
				this.add('c', '@Hydrostatics', 'Let the power of physics defeat you!');
			}
			if (name === 'opple') {
				this.add('c', '@Opple', 'lol hi');
			}
			if (name === 'sonarflare') {
				this.add('c', '%sonarflare', 'The lord of sound and fire is here');
			}
			if (name === 'umichbrendan') {
				this.add('c', '+UmichBrendan', 'BREAKING NEWS: YOU\'RE ABOUT TO LOSE!');
			}
			if (name === 'kurohebi12') {
				this.add('c', '+KuroHebi12', 'Just gonna say one thing, don\'t be a noob');
			}
		},
		onSwitchOut: function (pokemon) {
			var name = toId(pokemon.name);

			if (name === 'codelegend') {
				this.add('c', '~codelegend - \u24b6\u24e6\u24d0\u24e8', 'will return with more hax.');
			}
		},
		onModifyPokemon: function (pokemon) {
			var name = toId(pokemon.name);
			// Enforce choice item locking on custom moves.
			var moves = pokemon.moveset;
			if (pokemon.getItem().isChoice && pokemon.lastMove === moves[3].id) {
				for (var i = 0; i < 3; i++) {
					if (!moves[i].disabled) {
						pokemon.disableMove(moves[i].id, false);
						moves[i].disabled = true;
					}
				}
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
			if (name === 'hydrostatics') {
				this.add('c', '@Hydrostatics', '/me eats his Physics textbook.');
			}
			if (name === 'opple') {
				this.add('c', '@Opple', 'I call hacks, fine. You got me, lol, I\'ll get you next time!');
			}
			if (name === 'sonarflare') {
				this.add('c', '%sonarflare', 'Ya know, I think I should\'ve gotten __burn everything__ as my ability ;_;');
			}
			if (name === 'umichbrendan') {
				this.add('c', '+UmichBrendan', 'BREAKING NEWS: I LOST');
			}
			if (name === 'kurohebi12') {
				this.add('c', '+KuroHebi12', 'Ur still a noob.');
			}
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

			var name = toId(pokemon.illusion && move.sourceEffect === 'allyswitch' ? pokemon.illusion.name : pokemon.name);
			move.effectType = 'Move';

			if (move.id === 'swordsdance' && name === 'codelegend') {
				move.name = 'MultiThreading';
				move.boosts = {atk: 2, spd: 1, accuracy: 1};
				move.pp = 5;
				move.type = 'fire';
			}
			if (move.id === 'raindance' && name === 'ventillate') {
				move.name = 'Storm Shock';
				move.self = {boosts: {spe: 2, spa: 2}};
				move.heal = [35, 100];
			}
			if (move.id === 'teeterdance' && name === 'hoeenhero') {
				move.name = 'Rhythym Dance';
				move.self = {boosts: {spe: 1, spa: 2}};
				move.weather = 'RainDance';
			}
			if (move.id === 'headbutt' && name === 'bdh93') {
				move.name = 'Getting Trolled';
				move.secondaries = [
					{chance: 30, status: 'par'},
					{chance: 30, volatileStatus: 'flinch'},
					{chance: 30, volatileStatus: 'confusion'}
				];
			}
			if (move.id === 'painsplit' && name === 'blueflame628') {
				move.name = 'Sharing his non-existant Life!';
				move.onHit = function (target, pokemon) {
					var averagehp = Math.floor((target.hp + pokemon.hp) / 2) || 1;
					target.sethp(averagehp * 0.8);
					pokemon.sethp(averagehp * 1.2);
					this.add('-sethp', target, target.getHealth, pokemon, pokemon.getHealth, '[from] move: Sharing his non-existant life!');
				};
			}

			if (move.id === 'irondefense' && name === 'almightybronzong') {
				move.name = 'Blast Furnace';
				move.boosts = {def: 3, spd: 2};
				move.onHit = function (target, pokemon) {
					pokemon.cureStatus();
					for (var i in pokemon.volatiles) delete pokemon.volatiles[i];
					pokemon.sethp(pokemon.hp + pokemon.maxhp * 0.8);
					this.add('-sethp', pokemon, pokemon.getHealth, '[from] move: Blast Furnace');
				};
			}
			if (move.id === 'defensecurl' && name === 'opple') {
				move.name = 'Ancient Orb';
				move.boosts.def = 2;
				move.boosts.spd = 2;
				move.heal = [30, 100];
			}
			if (move.id === 'nastyplot' && name === 'hydrostatics') {
				move.name = 'IQ Boost';
			}
			if (move.id === 'attract' && name === 'mimiroppu') {
				move.name = 'Charm Up';
				move.self = {boosts: {atk: 2}};
			}
			if (move.id === 'hypervoice' && name === 'sonarflare') {
				move.name = 'Sonarflared M8';
				move.basePower = 110;
				move.secondary = {chance: 50, status: 'brn'};
			}

			if (move.id === 'slackoff' && name === 'umichbrendan') {
				move.name = 'Play Video Games';
				move.boosts = {def: 1, spd: 1, spa: 1, atk: -1, spe: -1};
				move.onHit = function (target, pokemon) {
					var videogames = ['Civilization', 'GTA', 'Pokemon BW2', 'Pokemon XY', 'Pokemon Emerald', 'PKMN HAXX', 'Madden'];
					this.add('-message', '+UmichBrendan just played ' + videogames[this.random(7)]);
					pokemon.cureStatus();
				};
			}
			if (move.id === 'closecombat' && name === 'kurohebi12') {
				move.name = 'Death Power';
				move.self.boosts = {atk: 6, spe: -6, def: -1, spd: -1, evasion: -1};
			}
		}
	},

	// Suspect Tests.
	///////////////////////////////////////////
	{
		name: "Startermons (suspect test)",
		section: "Regional Metagames (test)",
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
		banlist: ['LC Uber', 'LC UU', 'Sonic Boom', 'Swagger', 'Eviolite', 'Dragon Claw'],
		validateSet: function (set) {
			const allowedPokes = ['Sunkern', 'Azurill', 'Kriketot', 'Wurmple', 'Weedle', 'Caterpie', 'Ralts', 'Scatterbug', 'Magikarp',
				'Feebas', 'Silcoon', 'Pichu', 'Metapod', 'Kakuna', 'Cascoon', 'Wooper', 'Tyrouge', 'Igglybuff', 'Spewpa', 'Sentret',
				'Cleffa', 'Seedot', 'Poochyena', 'Lotad', 'Happiny', 'Burmy', 'Makuhita', 'Zizagoon', 'Whismur', 'Combee', 'Zubat',
				'Togepi', 'Starly', 'Swinub', 'Spinarak', 'Slugma'
			];
			if (allowedPokes.indexOf(set.species) === -1) return [set.species + " is not allowed for 1% tier."];
		}
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
