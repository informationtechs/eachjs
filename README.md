# EachJS
EachJS is an API connection framework. EachJS enhances HTML and bridges the front view with the back-end API. EachJS is perfect for API-driven websites and Single Page Applications (SPAs). It is free of charge to any person or business, licensed under MIT.

Getting Started

EachJS extends HTML with new attributes 

Let's start with A Quick Example

By extending HTML with new attributes, 

http://eachdataapi.azurewebsites.net/data/dot

Sample: Dot

Example 1-1a:
```
<html>
<head>
</head>
<body>
<h4 id="unit1-title">1.1a Populate DIV HTML</h4>
<div id="unit1" data-ej-load="http://eachdataapi.azurewebsites.net/data/dot"></div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="js/each-1.0.js" type="text/javascript"></script>
</body>
</html>
```

Examples

Example 1-1a:
```
<html>
<head>
</head>
<body>
<h4 id="unit1-title">1.1a Populate DIV HTML</h4>
<div id="unit1" data-ej-load="http://eachdataapi.azurewebsites.net/data/dot"></div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="js/each-1.0.js" type="text/javascript"></script>
</body>
</html>
```

Example 1-1b:
```
<html>
<head>
</head>
<body>
<h4 id="unit1-title">1.1a Populate DIV HTML</h4>
<div id="unit1" data-ej-load="$ejdot"></div>
<script type="text/javascript">
  $ejdot = "Sample: Dot";
</script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="js/each-1.0.js" type="text/javascript"></script>
</body>
</html>
```

Example 1-2:
```
<ul>
	<li>Laura</li>
	<li id="unit2" data-ej-load="http://eachdataapi.azurewebsites.net/data/dot"></li>
</ul>
```

Example 1-3:
```
<h4 id="unit3-title">1.3 Populate INPUT TEXT</h4>
<input id="unit3" type="text" data-ej-load="http://eachdataapi.azurewebsites.net/data/dot" />
```

Example 2-1:
```
<div id="unit1" data-ej-load="http://eachdataapi.azurewebsites.net/data/line">{{Name}}</div>
```

Example 2-2:
```
<div id="unit2" data-ej-load="http://eachdataapi.azurewebsites.net/data/line">{{Name}}, then {{Text}}</div>
```

Example 3-1:
```
<div id="unit1" data-ej-load="http://eachdataapi.azurewebsites.net/data/plane">
	<span data-ej-repeat>{{[].Name}}</span>
</div>
```

Example 3-2:
```
<ul id="unit2" data-ej-load="http://eachdataapi.azurewebsites.net/data/plane">
	<li data-ej-repeat></li>
</ul>
```

Example 3-3:
```
<ul id="unit3" data-ej-load="http://eachdataapi.azurewebsites.net/data/plane">
	<li>Note: this is the header.</li>
	<li data-ej-repeat>Start with {{[].Name}}, then {{[].Text}}</li>
	<li>Note: this is the footer.</li>
</ul>
```

Example 3-4:
```
<div id="unit4" data-ej-load="http://eachdataapi.azurewebsites.net/data/plane"></div>
```

Example 3-5:
```
<ul id="unit5" data-ej-load="http://eachdataapi.azurewebsites.net/data/plane"></ul>
```

Example 3-6:
```
<table id="unit6" data-ej-load="http://eachdataapi.azurewebsites.net/data/plane" data-ej-load-output=";.item-row:odd(addclass<green-italic>);.item-row:even(addclass<red-bold>)">
	<tr class="item-row" data-ej-repeat>
		<td>{{[].Name}}</td>
		<td>{{[].Text}}</td>
	</tr>
</table>
```

Example 4-1:
```
<div id="unit1" data-ej-load="http://eachdataapi.azurewebsites.net/data/book">
	<div>{{title}} <i>by</i> {{author}}</div>
	<div data-ej-repeat="chapters">
		<p>{{chapters[].index}}.{{chapters[].title}}</p>
		<div data-ej-repeat="sections">
			<span>{{chapters[].index}}.{{chapters[].sections[].index}}.{{chapters[].sections[].title}}</span><br />
		</div>
	</div>
</div>
```

Example 4-2:
```
<div id="unit2" data-ej-load="http://eachdataapi.azurewebsites.net/data/banks">
	<div data-ej-repeat>
		<h5>Bank Name: {{[].name}}</h5>
		<div data-ej-repeat="branches">
			<div>Branch Location: {{[].branches[].location}}</div>
			<div>Employees: {{[].branches[].countOfEmployees}}</div>
			<span data-ej-repeat="departments">
				<span>{{[].branches[].departments[].name}} Phone: {{[].branches[].departments[].phone}}</span><br />
			</span>
		</div>
	</div>
</div>
```

Example 5-1:
```
<body data-ej-base="http://eachdataapi.azurewebsites.net">
<div>What qualifies Best Samples?</div>
<div data-ej-load="/data/line" data-ej-load-output="fnSetSpecs"></div>
<div id="specs"></div>
</body>
```

Example 5-2:
```
<body data-ej-base="http://eachdataapi.azurewebsites.net">
<div>2015 Most Profitable Banks</div>
<input type="hidden" id="topLabel" value="(Aww yeah)" />
<ul id="unit2" data-ej-load="/data/banks" data-ej-load-output=";fnAddBankPrefix">
	<li data-ej-repeat><span>{{i}},</span> <span class="bank-name">{{[].name}}</span></li>
</ul>
</body>
```

Example 6:
```
<table id="items" data-ej-load="/data/items">
	<tr data-ej-repeat>
		<td><a class="update-item" href="#" data-ej-click="/data/items/{{[].id}}" data-ej-click-output="#updateItem(populate,show)">Update</a></td>
		<td><a class="delete-item" href="#" data-ej-click="delete:/data/items/{{[].id}}" data-ej-click-output="#items(reload)">Delete</a></td>
		<td class="item-name">{{[].name}}</td>
	</tr>
	<tr><td colspan="3">Total: {{count}}</td></tr>
</table>
<div id="addItem">
	<div>Name: </div>
	<div><input type="text" id="addName" /></div>
	<div>
		<button id="btnAdd" data-ej-click="post:/data/items" data-ej-click-input="name@#addName" 
				data-ej-click-output="#items(reload);#addName(clear);#addItemStatus(flash<2000>)">Add</button>
	</div>
</div>
<div id="addItemStatus" class="red hide">
	Status: added
</div>
<div id="updateItem" class="hide">
	<div>Name: </div>
	<div><input type="text" id="updateName" value="{{name}}" /></div>
	<div>
		<button id="btnUpdate" data-ej-click="put:/data/items/{{id}}" data-ej-click-input="name@#updateName"
				data-ej-click-output="#items(reload);#updateName(clear);#updateItem(hide);#updateSuccess(show);#updateError(hide);#updateItemStatus(class<green>)"
				data-ej-click-error="#updateError(show);#updateSuccess(hide);#updateItemStatus(class<red>)">Update</button>
	</div>
</div>
<div id="updateItemStatus" class="hide">
	<span>Status: </span>
	<span id="updateError" class="hide">Oops...there was an error.</span>
	<span id="updateSuccess" class="hide">Updated</span>	
</div>
```

Example 7:
```
<div class="fixed-header">
    <div id="header" class="container">
		<div id="memberAuthorized" class="hide" data-ej-load="/data/account" data-ej-load-auth="(storage)accountToken"
			data-ej-load-output="#memberAuthorized(populate,show);#memberNotAuthorized(hide)"
			data-ej-load-error="#memberAuthorized(hide);#memberNotAuthorized(show)">
			Welcome, {{name}}
			<a href="#" id="logout" data-ej-click-output="(storage)-accountToken;#memberAuthorized(reload);#orders(reload)">Log out</a>
		</div>	
		<div id="memberNotAuthorized" class="hide">
			<label>Username:</label>
			<input type="text" id="username" />
			<label>Password:</label>
			<input type="password" id="password" />
			<input type="checkbox" id="keepLoggedIn" checked/> Keep logged in
			<button id="login" type="button" data-ej-click="post:/member/authenticate" 
				data-ej-click-input="username@#username;password@#password;$keepLoggedIn@#keepLoggedIn:checked"
				data-ej-click-output="[$keepLoggedIn](localstorage)accountToken;
									  [!$keepLoggedIn](sessionstorage)accountToken;
									  #memberAuthorized(reload);#orders(reload)"
				data-ej-click-error="#loginMessage(populate,flash)">Login</button>
			<span id="loginMessage" class="hide status"></span>
		</div> 		
    </div>
</div>
<div class="container">
	<div id="content">		
		<div id="orders" class="hide" data-ej-load="/data/orders" data-ej-load-auth="(storage)accountToken"
			data-ej-load-output="#orders(populate,show);#ordersNotAuthorized(hide)"
			data-ej-load-error="#orders(hide);#ordersNotAuthorized(show)">
			<div data-ej-repeat class="padding10">
				<div class="order-id">Order ID: {{[].orderId}}</div>
				<div class="order-date">Date: {{[].orderDate}}</div>
				<div class="order-amount">Amount: {{[].orderAmount}}</div>
			</div>
		</div>
		<div id="ordersNotAuthorized" class="hide">
			Please log in first.
		</div> 
	</div>
</div>
```

Example 8:
```
<select id="banks" data-ej-load="/data/banks" data-ej-change="/data/banks"
	data-ej-change-input="id;key2@#branchesKey"
	data-ej-change-output="#branches(,enable);#departments(reset,disable)">
	<option value="">No selection</option>
	<option data-ej-repeat value="{{[].id}}">{{[].name}}</option>
</select>
<input type="hidden" id="branchesKey" value="branches" />
<select id="branches" disabled data-ej-change="/data/banks"
	data-ej-change-input="id@#banks;key2@#branchesKey;id2;key3@#departmentsKey"
	data-ej-change-output="[length>1]#departments(,enable);
						   [length<=1]#departments(reset,disable)">
	<option value="">No selection</option>
	<option data-ej-repeat value="{{[].id}}">{{[].location}}</option>
</select>
<input type="hidden" id="departmentsKey" value="departments" />
<select id="departments" disabled>
	<option value="">No selection</option>
	<option data-ej-repeat value="{{[].id}}">{{[].name}}</option>
</select>
```

Example 9:
```
<ul class="ul-wizard">
	<li id="tab1" class="li-wizard cyan">Step 1</li>
	<li id="tab2" class="li-wizard lightgray">Step 2</li>
	<li id="tab3" class="li-wizard lightgray">Step 3</li>
</ul>
<div id="section1">
	<div id="content1">Content 1...</div>
	<button id="button1" data-ej-click-output="#section1(hide);#section2(show);#tab1(addclass<lightgray>,removeclass<cyan>);#tab2(addclass<cyan>,removeclass<lightgray>);">Next</button>
</div>
<div id="section2" class="hide">
	<div id="content2">Content 2...</div>
	<button id="button2" data-ej-click-output="#section2(hide);#section3(show);#tab2(addclass<lightgray>,removeclass<cyan>);#tab3(addclass<cyan>,removeclass<lightgray>);">Next</button>
</div>
<div id="section3" class="hide">
	<div id="content3">Content 3...</div>
	<button id="button3" data-ej-click-output="(url)reload">Start Over</button>
</div>
```

Example 10:
```
<table id="unit1">
	<tr>
		<td>Name</td>
		<td>Quantity</td>
	</tr>
	<tr class="item-row">
		<td><input type="text" class="item-name" /></td>
		<td><input type="text" class="item-quantity" /></td>
	</tr>
	<tr class="item-row">
		<td><input type="text" class="item-name" /></td>
		<td><input type="text" class="item-quantity" /></td>
	</tr>
	<tr class="item-row">
		<td><input type="text" class="item-name" /></td>
		<td><input type="text" class="item-quantity" /></td>
	</tr>
	<tr class="item-row">
		<td><button id="btnAdd" data-ej-click-input="item[].name@.item-name;item[].text@.item-quantity"
		data-ej-click="post:/data/items"
		data-ej-click-output="#addItemStatus(show)">Submit</button></td>
		<td>&nbsp;</td>
	</tr>	
</table>
<div id="addItemStatus" class="status hide">
	Status: added
</div>
```

Syntax

Customize

Contribution

EachJS v1.0 was officially released in 1/30/2016. We welcome you to make any kind of contributions, including enhancing/debugging source codes, creating examples, writing unit testings, making videos, correcting mistakes, and providing suggestions.
We'll evaluate your contributions every 3 months. Key contributors will be credited on this page. 







