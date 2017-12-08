
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

export let businessName = () => {
	return 'K-Mart';
}
