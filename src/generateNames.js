
let pick1 = (list) => {
	return list[(Math.random() * list.length) | 0];
}

let names = ["Pruliaa", "Miiirilid", "Herree", "Chitoi", "Deredrd", "Aaaort", "Nitnis", "Aloora", "Cerreleaa", "Chhzzu", "Aradey", "Rarear", "Jnnn", "Mannie", "Seeleere", "Auntt", "Foro", "Tstilit", "Lorra", "Hhrsrrrrrr", "Seina", "Suttttuuyy", "Rusert", "P", "Sauenta", "Ralieh", "Siil", "Cyoee", "Halden", "Eddelaa"];

let streetNames = [
	"Park Ave",
	"1st St",
	"Union St",
	"Greene Ave",
	"Jackson Ave",
	"Pennsylvania Blvd",
	"Benefit St",
	"Cash Ave",
	"Power St",
	"Brown St"
]

export let personName = () => {
	return pick1(names) + ' ' + pick1(names);
}

export let apartmentName = () => {
	return ((Math.random() * 1200) | 0) + ' ' + pick1(streetNames);
}

let nameGen = (options) => {
	let picked = pick1(options);
	if (typeof(picked) === 'string') return picked;
	return picked.map((p) => {
		if (typeof(p) === 'function') {
			return nameGen(p());
		} else {
			return p;
		}
	}).join('');
}


export let businessName = () => {
	let letters = () => {
		return ['A', 'B', 'K', 'H', 'Z'];
	}
	let specialty = () => {
		return [
			'Party',
			'Shoe',
			'Food',
			'Knicknack',
			'Pet',
			'Beer',
			'Dance',
			'Barber',
			'Book'
		];
	}
	let names = () => {
		return [
			"Mike's",
			"Tom's",
			"Stacy's",
			"Joe's",
			"Pat's",
			"Chen's",
			"Willy's"
		]
	}
	let things = () => {
		return [
			"Calzones",
			"Pizza",
			"Chowder",
			"Guns",
			"Market",
			"Books",
			"Coffee"
		]
	};
	let suffix = () => {
		return [
			'-Mart',
			' City',
			'Zone',
			' Haus',
			' Shack',
			' Center'
		]
	}
	let bizOptions = [
		[letters, '-Mart'],
		[specialty, suffix],
		[names, ' ', things],
		[things, ' and ', things],
		[things, suffix]
	];
	return nameGen(bizOptions);
}
