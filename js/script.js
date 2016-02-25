console.log($)

// var apiKey = ''
// repos=========='https://api.github.com/users/boazblake/repos'
var baseURL= 'https://api.github.com/users/boazblake'

var fullURL = baseURL 

var promise = $.getJSON(fullURL)


var handleData = function(jsonData) {
	// console.log(jsonData)
	var domString = ''
	var profileObject = jsonData
	// console.log(profileObject)
	domString += profileToHTML(profileObject)


var containerEl = document.querySelector('.left')
	containerEl.innerHTML = domString

}

var profileToHTML = function (profileObject) {
	// console.log(profileObject)
	var avatarImgSrc = profileObject.avatar_url
	console.log(avatarImgSrc)
	var name = profileObject.name
	console.log(name)

	var blog = profileObject.blog
	var hire = profileObject.hireable 
	var bio = profileObject.bio

	var newProfileToDom ='<div class="imgContainer"><img src="' + avatarImgSrc + '"></div>'
	 newProfileToDom +='<ul class="profileListContainer"><li class="profileName">' + name + '</li>'
	 newProfileToDom += '<li class="profileBlog">' + blog + '</li>'
	 newProfileToDom += '<li class="profileHireable">' + hire + '</li>'
	 newProfileToDom += '<li class="profileBio">' + bio + '</li></ul>'

	return newProfileToDom
	console.log(newProfileToDom)
}

promise.then(handleData)
console.log()