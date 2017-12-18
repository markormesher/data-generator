const uuid = require('uuid');
const random = require('random-world');

const express = require('express');
const app = express();

const repeat = (func, count) => {
	if (count < 0) {
		return;
	}
	for (let i = 0; i < count; ++i) {
		func();
	}
};

const randomIntBetween = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
};

const getData = (type) => {
	const typeChunks = type.split('+');
	type = typeChunks[0];
	const args = typeChunks.slice(1);

	switch (type) {
		case 'int':
			return randomIntBetween((args[0] || 1), (args[1] || 100));

		case 'uuid':
			return uuid.v4();

		case 'title':
			return random.title();

		case 'email':
			return random.email();

		case 'fullname':
			return random.fullname();

		case 'firstname':
			return random.firstname();

		case 'lastname':
			return random.lastname();

		case 'city':
			return random.city();

		case 'country':
			return random.country().replace(/,/g, '');

		case 'countrycode':
			return random.countrycode();

		case 'lat':
			return random.lat();

		case 'long':
			return random.long();

		case 'domain':
			return random.domain();

		case 'ip':
			return random.ip();

		case 'ipv6':
			return random.ipv6();

		case 'bool':
			return random.boolean();

		case 'ccnumber':
			return random.ccnumber();

		case 'ccstart':
			return random.ccstart();

		case 'ccexpiry':
			return random.ccexpiry();

		case 'cctype':
			return random.cctype();

		case 'cvv':
			return random.cvv();

		case 'word':
			return random.word();

		case 'sentence':
			return random.sentence().replace(/,/g, '');

		case 'date':
			return random.date({
				start: args[0] || '2007-01-01',
				end: args[1] || '2027-12-31'
			});

		default:
			return null;
	}

	return output;
};

app.get('/data/:types', (req, res) => {
	const count = req.query.count || 100;
	if (count < 0) {
		count = 1;
	}
	if (count > 1000000) {
		count = 1000000
	}
	const types = (req.params.types || 'numbers').split(',');

	const outputs = [];
	for (let i = 0; i < types.length; ++i) {
		outputs.push([]);
		for (let j = 0; j < count; ++j) {
			outputs[i].push(getData(types[i]));
		}
	}

	let output = '';
	for (let i = 0; i < count; ++i) {
		for (let j = 0; j < outputs.length; ++j) {
			output += outputs[j][i];
			if (j != outputs.length - 1) {
				output += ',';
			}
		}
		if (i != count - 1) {
			output += '\n';
		}
	}

	res.send(output, 200);
});

app.listen(3007, () => { console.log('Listening on 3007'); })
