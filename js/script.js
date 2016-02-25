console.log($)

// var apiKey = ''
var profileURL= 'https://api.github.com/users/boazblake'
var reposURL= 'https://api.github.com/users/boazblake/repos'

// var websiteURL  = [profileURL, reposURL]

var promiseProfile = $.getJSON(profileURL)
var promiseRepos = $.getJSON(reposURL)

//Profile Data Function

var handleDataProfile = function(jsonProfileData) {
	console.log(jsonProfileData)
	var domString = ''
	var profileObject = jsonProfileData
	domString += profileToHTML(profileObject)

var containerEl = document.querySelector('.left')
	containerEl.innerHTML = domString
}

//Profile Repos Function

var handleDataRepos = function(jasonDataRepo) {
	var gitURLArray = []
	var repoNameArray = []
	var issuesCountArray= []
	for (var i = 0; i < jasonDataRepo.length; i++) {
		gitURLArray[i] = jasonDataRepo[i].full_name
		repoNameArray[i] = jasonDataRepo[i].git_url
		issuesCountArray[i] = jasonDataRepo[i].open_issues_count

	}
	// console.log(gitURLArray)
	// console.log(repoNameArray)
	// console.log(issuesCountArray)


	










	
	// domString += repoToHTML(repoArray)

// var containerEl = document.querySelector('.right')
	// containerEl.innerHTML = domString
}



//Profile Data to DOM

var profileToHTML = function (profileObject) {
	// console.log(profileObject)
	var avatarImgSrc = profileObject.avatar_url
	var name = profileObject.name
	var email = profileObject.email 
	var blog = profileObject.blog
	var hire = profileObject.hireable 
	var bio = profileObject.bio
	var location = profileObject.location

	var newProfileToDom ='<div class="imgContainer"><img src="' + avatarImgSrc + '"></div>'
	 newProfileToDom +='<ul class="profileListContainer"><li class="profileName">' + name + '</li>'
	 newProfileToDom += '<li class="profileBlog">' + blog + '</li>'
	 newProfileToDom += '<li class="profileHireable">' + hire + '</li>'
	 newProfileToDom += '<li class="profileEmail">' + email + '</li>'
	 newProfileToDom += '<li class="profileLocation">' + location + '</li>'
	 newProfileToDom += '<li class="profileBio">' + bio + '</li></ul>'

	return newProfileToDom
}


//Profile Repo To Dom










promiseProfile.then(handleDataProfile)
promiseRepos.then(handleDataRepos)

console.log()






