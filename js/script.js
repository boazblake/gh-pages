console.log($)

var apiKey = '?access_token=5925f368be9ca667bdf8b3d31f48ecfb46594a35'
var profileURL = 'https://api.github.com/users/'
var reposURL = 'https://api.github.com/users/'
var userProfile = 'boazblake'
var userRepo = userProfile + '/repos'

var promiseProfile = $.getJSON(profileURL + userProfile + apiKey)
var promiseRepos = $.getJSON(reposURL + userRepo + apiKey)
var inputEl = document.querySelector("input")
var userInput = inputEl.value


//Profile Data Function

var handleDataProfile = function(jsonProfileData) {
    // console.log(jsonProfileData)
    var domPRofileString = ''
    var profileObject = jsonProfileData
    domPRofileString += profileToHTML(profileObject)
    var profileContainer = document.querySelector('.left')
    profileContainer.innerHTML = domPRofileString

}

// Repos Data Function & sending to DOM

var handleDataRepos = function(jasonDataRepo) {
	console.log([jasonDataRepo])
    var domRepoString = ''
    for (var i = 0; i < jasonDataRepo.length; i++) {
    	domRepoString += '<a href="jasonDataRepo[i].url"><div class="repoList"> <h4>Repo Name:     ' + jasonDataRepo[i].name + '</h2><br>Number Of Open Issues:     '+ jasonDataRepo[i].open_issues_count+'</div></a>'
    } 
    var repoContainer = document.querySelector('.right')
   	repoContainer.innerHTML = domRepoString
    	console.log()

}   

//Profile Data to DOM

var profileToHTML = function(profileObject) {
    // console.log(profileObject)
    var avatarImgSrc = profileObject.avatar_url
    var name = profileObject.name 
    var email = profileObject.email
    var blog = profileObject.blog
    var hire = profileObject.hireable
    var bio = profileObject.bio
    var location = profileObject.location
    if (profileObject.name === null) {
    	location = ''
    }

    var newProfileToDom = '<img class="profilePic" src="' + avatarImgSrc + '">'
    newProfileToDom += '<ul class="profileListContainer"><li class="profileName"><h3>' + name + '</h3></li>'
    newProfileToDom += '<i class="fa fa-envelope"></i><li class="profileEmail">' + email + '</li>'
    newProfileToDom += '<li class="profilelocation">' + location + '</li></ul><br><br>'
    newProfileToDom += '<div class="profileBlog box">' + blog + '</div>'
    newProfileToDom += '<div class="profileBio box">' + bio + '</div>'
    newProfileToDom += '<div class="profileHireable box">' + hire + '</div>'

    return newProfileToDom
}

// search function

var newSearch = function(keyEvent) {
		var inputEl = keyEvent.target
	if (keyEvent.keycode === 13) {
		var query = inputEl.value
	console.log(inputEl.value)

		inputEl.value = ''
	}
	var searchURL = 'https://api.github.com/search/'
	var profileURL = searchURL + query + apiKey
	var repoURL = searchURL + query + '/repos' + apiKey

	var promiseProfile = $.getJSON(profileURL)
var promiseRepos = $.getJSON(repoURL)
	promiseProfile.then(handleDataProfile)
promiseRepos.then(handleDataRepos)
	console.log([handleDataProfileSearch])
	console.log([handleDataReposSearch])
}




// var newSearch = function(keyEvent) {
//   var targetEl = keyEvent.target
//   // console.log(targetEl)

//   if (keyEvent.keyCode === 13) {
//       numberOfZip = inputEl.value
//       zipper = parseInt(numberOfZip) + '&apikey='
// 	  pathName = baseUrl + 'zip=' +zipper + apiKey
// 	  var promise = $.getJSON(pathName)
// 	  console.log(promise)
// 	  promise.then(handleData)
// 	  // function that refreshes the page with the pat

//   }
// }

// inputEl.addEventListener('keydown',addItem)










inputEl.addEventListener('keydown', newSearch)

promiseProfile.then(handleDataProfile)
promiseRepos.then(handleDataRepos)