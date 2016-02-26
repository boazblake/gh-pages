console.log($)

// var apiKey = '?access_token=4ec879e96a1415c2f5efcea69f2b7664edb30f93'
var profileURL = 'https://api.github.com/users/'
var reposURL = 'https://api.github.com/users/'
var userProfile = 'matthiasak'
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
    // console.log([jasonDataRepo])
    var domRepoString = ''
    for (var i = 0; i < jasonDataRepo.length; i++) {
        domRepoString += '<a href="jasonDataRepo[i].url"><div class="repoList"> <h4>Repo Name:     ' + jasonDataRepo[i].name + '</h2><br>Number Of Open Issues:     ' + jasonDataRepo[i].open_issues_count + '</div></a>'
    }
    var repoContainer = document.querySelector('.right')
    repoContainer.innerHTML = domRepoString
        // console.log()

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
    if (bio === null) bio = ''
    if (hire === true) hire = 'available for employment'
    console.log(profileObject.hireable)

    var newProfileToDom = '<img class="profilePic" src="' + avatarImgSrc + '">'
    newProfileToDom += '<ul class="profileListContainer"><li class="profileName"><h3>' + name + '</h3></li>'
    newProfileToDom += '<li class="profileEmail"><i class="fa fa-envelope"></i>' + email + '</li>'
    newProfileToDom += '<li class="profilelocation"><i class="fa fa-globe"></i>' + location + '</li></ul><br><br>'
    newProfileToDom += '<div class="profileBlog box"><i class="fa fa-pencil-square-o"></i><p class="text">Blog</p></div>'
    newProfileToDom += '<div class="profileBio box">' + bio + '<p class="text">Bio</p></div>'
    newProfileToDom += '<div class="profileHireable box"><i class="fa fa-code-fork"></i><p class="text">'+ hire +'</p></div>'

    return newProfileToDom
}

// search function

var newSearch = function(keyEvent) {
    var inputEl = keyEvent.target

    if (keyEvent.keyCode === 13) {
        var userLookupVal = inputEl.value
            // console.log(inputEl.value)
        // console.log(userLookupVal)
        
        inputEl.value = ''
    
	    var searchURL = 'https://api.github.com/users/'
	    var profileURL = searchURL + userLookupVal + apiKey
	    var repoURL = searchURL + userLookupVal + '/repos' + apiKey

	    var promiseProfile = $.getJSON(profileURL)
	    var promiseRepos = $.getJSON(repoURL)
	    promiseProfile.then(handleDataProfile)
	    promiseRepos.then(handleDataRepos)
	        // console.log([handleDataProfileSearch])
	        // console.log([handleDataReposSearch])
	}
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
