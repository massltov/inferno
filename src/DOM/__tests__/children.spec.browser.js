import { render } from '../rendering';

var staticNode = {
	tag: null,
	pools: {
		keyed: [],
		nonKeyed: []
	}
};

describe('Children - (non-JSX)', () => {

	let container;

	beforeEach(function () {
		container = document.createElement('div');
	});

	afterEach(function () {
		container.innerHTML = '';
	});

	const preDefined = [{
		name: 'undefined',
		value: undefined,
		expected: ''
	}, {
		name: 'null',
		value: null,
		expected: ''
	}, {
		name: 'one whitespace',
		value: ' ',
		expected: ' '
	}, {
		name: 'whitespace to left',
		value: 'a ',
		expected: 'a '
	}, {
		name: 'whitespace to right',
		value: ' a',
		expected: ' a'
	}, {
		name: 'should set children as empty string',
		value: '',
		expected: ''
	}, {
		name: 'should create a div with text, children property',
		value: 'string',
		expected: 'string'
	}, {
		name: '0',
		value: 0,
		expected: '0'
	}, {
		name: '0 (cast to string)',
		value: '0',
		expected: '0'
	}, {
		name: 'negative number',
		value: -44444,
		expected: '-44444'
	}, {
		name: 'negative number (cast to string)',
		value: '-2344',
		expected: '-2344'
	}, {
		name: 'NaN',
		value: NaN,
		expected: 'NaN'
	}, {
		name: 'empty array',
		value: [],
		expected: ''
	}, {
		name: 'simple math',
		value: 123 - 33,
		expected: '90'
	}, {
		name: 'advanced math',
		value: 123 - 33 / 4 - 444 * 345,
		expected: '-153065.25'
	}, {
		name: 'number array',
		value: [ 1, 2, 3 ],
		expected: '123'
	}, {
		name: 'number array (long array)',
		value: [ 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3 ],
		expected: '123123123123'
	}, {
		name: 'number array (long mixed array)',
		value: [ 1, '2', 3, '1', 2, 3, '1', 2, 3, 1, 2, '3' ],
		expected: '123123123123'
	}, {
		name: 'number array (long mixed array) and undefined and empty string',
		value: [ 1, '2', '', '1', 2, 3, '1', 2, undefined, 1, 2, '3' ],
		expected: '1212312123'
	}, {
		name: 'number array (cast to string)',
		value: [ '1', '2', '3' ],
		expected: '123'
	}, {
		name: 'number array (cast to string) and various whitespaces',
		value: [ ' 1 ', '2', '3  ' ],
		expected: ' 1 23  '
	}, {
		name: 'single undefined in an array',
		value: [ 1, 2, undefined ],
		expected: '12'
	}, {
		name: 'undefined in the middle of an array',
		value: [ 1, undefined, 3 ],
		expected: '13'
	}, {
		name: 'dobule undefined in an array',
		value: [ 1, undefined, undefined ],
		expected: '1'
	}, {
		name: 'triple undefined in an array',
		value: [ undefined, undefined, undefined ],
		expected: ''
	}, {
		name: 'triple empty string in an array',
		value: [ '', '', '' ],
		expected: ''
	}, {
		name: 'triple null in an array',
		value: [ null, null, null ],
		expected: ''
	}, {
		name: 'single null in an array',
		value: [null],
		expected: ''
	}, {
		name: 'single null in an array',
		value: ['{}'],
		expected: '{}'
	}, {
		name: 'mix of null and undefined in an array',
		value: [ null, undefined ],
		expected: ''
	}, {
		name: 'mix of null, undefined and empty string in an array',
		value: [ null, undefined, '' ],
		expected: ''
	}, {
		name: 'mix of null, undefined and a number in an array',
		value: [ null, undefined, 123 ],
		expected: '123'
	}, {
		name: 'mix of null, undefined and a number in an array',
		value: [ null, undefined, 123, ' ', undefined, null, undefined ],
		expected: '123 '
	}, {
		name: 'single empty string in an array',
		value: [ 1, 2, '' ],
		expected: '12'
	}, {
		name: 'dobule empty string in an array',
		value: [ 1, '', '' ],
		expected: '1'
	}, {
		name: 'triple empty string in an array',
		value: [ '', '', '' ],
		expected: ''
	}, {
		name: 'cast to string value, + single number in an array',
		value: [ '1', 2, 3 ],
		expected: '123'
	}, {
		name: 'cast to strng value, + single number + a letter in an array',
		value: [ '1', 2, 'a' ],
		expected: '12a'
	}, {
		name: 'cast to strng value, + single number + a letter in an array',
		value: [ '1', null, 'a' ],
		expected: '1a'
	}, {
		name: 'cast to strng value, + single number + a letter in an array',
		value: [ undefined, null, 'a' ],
		expected: 'a'
	}, {
		name: 'cast to strng value, + single number + a letter in an array',
		value: [ undefined, null, 123, undefined, null ],
		expected: '123'
	}
];

	preDefined.forEach((arg) => {

		[{
			description: 'should set static children as ' + arg.name,
			template: () => ({
				tpl: staticNode,
				tag: 'div',
				children: arg.value
			})
		}].forEach((test) => {

			it(test.description, () => {

				render(test.template(), container);
				expect(container.firstChild.nodeType).to.equal(1);
				expect(container.firstChild.textContent).to.equal(arg.expected);
				render(test.template(), container);
				expect(container.firstChild.nodeType).to.equal(1);
				expect(container.firstChild.textContent).to.equal(arg.expected);
			});
		});
	});

	preDefined.forEach((arg) => {

		[{
			description: 'should set static deep children as ' + arg.name,
			template: () => ({
				tpl: staticNode,
				tag: 'div',
				children: {
					tpl: staticNode,
					tag: 'span',
					children: arg.value
				}
			})
		}].forEach((test) => {

			it(test.description, () => {

				render(test.template(), container);
				expect(container.firstChild.nodeType).to.equal(1);
				expect(container.firstChild.firstChild.nodeType).to.equal(1);
				expect(container.firstChild.childNodes.length).to.equal(1);
				expect(container.firstChild.firstChild.textContent).to.equal(arg.expected);
				render(test.template(), container);
				expect(container.firstChild.nodeType).to.equal(1);
				expect(container.firstChild.firstChild.nodeType).to.equal(1);
				expect(container.firstChild.childNodes.length).to.equal(1);
				expect(container.firstChild.firstChild.textContent).to.equal(arg.expected);

			});
		});
	});

	preDefined.forEach((arg) => {

		[{
			description: 'should set very deep static children as ' + arg.name,
			template: () => ({
				tpl: staticNode,
				tag: 'div',
				children: {
					tpl: staticNode,
					tag: 'span',
					children: {
						tpl: staticNode,
						tag: 'b',
						children: {
							tpl: staticNode,
							tag: 'b',
							children: arg.value
						}
					}
				}
			})
		}].forEach((test) => {

			it(test.description, () => {

				render(test.template(), container);
				expect(container.firstChild.nodeType).to.equal(1);
				expect(container.firstChild.firstChild.nodeType).to.equal(1);
				expect(container.firstChild.childNodes.length).to.equal(1);
				expect(container.firstChild.firstChild.textContent).to.equal(arg.expected);
				render(test.template(), container);
				expect(container.firstChild.nodeType).to.equal(1);
				expect(container.firstChild.firstChild.nodeType).to.equal(1);
				expect(container.firstChild.childNodes.length).to.equal(1);
				expect(container.firstChild.firstChild.textContent).to.equal(arg.expected);

			});
		});
	});

	preDefined.forEach((arg) => {

		[{
			description: 'should set dynamic children as ' + arg.name,

			template: (child) => ({
				tpl: staticNode,
				tag: 'div',
				children: child
			})
		}].forEach((test) => {

			it(test.description, () => {

				render(test.template(arg.value), container);
				expect(container.firstChild.nodeType).to.equal(1);
				expect(container.firstChild.textContent).to.equal(arg.expected);
				render(test.template(arg.value), container);
				expect(container.firstChild.nodeType).to.equal(1);
				expect(container.firstChild.textContent).to.equal(arg.expected);
				render(test.template(), container);
				expect(container.firstChild.nodeType).to.equal(1);
				expect(container.firstChild.textContent).to.equal('');
				render(test.template(arg.value), container);
				expect(container.firstChild.nodeType).to.equal(1);
				expect(container.firstChild.textContent).to.equal(arg.expected);

			});

			it(test.description, () => {

				render(test.template(), container);
				expect(container.firstChild.nodeType).to.equal(1);
				expect(container.firstChild.textContent).to.equal('');
				render(test.template(arg.value), container);
				expect(container.firstChild.nodeType).to.equal(1);
				expect(container.firstChild.textContent).to.equal(arg.expected);
			});

			it(test.description, () => {

				render(test.template(null), container);
				expect(container.firstChild.nodeType).to.equal(1);
				expect(container.firstChild.textContent).to.equal('');
				render(test.template(arg.value), container);
				expect(container.firstChild.nodeType).to.equal(1);
				expect(container.firstChild.textContent).to.equal(arg.expected);
			});

			it(test.description, () => {

				render(test.template(arg.value), container);
				expect(container.firstChild.nodeType).to.equal(1);
				expect(container.firstChild.textContent).to.equal(arg.expected);
				render(test.template(null), container);
				expect(container.firstChild.nodeType).to.equal(1);
				expect(container.firstChild.textContent).to.equal('');
			});

			it(test.description, () => {

				render(test.template(), container);
				expect(container.firstChild.nodeType).to.equal(1);
				expect(container.firstChild.textContent).to.equal('');
				render(test.template(undefined), container);
				expect(container.firstChild.nodeType).to.equal(1);
				expect(container.firstChild.textContent).to.equal('');

			});

			it(test.description, () => {

				render(test.template(null), container);
				expect(container.firstChild.nodeType).to.equal(1);
				expect(container.firstChild.textContent).to.equal('');
				render(test.template(null), container);
				expect(container.firstChild.nodeType).to.equal(1);
				expect(container.firstChild.textContent).to.equal('');

			});

		});
	});

	preDefined.forEach((arg) => {

		[{
			description: 'should set deep dynamic children as ' + arg.name,
			template: (child) => ({
				tpl: staticNode,
				tag: 'div',
				children: {
					tpl: staticNode,
					tag: 'b',
					children: child
				}
			})
		}].forEach((test) => {

			it(test.description, () => {

				render(test.template(arg.value), container);
				expect(container.firstChild.firstChild.nodeType).to.equal(1);
				expect(container.firstChild.firstChild.textContent).to.equal(arg.expected);
				render(test.template(arg.value), container);
				expect(container.firstChild.firstChild.nodeType).to.equal(1);
				expect(container.firstChild.firstChild.textContent).to.equal(arg.expected);
				render(test.template(null), container);
				expect(container.firstChild.firstChild.nodeType).to.equal(1);
				expect(container.firstChild.firstChild.textContent).to.equal('');
				render(test.template(undefined), container);
				expect(container.firstChild.firstChild.nodeType).to.equal(1);
				expect(container.firstChild.firstChild.textContent).to.equal('');
				render(test.template(), container);
				expect(container.firstChild.firstChild.nodeType).to.equal(1);
				expect(container.firstChild.firstChild.textContent).to.equal('');
			});
		});
	});

	describe('keyed - children', function () {
		let container;

		beforeEach(() => {
			container = document.createElement('div');
			document.body.appendChild(container);
		});

		afterEach(() => {
			document.body.removeChild(container);
			container.innerHTML = '';
		});

		it('Should push to correct location when it keyed list has siblings', function() {
			var tabs = [{title:"Item A"}, {title:"Item B"}];
			function Tab({title, onSelect, key, id}) {
				return (
					<div
						id = {id}
						key = {key}
						onClick = {onSelect}>
						{title}
					</div>
				)
			}

			function TabGroup({ tabs }) {
				function create() {
					tabs.push({title: "New " + tabs.length});
					renderIt();
				}
				return (
					<div class="tab-group">{tabs.map((tab, i) => (
						<Tab
							key      = { "Item " + i }
							title    = { tab.title }
							onSelect = { ()=>undefined }/>
					))}
						<Tab onSelect={create} id="add" title="Add"/>
					</div>
				);
			}

			function renderIt() {
				render(<TabGroup tabs={tabs}></TabGroup>, container);
			}

			renderIt();

			expect(container.innerHTML).to.equal('<div class="tab-group"><div>Item A</div><div>Item B</div><div id="add">Add</div></div>');
			const addTab = container.querySelector('#add');
			addTab.click();
			expect(container.innerHTML).to.equal('<div class="tab-group"><div>Item A</div><div>Item B</div><div>New 2</div><div id="add">Add</div></div>');
			addTab.click();
			expect(container.innerHTML).to.equal('<div class="tab-group"><div>Item A</div><div>Item B</div><div>New 2</div><div>New 3</div><div id="add">Add</div></div>');
			addTab.click();
			expect(container.innerHTML).to.equal('<div class="tab-group"><div>Item A</div><div>Item B</div><div>New 2</div><div>New 3</div><div>New 4</div><div id="add">Add</div></div>');
			addTab.click();
			expect(container.innerHTML).to.equal('<div class="tab-group"><div>Item A</div><div>Item B</div><div>New 2</div><div>New 3</div><div>New 4</div><div>New 5</div><div id="add">Add</div></div>');
		});

		it('Should append child node to correct location when its empty at the beginning ', function() {
			var tabs = [];
			function Tab({title, onSelect, key, id}) {
				return (
					<div
						id = {id}
						key = {key}
						onClick = {onSelect}>
						{title}
					</div>
				)
			}

			function TabGroup({ tabs }) {
				function create() {
					tabs.push({title: "New " + tabs.length});
					renderIt();
				}
				return (
					<div class="tab-group">{tabs.map((tab, i) => (
						<Tab
							key      = { "Item " + i }
							title    = { tab.title }
							onSelect = { ()=>undefined }/>
					))}
						<Tab onSelect={create} id="add" title="Add"/>
					</div>
				);
			}

			function renderIt() {
				render(<TabGroup tabs={tabs}></TabGroup>, container);
			}

			renderIt();
			expect(container.innerHTML).to.equal('<div class="tab-group"><div id="add">Add</div></div>');
			const addTab = container.querySelector('#add');
			addTab.click();
			expect(container.innerHTML).to.equal('<div class="tab-group"><div>New 0</div><div id="add">Add</div></div>');
			addTab.click();
			expect(container.innerHTML).to.equal('<div class="tab-group"><div>New 0</div><div>New 1</div><div id="add">Add</div></div>');
		});

		it('Should append child node to correct location when its empty at the beginning ', function() {
			var tabs = [];
			function Tab({title, onSelect, key, id}) {
				return (
					<div
						id = {id}
						key = {key}
						onClick = {onSelect}>
						{title}
					</div>
				)
			}

			function TabGroup({ tabs }) {
				function create() {
					tabs.push({title: "New " + tabs.length});
					renderIt();
				}
				return (
					<div class="tab-group">
						<Tab onSelect={create} id="add" title="Add"/>{tabs.map((tab, i) => (
						<Tab
							key      = { "Item " + i }
							title    = { tab.title }
							onSelect = { ()=>undefined }/>
					))}
					</div>
				);
			}

			function renderIt() {
				render(<TabGroup tabs={tabs}></TabGroup>, container);
			}

			renderIt();

			expect(container.innerHTML).to.equal('<div class="tab-group"><div id="add">Add</div></div>');
			const addTab = container.querySelector('#add');
			addTab.click();
			expect(container.innerHTML).to.equal('<div class="tab-group"><div id="add">Add</div><div>New 0</div></div>');
			addTab.click();
			expect(container.innerHTML).to.equal('<div class="tab-group"><div id="add">Add</div><div>New 0</div><div>New 1</div></div>');
		});

		it('Should append child node to correct location when its empty at the beginning ', function() {
			var tabs = [];
			function Tab({title, onSelect, key, id}) {
				return (
					<div
						id = {id}
						key = {key}
						onClick = {onSelect}>
						{title}
					</div>
				)
			}

			function TabGroup({ tabs }) {
				function create() {
					tabs.push({title: "New " + tabs.length});
					renderIt();
				}
				return (
					<div class="tab-group">{tabs.map((tab, i) => (
						<Tab
							key      = { "Item " + i }
							title    = { tab.title }
							onSelect = { ()=>undefined }/>
					))}
						<Tab onSelect={create} id="add" title="Add"/>{tabs.map((tab, i) => (
						<Tab
							key      = { "Item " + i }
							title    = { tab.title }
							onSelect = { ()=>undefined }/>
					))}
					</div>
				);
			}

			function renderIt() {
				render(<TabGroup tabs={tabs}></TabGroup>, container);
			}

			renderIt();

			expect(container.innerHTML).to.equal('<div class="tab-group"><div id="add">Add</div></div>');
			const addTab = container.querySelector('#add');
			addTab.click();
			expect(container.innerHTML).to.equal('<div class="tab-group"><div>New 0</div><div id="add">Add</div><div>New 0</div></div>');
			addTab.click();
			expect(container.innerHTML).to.equal('<div class="tab-group"><div>New 0</div><div>New 1</div><div id="add">Add</div><div>New 0</div><div>New 1</div></div>');
		});

		it('Should appendx3 to correct location when it keyed list has siblings', function() {
			var tabs = [{title:"Item A"}, {title:"Item B"}];
			function Tab({title, onSelect, key, id}) {
				return (
					<div
						id = {id}
						key = {key}
						onClick = {onSelect}>
						{title}
					</div>
				)
			}

			function TabGroup({ tabs }) {
				function create() {
					tabs.push({title: "New " + tabs.length});
					tabs.push({title: "New " + tabs.length});
					tabs.push({title: "New " + tabs.length});
					renderIt();
				}
				return (
					<div class="tab-group">{tabs.map((tab, i) => (
						<Tab
							key      = { "Item " + i }
							title    = { tab.title }
							onSelect = { ()=>undefined }/>
					))}
						<Tab onSelect={create} id="add" title="Add"/>
					</div>
				);
			}

			function renderIt() {
				render(<TabGroup tabs={tabs}></TabGroup>, container);
			}

			renderIt();

			expect(container.innerHTML).to.equal('<div class="tab-group"><div>Item A</div><div>Item B</div><div id="add">Add</div></div>');
			const addTab = container.querySelector('#add');
			addTab.click();
			expect(container.innerHTML).to.equal('<div class="tab-group"><div>Item A</div><div>Item B</div><div>New 2</div><div>New 3</div><div>New 4</div><div id="add">Add</div></div>');
		});

		it('Should unshiftx3 to correct location when it keyed list has siblings', function() {
			var tabs = [{title:"Item A"}, {title:"Item B"}];
			function Tab({title, onSelect, key, id}) {
				return (
					<div
						id = {id}
						key = {key}
						onClick = {onSelect}>
						{title}
					</div>
				)
			}

			function TabGroup({ tabs }) {
				function create() {
					tabs.unshift({title: "New " + tabs.length});
					tabs.unshift({title: "New " + tabs.length});
					tabs.unshift({title: "New " + tabs.length});
					renderIt();
				}
				return (
					<div class="tab-group">{tabs.map((tab, i) => (
						<Tab
							key      = { "Item " + i }
							title    = { tab.title }
							onSelect = { ()=>undefined }/>
					))}
						<Tab onSelect={create} id="add" title="Add"/>
					</div>
				);
			}

			function renderIt() {
				render(<TabGroup tabs={tabs}></TabGroup>, container);
			}

			renderIt();

			expect(container.innerHTML).to.equal('<div class="tab-group"><div>Item A</div><div>Item B</div><div id="add">Add</div></div>');
			const addTab = container.querySelector('#add');
			addTab.click();
			expect(container.innerHTML).to.equal('<div class="tab-group"><div>New 4</div><div>New 3</div><div>New 2</div><div>Item A</div><div>Item B</div><div id="add">Add</div></div>');
		});

		it('Inline text element before array list', function() {
			var tabs = [];
			function Tab({title, onSelect, key, id}) {
				return (
					<div key = {key}>
						{title}
					</div>
				)
			}

			function TabGroup({ tabs }) {
				return (
					<div class="tab-group">inlineText{tabs.map((tab, i) => (
						<Tab
							key      = { "Item " + i }
							title    = { tab.title } />
					))}
					</div>
				);
			}

			function renderIt() {
				render(<TabGroup tabs={tabs}></TabGroup>, container);
			}

			renderIt();

			expect(container.innerHTML).to.equal('<div class="tab-group">inlineText</div>');

			tabs.push({title: "New " + tabs.length});
			renderIt();

			expect(container.innerHTML).to.equal('<div class="tab-group">inlineText<div>New 0</div></div>');
		});

		it('Inline text element after array list', function() {
			var tabs = [];
			function Tab({title, onSelect, key, id}) {
				return (
					<div key = {key}>
						{title}
					</div>
				)
			}

			function TabGroup({ tabs }) {
				return (
					<div class="tab-group">{tabs.map((tab, i) => (
						<Tab
							key      = { "Item " + i }
							title    = { tab.title } />
					))}inlineText
					</div>
				);
			}

			function renderIt() {
				render(<TabGroup tabs={tabs}></TabGroup>, container);
			}

			renderIt();

			expect(container.innerHTML).to.equal('<div class="tab-group">inlineText</div>');

			tabs.push({title: "New " + tabs.length});
			renderIt();

			expect(container.innerHTML).to.equal('<div class="tab-group"><div>New 0</div>inlineText</div>');
		});
	});

	describe('nonKeyed - children', function () {
		let container;

		beforeEach(() => {
			container = document.createElement('div');
			document.body.appendChild(container);
		});

		afterEach(() => {
			document.body.removeChild(container);
			container.innerHTML = '';
		});

		it('Should push to correct location when it keyed list has siblings', function () {
			var tabs = [{title: "Item A"}, {title: "Item B"}];

			function Tab({title, onSelect, key, id}) {
				return (
					<div
						id={id}
						onClick={onSelect}>
						{title}
					</div>
				)
			}

			function TabGroup({tabs}) {
				function create() {
					tabs.push({title: "New " + tabs.length});
					renderIt();
				}

				return (
					<div class="tab-group">{tabs.map((tab, i) => (
						<Tab
							title={ tab.title }
							onSelect={ ()=>undefined }/>
					))}
						<Tab onSelect={create} id="add" title="Add"/>
					</div>
				);
			}

			function renderIt() {
				render(<TabGroup tabs={tabs}></TabGroup>, container);
			}

			renderIt();

			expect(container.innerHTML).to.equal('<div class="tab-group"><div>Item A</div><div>Item B</div><div id="add">Add</div></div>');
			const addTab = container.querySelector('#add');
			addTab.click();
			expect(container.innerHTML).to.equal('<div class="tab-group"><div>Item A</div><div>Item B</div><div>New 2</div><div id="add">Add</div></div>');
			addTab.click();
			expect(container.innerHTML).to.equal('<div class="tab-group"><div>Item A</div><div>Item B</div><div>New 2</div><div>New 3</div><div id="add">Add</div></div>');
			addTab.click();
			expect(container.innerHTML).to.equal('<div class="tab-group"><div>Item A</div><div>Item B</div><div>New 2</div><div>New 3</div><div>New 4</div><div id="add">Add</div></div>');
			addTab.click();
			expect(container.innerHTML).to.equal('<div class="tab-group"><div>Item A</div><div>Item B</div><div>New 2</div><div>New 3</div><div>New 4</div><div>New 5</div><div id="add">Add</div></div>');
		});

		it('Should append child node to correct location when its empty at the beginning ', function () {
			var tabs = [];

			function Tab({title, onSelect, id}) {
				return (
					<div
						id={id}
						onClick={onSelect}>
						{title}
					</div>
				)
			}

			function TabGroup({tabs}) {
				function create() {
					tabs.push({title: "New " + tabs.length});
					renderIt();
				}

				return (
					<div class="tab-group">{tabs.map((tab, i) => (
						<Tab
							title={ tab.title }
							onSelect={ ()=>undefined }/>
					))}
						<Tab onSelect={create} id="add" title="Add"/>
					</div>
				);
			}

			function renderIt() {
				render(<TabGroup tabs={tabs}></TabGroup>, container);
			}


			renderIt();
			expect(container.innerHTML).to.equal('<div class="tab-group"><div id="add">Add</div></div>');
			const addTab = container.querySelector('#add');
			addTab.click();
			expect(container.innerHTML).to.equal('<div class="tab-group"><div>New 0</div><div id="add">Add</div></div>');
			addTab.click();
			expect(container.innerHTML).to.equal('<div class="tab-group"><div>New 0</div><div>New 1</div><div id="add">Add</div></div>');
		});

		it('Should append child node to correct location when its empty at the beginning ', function () {
			var tabs = [];

			function Tab({title, onSelect, id}) {
				return (
					<div
						id={id}
						onClick={onSelect}>
						{title}
					</div>
				)
			}

			function TabGroup({tabs}) {
				function create() {
					tabs.push({title: "New " + tabs.length});
					renderIt();
				}

				return (
					<div class="tab-group">
						<Tab onSelect={create} id="add" title="Add"/>{tabs.map((tab, i) => (
						<Tab
							title={ tab.title }
							onSelect={ ()=>undefined }/>
					))}
					</div>
				);
			}

			function renderIt() {
				render(<TabGroup tabs={tabs}></TabGroup>, container);
			}

			renderIt();

			expect(container.innerHTML).to.equal('<div class="tab-group"><div id="add">Add</div></div>');
			const addTab = container.querySelector('#add');
			addTab.click();
			expect(container.innerHTML).to.equal('<div class="tab-group"><div id="add">Add</div><div>New 0</div></div>');
			addTab.click();
			expect(container.innerHTML).to.equal('<div class="tab-group"><div id="add">Add</div><div>New 0</div><div>New 1</div></div>');
		});

		it('Should append child node to correct location when its empty at the beginning ', function () {
			var tabs = [];

			function Tab({title, onSelect, id}) {
				return (
					<div
						id={id}
						onClick={onSelect}>
						{title}
					</div>
				)
			}

			function TabGroup({tabs}) {
				function create() {
					tabs.push({title: "New " + tabs.length});
					renderIt();
				}

				return (
					<div class="tab-group">{tabs.map((tab, i) => (
						<Tab
							title={ tab.title }
							onSelect={ ()=>undefined }/>
					))}
						<Tab onSelect={create} id="add" title="Add"/>{tabs.map((tab, i) => (
							<Tab
								title={ tab.title }
								onSelect={ ()=>undefined }/>
						))}
					</div>
				);
			}

			function renderIt() {
				render(<TabGroup tabs={tabs}></TabGroup>, container);
			}

			renderIt();

			expect(container.innerHTML).to.equal('<div class="tab-group"><div id="add">Add</div></div>');
			const addTab = container.querySelector('#add');
			addTab.click();
			expect(container.innerHTML).to.equal('<div class="tab-group"><div>New 0</div><div id="add">Add</div><div>New 0</div></div>');
			addTab.click();
			expect(container.innerHTML).to.equal('<div class="tab-group"><div>New 0</div><div>New 1</div><div id="add">Add</div><div>New 0</div><div>New 1</div></div>');
		});

		it('Should appendx3 to correct location when it list has siblings', function () {
			var tabs = [{title: "Item A"}, {title: "Item B"}];

			function Tab({title, onSelect, key, id}) {
				return (
					<div
						id={id}
						onClick={onSelect}>
						{title}
					</div>
				)
			}

			function TabGroup({tabs}) {
				function create() {
					tabs.push({title: "New " + tabs.length});
					tabs.push({title: "New " + tabs.length});
					tabs.push({title: "New " + tabs.length});
					renderIt();
				}

				return (
					<div class="tab-group">{tabs.map((tab, i) => (
						<Tab
							title={ tab.title }
							onSelect={ ()=>undefined }/>
					))}
						<Tab onSelect={create} id="add" title="Add"/>
					</div>
				);
			}

			function renderIt() {
				render(<TabGroup tabs={tabs}></TabGroup>, container);
			}

			renderIt();

			expect(container.innerHTML).to.equal('<div class="tab-group"><div>Item A</div><div>Item B</div><div id="add">Add</div></div>');
			const addTab = container.querySelector('#add');
			addTab.click();
			expect(container.innerHTML).to.equal('<div class="tab-group"><div>Item A</div><div>Item B</div><div>New 2</div><div>New 3</div><div>New 4</div><div id="add">Add</div></div>');
		});

		it('Should unshiftx3 to correct location when it list has siblings', function () {
			var tabs = [{title: "Item A"}, {title: "Item B"}];

			function Tab({title, onSelect, key, id}) {
				return (
					<div
						id={id}
						onClick={onSelect}>
						{title}
					</div>
				)
			}

			function TabGroup({tabs}) {
				function create() {
					tabs.unshift({title: "New " + tabs.length});
					tabs.unshift({title: "New " + tabs.length});
					tabs.unshift({title: "New " + tabs.length});
					renderIt();
				}

				return (
					<div class="tab-group">{tabs.map((tab, i) => (
						<Tab
							title={ tab.title }
							onSelect={ ()=>undefined }/>
					))}
						<Tab onSelect={create} id="add" title="Add"/>
					</div>
				);
			}

			function renderIt() {
				render(<TabGroup tabs={tabs}></TabGroup>, container);
			}

			renderIt();

			expect(container.innerHTML).to.equal('<div class="tab-group"><div>Item A</div><div>Item B</div><div id="add">Add</div></div>');
			const addTab = container.querySelector('#add');
			addTab.click();
			expect(container.innerHTML).to.equal('<div class="tab-group"><div>New 4</div><div>New 3</div><div>New 2</div><div>Item A</div><div>Item B</div><div id="add">Add</div></div>');
		});

		it('Inline text element before array list', function () {
			var tabs = [];

			function Tab({title, onSelect, id}) {
				return (
					<div>
						{title}
					</div>
				)
			}

			function TabGroup({tabs}) {
				return (
					<div class="tab-group">inlineText{tabs.map((tab, i) => (
						<Tab
							title={ tab.title }/>
					))}
					</div>
				);
			}

			function renderIt() {
				render(<TabGroup tabs={tabs}></TabGroup>, container);
			}

			renderIt();

			expect(container.innerHTML).to.equal('<div class="tab-group">inlineText</div>');

			tabs.push({title: "New " + tabs.length});
			renderIt();

			expect(container.innerHTML).to.equal('<div class="tab-group">inlineText<div>New 0</div></div>');
		});

		it('Inline text element after array list', function () {
			var tabs = [];

			function Tab({title, onSelect, id}) {
				return (
					<div>
						{title}
					</div>
				)
			}

			function TabGroup({tabs}) {
				return (
					<div class="tab-group">{tabs.map((tab, i) => (
						<Tab
							title={ tab.title }/>
					))}inlineText
					</div>
				);
			}

			function renderIt() {
				render(<TabGroup tabs={tabs}></TabGroup>, container);
			}

			renderIt();

			expect(container.innerHTML).to.equal('<div class="tab-group">inlineText</div>');

			tabs.push({title: "New " + tabs.length});
			renderIt();

			expect(container.innerHTML).to.equal('<div class="tab-group"><div>New 0</div>inlineText</div>');
		});
	});

	describe('mixed children edge cases', function () {
		it('NONKEYED - should remove children from correct location when there is dynamic static item', function() {
			var items = ['a','b','c'];
			var emptyArray = [];
			var items3 = ['v', 'a'];
			var visible = false;


			var activeOne;

			function Loop({text}) {
				return (
					<p>
						{text}
					</p>
				)
			}

			function Looper({collectionOne, visibleStatic}) {
				return (
					<div class="c">
						{visibleStatic ? <Loop text="static"/> : null}
						{collectionOne.map((text) => (
							<Loop
								text={ text }/>
						))}
					</div>
				);
			}

			function renderIt() {
				render(<Looper collectionOne={activeOne} visibleStatic={visible}></Looper>, container);
			}

			visible = true;
			activeOne = items;
			renderIt();
			expect(container.innerHTML).to.equal('<div class="c"><p>static</p><p>a</p><p>b</p><p>c</p></div>');

			visible = false;
			activeOne = items3;
			renderIt();
			expect(container.innerHTML).to.equal('<div class="c"><p>v</p><p>a</p></div>');


			visible = true;
			activeOne = items3;
			renderIt();
			expect(container.innerHTML).to.equal('<div class="c"><p>static</p><p>v</p><p>a</p></div>');

			visible = true;
			activeOne = emptyArray;
			renderIt();
			expect(container.innerHTML).to.equal('<div class="c"><p>static</p></div>');
		});

		it('NONKEYED - should remove children from correct location when there is 2 dynamic static items and 2 lists', function() {
			var items = ['a','b','c'];
			var emptyArray = [];
			var items3 = ['v', 'a'];


			var activeOne;
			var activeTwo;
			var visibleOne = false;
			var visibleTwo = false;

			function Loop({text}) {
				return (
					<p>
						{text}
					</p>
				)
			}

			function Looper({collectionOne, visibleStaticOne, collectionTwo, visibleStaticTwo}) {
				return (
					<div class="c">
						{visibleStaticOne ? <Loop text="static"/> : null}
						{collectionOne.map((text) => (
							<Loop
								text={ text }/>
						))}
						{visibleStaticTwo ? <Loop text="static"/> : null}
						{collectionTwo.map((text) => (
							<Loop
								text={ text }/>
						))}
					</div>
				);
			}

			function renderIt() {
				render(<Looper collectionOne={activeOne} visibleStaticOne={visibleOne} collectionTwo={activeTwo} visibleStaticTwo={visibleTwo}></Looper>, container);
			}

			visibleOne = true;
			activeOne = items;
			visibleTwo = false;
			activeTwo = emptyArray;
			renderIt();
			expect(container.innerHTML).to.equal('<div class="c"><p>static</p><p>a</p><p>b</p><p>c</p></div>');

			visibleOne = true;
			activeOne = emptyArray;
			visibleTwo = true;
			activeTwo = items;
			renderIt();
			expect(container.innerHTML).to.equal('<div class="c"><p>static</p><p>static</p><p>a</p><p>b</p><p>c</p></div>');


			visibleOne = false;
			activeOne = items3;
			visibleTwo = false;
			activeTwo = emptyArray;
			renderIt();
			expect(container.innerHTML).to.equal('<div class="c"><p>v</p><p>a</p></div>');

			visibleOne = true;
			activeOne = items;
			visibleTwo = true;
			activeTwo = emptyArray;
			renderIt();
			expect(container.innerHTML).to.equal('<div class="c"><p>static</p><p>a</p><p>b</p><p>c</p><p>static</p></div>');
		});

		it('KEYED - should remove children from correct location when there is dynamic static item', function() {
			var items = ['a','b','c'];
			var emptyArray = [];
			var items3 = ['v', 'a'];
			var visible = false;


			var activeOne;

			function Loop({text}) {
				return (
					<p>
						{text}
					</p>
				)
			}

			function Looper({collectionOne, visibleStatic}) {
				return (
					<div class="c">
						{visibleStatic ? <Loop i={-1} text="static"/> : null}
						{collectionOne.map((text, i) => (
							<Loop key={i}
								text={ text }/>
						))}
					</div>
				);
			}

			function renderIt() {
				render(<Looper collectionOne={activeOne} visibleStatic={visible}></Looper>, container);
			}

			visible = true;
			activeOne = items;
			renderIt();
			expect(container.innerHTML).to.equal('<div class="c"><p>static</p><p>a</p><p>b</p><p>c</p></div>');

			visible = false;
			activeOne = items3;
			renderIt();
			expect(container.innerHTML).to.equal('<div class="c"><p>v</p><p>a</p></div>');


			visible = true;
			activeOne = items3;
			renderIt();
			expect(container.innerHTML).to.equal('<div class="c"><p>static</p><p>v</p><p>a</p></div>');

			visible = true;
			activeOne = emptyArray;
			renderIt();
			expect(container.innerHTML).to.equal('<div class="c"><p>static</p></div>');
		});
	});
});
