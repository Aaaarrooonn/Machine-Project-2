var publicphotos = [];
var privatephotos = [];
var currentuser;
var users = [];
var tags = ["vaccines","Olympic games","x-rays","bread","lighters","Africa","circus","cobblers","shipping","disasters","printing","pigs","breastfeeding","books","journalism","Native Americans","pilots","rhinoceros","basketball","Americans","murderers","ferry boats","meteorology","cocoa","money","newspapers","pharmacy","cards","airports","paper boys"];

function User(username, password, desc) {
	this.username = username;
	this.password = password;
	this.desc = desc;
}

function Photo(title, desc, author, url, tags, shares) {
	this.title = title;
	this.desc = desc;
	this.author = author;
	this.url = url;
	this.tags = tags;
	this.shares = shares;
}

function removePopup() {
	$(".popupbackground").remove();
}

function showPopup() {
	$("body").append('<div class="popupbackground"><img class="navbuttons exitbtn" src="/Machine_Project_2/FinalMP/resources/exit.png" onclick="removePopup()" onkeyup="handlePopup(event)"></div>');
}

function searchPopup() {
	showPopup();
	$(".popupbackground").append('<input type="text" name="search" placeholder="Search" class="inputbar searchbar" onkeyup="handleSearch(event)">');

	var x = $(".searchbar");
	x.focus();
	x.select();
}

function uploadPopup() {
	showPopup();
	$(".popupbackground").append('<div class="uploadform"><input type="file" class="fileinput" name="file"><input type="text" class="uploadfields titleinput" name="title" placeholder="Title"><input type="text" class="uploadfields descinput" name="description" placeholder="Description"><input type="text" class="uploadfields tagsinput" name="tags" placeholder="Tags (x,y,z)"><input type="text" class="uploadfields sharedinput" name="shared" placeholder="Shared"><select name="audience" class="typeinput"><option name="public">Public</option><option name="private">Private</option></select><button class="uploadformbtn" onclick="handleUpload()">Upload</button></div>');
}

function handleUpload() {
	var ititle = $(".titleinput").val();
	var idesc = $(".descinput").val();
	var itags = $(".tagsinput").val().split(",");
	var ishared = $(".sharedinput").val();

	createUploadedThumbnail(ititle, idesc, itags, ishared);
	Home();
}

function handleSearch(e) {
	if(e.keyCode == 13) {
		e.preventDefault();
		var keyword = $(".searchbar").val();
		removePopup();
		clear();

		$("BODY").append("<div class='feed'></div>");
		for(var  h = 0; h < publicphotos.length; h++) {
			for(var k = 0; k < publicphotos[h].tags.length; k++) {
				if(keyword == publicphotos[h].tags[k]) {
					loadThumbnail(h);
				}
			}
		}

	} else if(e.keyCode == 27) {
		removePopup();
	}
}

function handleTag(x, e) {
	if(e.keyCode == 13) {
		if($(".tagbar").val() == "") 
			return;

		publicphotos[x].tags.push($(".tagbar").val());
		$(".tagcontainer").append("<span class='tags'>"+publicphotos[x].tags[publicphotos[x].tags.length-1]+"</span>");
		$(".tagbar").val("");
	} else if(e.keyCode == 27) {
		removePopup();
	}
}

function handlePopup(e) {
	if(e.keyCode == 27) {
		removePopup();
	}
}

function createThumbnail() {
	var x = Math.floor(Math.random() * (1000 - 170 + 1)) + 170;
	var y = Math.floor(Math.random() * (1000 - 170 + 1)) + 170;
	var p = Math.floor(Math.random() * ((users.length-1) - 0 + 1)) + 0;
	var tagrand = [];
	tagrand.push(tags[Math.floor(Math.random() * ((tags.length-1) - 0 + 1)) + 0]);
	tagrand.push(tags[Math.floor(Math.random() * ((tags.length-1) - 0 + 1)) + 0]);
	tagrand.push(tags[Math.floor(Math.random() * ((tags.length-1) - 0 + 1)) + 0]);
	tagrand.push(tags[Math.floor(Math.random() * ((tags.length-1) - 0 + 1)) + 0]);

	var r = publicphotos.length;
	a = [];
	b = [];

	publicphotos.push(new Photo("Public photo " + publicphotos.length + " title", "Public photo " + publicphotos.length + " description", users[p], "http://via.placeholder.com/"+x+"x"+y, tagrand, b));

	var z = publicphotos.length-1;

	loadThumbnail(z);
}

function createUploadedThumbnail(title, description, tags, shared) {
	var x = Math.floor(Math.random() * (1000 - 170 + 1)) + 170;
	var y = Math.floor(Math.random() * (1000 - 170 + 1)) + 170;

	var type = $(".typeinput option:selected").text();
	if(type == "Public")
		publicphotos.push(new Photo(title, description, currentuser, "http://via.placeholder.com/"+x+"x"+y, tags, shared));
	else
		privatephotos.push(new Photo(title, description, users[1], "http://via.placeholder.com/"+x+"x"+y, tags, shared));
}

function loadThumbnail(x) {
	var y = publicphotos[x].author;
	$(".feed").append('<div class="outertile '+x+'"><img src="'+publicphotos[x].url+'" class="imagetile '+x+'" onclick="showFullImage('+x+')"><div class="overlaytile '+x+'"><span class="tilelabels '+x+'"><span class="tiletitle '+x+'">'+publicphotos[x].title+'</span><br><span class="tileauthor '+x+'"><a id="tileauthorlink'+x+'">@'+publicphotos[x].author.username+'</a></span></span><img onclick="addTag('+x+')" class="addbtn navbuttons '+x+'" src="/Machine_Project_2/FinalMP/resources/add.png"></div></div>');
		document.getElementById('tileauthorlink'+x+'').onclick = function() {viewProfile(y);};
}

function addTag(x) {
	showPopup();
	$(".popupbackground").append('<div class="tagcontainer"><input type="text" name="tag" placeholder="Add tag" class="inputbar tagbar" onkeyup="handleTag('+x+',event)"></div>');
	for(var i = 0; i < publicphotos[x].tags.length; i++)	
		$(".tagcontainer").append("<span class='tags'>"+publicphotos[x].tags[i]+"</span>");
	
	var x = $(".tagbar");
	x.focus();
	x.select();
}

window.onload = function() {
	users.push(new User("Aaron", "mnop", "Lorem ipsum dolor"));
	users.push(new User("Raymond", "1234", "Lorem ipsum dolor"));
	users.push(new User("Justine", "4567", "Lorem ipsum dolor"));
	users.push(new User("Michael", "abcd", "Lorem ipsum dolor"));
	users.push(new User("Noah", "efgh", "Lorem ipsum dolor"));
	users.push(new User("Izak", "ijkl", "Lorem ipsum dolor"));

	currentuser = users[0];

	for(var g = 0; g < 4; g++) {
		var p = Math.floor(Math.random() * ((users.length-1) - 1 + 1)) + 1;
		var x = Math.floor(Math.random() * (1000 - 170 + 1)) + 170;
		var y = Math.floor(Math.random() * (1000 - 170 + 1)) + 170;
		var tagrand = [];
		tagrand.push(tags[Math.floor(Math.random() * ((tags.length-1) - 0 + 1)) + 0]);
		tagrand.push(tags[Math.floor(Math.random() * ((tags.length-1) - 0 + 1)) + 0]);
		tagrand.push(tags[Math.floor(Math.random() * ((tags.length-1) - 0 + 1)) + 0]);
		tagrand.push(tags[Math.floor(Math.random() * ((tags.length-1) - 0 + 1)) + 0]);

		privatephotos.push(new Photo("Private photo  " + privatephotos.length + " title", "Private photo " + privatephotos.length + " description", users[p], "http://via.placeholder.com/"+x+"x"+y, tagrand, currentuser));
	}

	$("BODY").append("<div class='feed'></div>");
	loadPhotos();
}

function Home() {
	clear();
	$("BODY").append("<div class='feed'></div>");
	for(var i = 0; i < publicphotos.length; i++) {
		loadThumbnail(i);
	}
	$("BODY").append('<button class="navbuttons loadbtn" onclick="loadPhotos()">Load more</button>');
}

function TestDel() {
	clear();
}

function loadPhotos() {
	for(var i = 0; i < 20; i++) {
		createThumbnail();
	}
}

function showFullImage(x) {
	var t = publicphotos[x];

	showPopup();
	$(".popupbackground").append("<img src='"+publicphotos[x].url+"' class='fullimage "+x+"'><div class='datacontainer'><div class='datalabelscontainer'></div></div><img class='navbuttons datatogglebtn' src='/Machine_Project_2/FinalMP/resources/toggle.png' onclick='toggleData()'>");
	$(".datalabelscontainer").append("<span class='datalabels datatitle'>"+t.title+"</span>");
	$(".datalabelscontainer").append("<span class='datalabels datadesc'>"+t.desc+"</span>");	
	$(".datalabelscontainer").append("<span class='datalabels dataauthor'><a id='dataauthor"+x+"'>@"+t.author.username+"</a></span>");

	document.getElementById("dataauthor"+x+"").onclick = function() {viewProfile(publicphotos[x].author);};
	for(var y = 0; y < t.tags.length; y++)
		$(".datalabelscontainer").append("<span class='datalabels datatags datatag"+y+"'>"+t.tags[y]+"</span>");
}

function toggleData() {
	if($(".datacontainer").css("visibility") == "visible")
		$(".datacontainer").css("visibility", "hidden");
	else
		$(".datacontainer").css("visibility", "visible");
}

function viewProfile(x) {
	clear();
	$("BODY").append("<div class='profilecontainer'></div>");
	$('.profilecontainer').append('<div class="profilecontent"></div>');
	$('.profilecontainer').append('<div class="profilelabelscontainer"></div>');
		$('.profilelabelscontainer').append('<span class="profilelabels profileusername">@'+x.username+'</span>');
		$('.profilelabelscontainer').append('<span class="profilelabels profiledesc">'+x.desc+'</span>');
	$('.profilecontainer').append('<div class="profilepostswrapper"></div>');
	$('.profilepostswrapper').append('<div class="postscontainer"></div>');
	$(".postscontainer").append("<span class='profilelabels posts'>Posts</span>");
	loadProfilePosts(x);

	$('.profilepostswrapper').append('<div class="privatecontainer"></div>');
	$(".privatecontainer").append("<span class='profilelabels posts'>Shared</span>");
	loadPrivatePosts(x);

	if(x != currentuser)
		$(".privatecontainer").remove();
}

function loadProfilePosts(x) {
	for(var i = 0; i < publicphotos.length; i++) {
		if(publicphotos[i].author == x) {
			$(".postscontainer").append('<div class="outertile '+i+'"><img src="'+publicphotos[i].url+'" class="imagetile '+i+'" onclick="showFullImage('+i+')"><div class="overlaytile '+i+'"><span class="tilelabels '+i+'"><span class="tiletitle '+i+'">'+publicphotos[i].title+'</span><br><span class="tileauthor '+i+'"><a id="tileauthorlink tileauthorlink'+i+'">@'+publicphotos[i].author.username+'</a></span></span><img onclick="addTag('+i+')" class="addbtn navbuttons '+i+'" src="/Machine_Project_2/FinalMP/resources/add.png"></div></div>');
		}
	}
}

function loadPrivatePosts(x) {
	for(var i = 0; i < privatephotos.length; i++) {
			$(".privatecontainer").append('<div class="outertile '+i+'"><img src="'+privatephotos[i].url+'" class="imagetile '+i+'" onclick="showFullPrivateImage('+i+')"><div class="overlaytile '+i+'"><span class="tilelabels '+i+'"><span class="tiletitle '+i+'">'+privatephotos[i].title+'</span><br><span class="tileauthor '+i+'"><a id="tileauthorlink tileauthorlink'+i+'">@'+privatephotos[i].author.username+'</a></span></span><img onclick="addPrivateTag('+i+')" class="addbtn navbuttons '+i+'" src="/Machine_Project_2/FinalMP/resources/add.png"></div></div>');
	}
}

function addPrivateTag(x) {
	showPopup();
	$(".popupbackground").append('<div class="tagcontainer"><input type="text" name="tag" placeholder="Add tag" class="inputbar tagbar" onkeyup="handleTag('+x+',event)"></div>');
	for(var i = 0; i < privatephotos[x].tags.length; i++)	
		$(".tagcontainer").append("<span class='tags'>"+privatephotos[x].tags[i]+"</span>");
	
	var x = $(".tagbar");
	x.focus();
	x.select();
}

function showFullPrivateImage(x) {
	var t = privatephotos[x];

	showPopup();
	$(".popupbackground").append("<img src='"+privatephotos[x].url+"' class='fullimage "+x+"'><div class='datacontainer'><div class='datalabelscontainer'></div></div><img class='navbuttons datatogglebtn' src='/Machine_Project_2/FinalMP/resources/toggle.png' onclick='toggleData()'>");
	$(".datalabelscontainer").append("<span class='datalabels datatitle'>"+t.title+"</span>");
	$(".datalabelscontainer").append("<span class='datalabels datadesc'>"+t.desc+"</span>");	
	$(".datalabelscontainer").append("<span class='datalabels dataauthor'><a id='dataauthor"+x+"'>@"+t.author.username+"</a></span>");

	document.getElementById("dataauthor"+x+"").onclick = function() {viewProfile(privatephotos[x].author);};
	for(var y = 0; y < t.tags.length; y++)
		$(".datalabelscontainer").append("<span class='datalabels datatags datatag"+y+"'>"+t.tags[y]+"</span>");
}

function clear() {
	removePopup();	
	$(".feed").remove();
	$(".profilecontainer").remove();
	$(".loadbtn").remove();
}