"use strict";

const root = document.querySelector("#root");

document.body.style = "margin: 24px"

root.style = `
	max-width: 320px;
	margin: 50px auto;
	padding: 24px;
	border-radius: 7px;
	background: #303F9F;
	font-family: tahoma;
`;

const data = [
	{name: "Learn JavaScript", isComplete: false, id: 0},
	{name: "Learn TypeScript", isComplete: false, id: 1},
	{name: "Learn Node.js", isComplete: false, id: 2}
];

function todoTitle () {
	const elem = document.createElement("h1");
	elem.style = "color: #FFEB3B; font-size: 24px; margin-bottom: 24px;"
	elem.textContent = "ToDo Application"
	return elem;
}

function todoHeader () {
	const elem = document.createElement("form");

	elem.style = "margin-bottom: 24px; display: flex"

	elem.innerHTML = `
		<input 
			type="text" 
			placeholder="Type here"
			style="
				display: block;
				padding: 7px;
				border: 1px solid #3F51B5;
				outline: 0;
				border-radius: 7px 0px 0px 7px;
				width: 100%;
			"
		>
		<button style="
			padding: 7px;
			border: 1px solid #3F51B5;
			outline: 0;
			border-radius: 0px 7px 7px 0px;
			background: #FFEB3B;
			color: #111;
			cursor: pointer;
			font-weight: bold;
		">
			ADD
		</button>
	`;

	elem.addEventListener("submit", (e) => {
		e.preventDefault();
		const val = elem.firstElementChild.value.trim();

		if (val !== "" && val !== undefined) {
			data.push({
				name: val,
				isComplete: false,
				id: data.length
			});
		}

		app();
		e.target.reset();
	});
	return elem;
}

function todoListItems () {
	const elem = document.createElement("div");

	data.forEach(obj => {
		elem.append(todoListItem(obj));
	});

	return elem;
}

function todoListItem (obj) {
	const elem = document.createElement("div");

	elem.innerHTML = `
		<div style="
			display:flex;
			justify-content:space-between;
			align-items:center;
			margin-bottom: 12px;
		">
			<label
				style="
					display: block;
					color: #fff;
				"
			>
				<input type="checkbox">
				<span>${obj.name}</span>
			</label>
			<button
				style="
					background: #3F51B5;
					color: #fff;
					border: none;
					padding: 7px;
					border-radius: 7px;
					font-size: 12px;
					cursor: pointer;
				"
				data-rm
			>
				Remove
			</button>
		</div>
	`;

	elem.querySelectorAll("input").forEach((item, index) => {
		item.addEventListener("change", () => {
			if (item.checked && index === data[index].id) {
				obj.isComplete = true;
			} else {
				obj.isComplete = false;
			}

			app();
		});
	});

	elem.querySelectorAll("[data-rm]").forEach((item, index) => {
		item.addEventListener("click", () => {
			item.parentElement.remove();
			data.splice(index, 1);
			app();
		});
	});

	return elem;
}

function todoFooter () {
	const elem = document.createElement("div");
	const filteredArr = data.filter(obj => obj.isComplete === true);

	elem.innerHTML = `
		<span style="font-style: italic;color: #FFEB3B">${filteredArr.length} / ${data.length}</span>
	`;

	return elem;
}

function app () {
	root.innerHTML = "";

	function refresh (arr, data) {
		arr.forEach((item, index) => {
			if (index === data[index].id && data[index].isComplete === true) {
				item.setAttribute("checked", "");
			}
		});
	}
	
	root.append(todoTitle(), todoHeader(), todoListItems(), todoFooter());
	refresh(document.querySelectorAll("input[type='checkbox']"), data);
}

app();