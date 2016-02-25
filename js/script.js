console.log($)

// var apiKey = ''
var profileURL = 'https://api.github.com/users/matthiasak'
var reposURL = 'https://api.github.com/users/boazblake/repos'

// var websiteURL  = [profileURL, reposURL]

var promiseProfile = $.getJSON(profileURL)
var promiseRepos = $.getJSON(reposURL)

//Profile Data Function

var handleDataProfile = function(jsonProfileData) {
    // console.log(jsonProfileData)
    var domPRofileString = ''
    var profileObject = jsonProfileData
    domPRofileString += profileToHTML(profileObject)

    var profileContainer = document.querySelector('.left')
    profileContainer.innerHTML = domPRofileString
}

//Profile Repos Function

var handleDataRepos = function(jasonDataRepo) {
    var gitURLArray = []
    var reposNameArray = []
    var issuesCountArray = []
    for (var i = 0; i < jasonDataRepo.length; i++) {
        reposNameArray[i] = jasonDataRepo[i].full_name
        gitURLArray[i] = jasonDataRepo[i].git_url
        issuesCountArray[i] = jasonDataRepo[i].open_issues_count

    }
    console.log(gitURLArray)
    // console.log(reposNameArray)
    // console.log(issuesCountArray)


    var repoFunction = function(repoArray) {
        var repoObject = {}
        for (var i = 0; i < repoArray.length; i++) {
            repoObject.gitName = reposNameArray[i]
            repoObject.gitURL = gitURLArray[i]
            repoObject.issuesNumber = issuesCountArray[i]
            console.log(repoObject.gitName)
            domRepoString += repoToHTML(repoArray)

        var repoContainer = document.querySelector('.right')
   	 	repoContainer.innerHTML = domRepoString
        }   
    }
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


var repoToHTML = function(gitURLArray) {
console.log(gitURLArray)
}





promiseProfile.then(handleDataProfile)
promiseRepos.then(handleDataRepos)

console.log()
