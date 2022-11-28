import _ from 'lodash';

export const getSum = (transactions, type) => {
	let sum = _(transactions)
		.groupBy('category')
		.map((objs, key) => {
			if (!type) return _.sumBy(objs, 'amount');
			return {
				category : key,
				color    : objs[0].color,
				total    : _.sumBy(objs, 'amount')
			};
		})
		.value();

	return sum;
};

export const getTotal = (transactions) => _.sum(getSum(transactions));

export const getLabels = (transactions) => {
	let amountSum = getSum(transactions, 'category');

	let total = getTotal(transactions);

	let percent = _(amountSum)
		.map((objs) =>
			_.assign(objs, { percent: Math.round(100 * objs.total / total) })
		)
		.value();
	return percent;
};

export const getChart = (transaction, custom) => {
	let bg = _.map(transaction, (a) => a.color);
	bg = _.uniq(bg);
	let dataValue = getSum(transaction);

	const config = {
		data    : {
			datasets : [
				{
					data            : dataValue,
					backgroundColor : bg,
					hoverOffset     : 4,
					borderRadius    : 30,
					spacing         : 15
				}
			]
		},
		options : {
			cutout : 115
		}
	};

	return custom??config
};
