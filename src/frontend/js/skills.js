import inViewport from 'in-viewport';

const EasyPieChart = require('exports-loader?EasyPieChart!easypiechart');

const chartContainer = document.querySelector('[data-chart-container]');
const easyPieChartItems = document.querySelectorAll('[data-easy-pie-chart]');

const inViewportOptions = {
	offset: -0.3 * document.documentElement.clientHeight,
};

inViewport(chartContainer, inViewportOptions, () => {
	easyPieChartItems.forEach((chart) => {
		EasyPieChart(chart, {
			size: 140,
			animate: 2000,
			lineCap: 'butt',
			scaleColor: false,
			barColor: '#F0DB4F',
			trackColor: 'transparent',
			lineWidth: 10,
		});
	});
});
