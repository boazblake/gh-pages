console.log($)

var apiKey = '?access_token=4ec2ce71fa46864e2eba86d05dd76f62a9e88d7b'
var profileURL = 'https://api.github.com/users/boazblake'
var reposURL = 'https://api.github.com/users/boazblake/repos'

// var websiteURL  = [profileURL, reposURL]

var promiseProfile = $.getJSON(profileURL+apiKey)
var promiseRepos = $.getJSON(reposURL+apiKey)

//Profile Data Function

var handleDataProfile = function(jsonProfileData) {
    // console.log(jsonProfileData)
    var domPRofileString = ''
    var profileObject = jsonProfileData
    domPRofileString += profileToHTML(profileObject)
    var profileContainer = document.querySelector('.left')
    profileContainer.innerHTML = domPRofileString
}

// Repos Data Function

var handleDataRepos = function(jasonDataRepo) {
	// console.log(jasonDataRepo)
    var domRepoString = ''
    for (var i = 0; i < jasonDataRepo.length; i++) {
    	domRepoString += jasonDataRepo[i].name + ' '
    } 
    domRepoHTML = repoToHTML(domRepoString)
    var repoContainer = document.querySelector('.right')
   	repoContainer.innerHTML = domRepoString
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

    var newProfileToDom = '<div class="imgContainer"><img class="profilePic" src="' + avatarImgSrc + '"></div>'
    newProfileToDom += '<ul class="profileListContainer"><li class="profileName">' + name + '</li>'
    newProfileToDom += '<li class="profileBlog">' + blog + '</li>'
    newProfileToDom += '<li class="profileHireable">' + hire + '</li>'
    newProfileToDom += '<li class="profileEmail">' + email + '</li>'
    newProfileToDom += '<li class="profileLocation">' + location + '</li>'
    newProfileToDom += '<li class="profileBio">' + bio + '</li></ul>'

    return newProfileToDom
}

//Profile Repo To Dom

var repoToHTML = function(repoArray) {
    console.log(repoArray)
}




promiseProfile.then(handleDataProfile)
promiseRepos.then(handleDataRepos)