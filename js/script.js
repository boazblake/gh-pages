
// check to see if we are in contact with jQuery library
console.log($)

// var apiKey = '?access_token=xxxx'

// DEFINING OUR VARIABLES AND FUNCTIONS
// the defualt loading page is the API base URL, with my username.
var baseURL = 'https://api.github.com/users/'
var userProfile = 'boazblake'
var userRepo = userProfile + '/repos' 

// the Search bar is located using ghr queryselector and saved as the variable 'inputEl'.
var inputEl = document.querySelector("input")


 /////////////////////////////////////////
// The PROMISE function for jQuery 
/////////////////////////////////////////
// is defined and takes in 2 variabels the input URL and, if needed, a parameter object. If there is a parametre object (paramsObj === 'true') then the helper function defined below is invoked (ln.26----- we can define the function BELOW the calling of it in this case because the invocation of the function doesnt happen UNTIL after the entire JS script has been read and stored into the memory.) and stored in the variable 'formattedParams' which is then resolved alongside the inputURL as the complete URL to be used in the promise for fetching and resolving as the JSON data. (was stumped for a while on this one...)If no paramaters are found, then formattedParam returns as an empty string and gets passed along with no affect (and not as I had erroniasly thought as 'undefiend'...thanks dev tools)
function makeAndReturnPromise(inputURL, paramsObj) {
    var formattedParams = ''
    if( paramsObj ) {formattedParams = _formatURLParams(paramsObj) }

    return $.getJSON(inputURL + formattedParams )
}


// defining the parameter helper function.   '_formatURLparams' helper function comes into play if the  'paramsObj' === 'true' and resolves into the appropraite parameter string for the URL. This helper function is then used to complete the URL for 'makeAndReturnPromise' function (defined above) the helper function takes as the input the parsamter object and formats it into an HTML string including the '&' and '='
var _formatURLParams = function(paramsObj) {
   var paramString = ''
   for (var aKey in paramsObj) {
       var val = paramsObj[aKey]
       paramString += "&" + aKey + "=" + paramsObj[aKey]
   }
   return paramString.substr(1)
}


/////////////////////////////////////////
// Defining the helper function for the controller that resolves into the URL 
/////////////////////////////////////////

function _gitUserURL(userName) {

    return baseURL + userName //+ apiKey
    //=> https://api.github.com/users/blakeboaz?access_token=4ec879e96a1415c2f5efcea69f2b7664edb30f93
}

function _gitUserRepoURL(userName){

    return baseURL + userName + '/repos' //+ apiKey
    //=> https://api.github.com/users/blakeboaz/repos?access_token=4ec879e96a1415c2f5efcea69f2b7664edb30f93
}





/////////////////////////////////////////
//Profile Data Function

var handleDataProfile = function(jsonProfileData) {
    // console.log(jsonProfileData)
    var domPRofileString = ''
    var profileObject = jsonProfileData
    domPRofileString += profileToHTML(profileObject)
    var profileContainer = document.querySelector('.left')
    profileContainer.innerHTML = domPRofileString
}



/////////////////////////////////////////
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

    var newProfileToDom = '<img class="profilePic" src="' + avatarImgSrc + '">'
    newProfileToDom += '<ul class="profileListContainer"><li class="profileName"><h3>' + name + '</h3></li>'
    newProfileToDom += '<li class="profileEmail"><i class="fa fa-envelope"></i>' + email + '</li>'
    newProfileToDom += '<li class="profilelocation"><i class="fa fa-globe"></i>' + location + '</li></ul><br><br>'
    newProfileToDom += '<div class="profileBlog box"><i class="fa fa-pencil-square-o"></i><p class="text">Blog</p></div>'
    newProfileToDom += '<div class="profileBio box">' + bio + '<p class="text">Bio</p></div>'
    newProfileToDom += '<div class="profileHireable box"><i class="fa fa-code-fork"></i><p class="text">'+ hire +'</p></div>'

    return newProfileToDom
}


/////////////////////////////////////////
// Repos Data Function & sending to DOM

var handleDataRepos = function(jasonDataRepo) {
    // console.log([jasonDataRepo])
    var domRepoString = ''
    for (var i = 0; i < jasonDataRepo.length; i++) {
        domRepoString += '<a href="'+jasonDataRepo[i].html_url+'"target="_blank"><div class="repoList"> <h4>Repo Name:     ' + jasonDataRepo[i].name + '</h2><br>Number Of Open Issues:     ' + jasonDataRepo[i].open_issues_count + '</div></a>'
    }
    var repoContainer = document.querySelector('.right')
    repoContainer.innerHTML = domRepoString
        // console.log()

}



//////////////////SEARCH FUNCTION/////////////////////////

//////////////////////////////////////////////
// STEP 1. DEFINING THE SEARCH FUNCTION///////////////
// the function newSearch (ln.96) accepts the input 'keyEvent' for the 'enter' (keyEvent.keyCode number 13) key to be pressed down. At this point the contents of the search    ('.value') [the username at this point of web-biilding is as complex as this app can get]is stored as a variable 'userLookupVal' and the contents of the search are cleared. The the '.location.hash' attribute of the window is defined as the search input variable which proceeds to place a # mark and the value of the userLookupVal in the search bar. This affects the initial on-load (defined below) on a hard re-fresh of the window.
//////////////////////////////////////////////
var newSearch = function(keyEvent) {
    var inputEl = keyEvent.target

    if (keyEvent.keyCode === 13) {
        var userLookupVal = inputEl.value
        inputEl.value = ''
        window.location.hash = userLookupVal //

	}
}

////////////////////////////////////////////
// STEP 2. CALLING SEARCH//////////////////
// This statement calls the eventlistner method of the search input object(inputEl). The event listner is set to listen for a 'keydown' (defined above) and passes the contents to the variable 'newSearch' ( defined above as the function newSearch ). The inputEl.addEventListener method essentially calls the 'newSearch' function and passes along the built-in option of 'keydown'.

inputEl.addEventListener('keydown', newSearch)




////////////////////////////////////////////
// THE CONTROLLER: //////////////////
// The controller receives  input 'hashEvent' from thre ways: 1. when loading a new page, 2. the search value input (as defined above), 3. using a 'deep link' which affects the hashmark of the on-load (as defined below). Each of these inputs resolves into a # and username (either from the contents of the search function or via the deep link). The first thing the controller does is strip the hashtag and save the username as the variable 'userLookupVal' which is then used in the jQuery promise function which has the attribute '.then'. this function (defined above ln. 9) takes in as an input the API url for the profile and repo and the '.then' attribute sends the resultant JSON object containing our requested data to the variable 'handleData...'(defined above ln.40 & 51 for the profile or repo as the case warrents). 

var controller = function (hashEvent) {
     // console.log(window.location.hash)
    var userLookupVal = (window.location.hash).substr(1)

    var userGH_URL = _gitUserURL(userLookupVal)
    var userGhRepoURL = _gitUserRepoURL(userLookupVal)

    makeAndReturnPromise(userGH_URL).then(handleDataProfile)
    makeAndReturnPromise(userGhRepoURL).then(handleDataRepos)

}
 ///////////////////////////
// webApp initialization.
// The first thing that happens on loading page is initiatied by (117 in conjuncture with 126 (AND affected by the search input ---post refresh of page (88-94)---)--- Ty Travis H.) Due to the script having both the window.location.hash resolving as a boolean response of 'true' (117) AND the Window (126) 'hashchange'  evventlistner activated to capture any eventualaity that is then passed to the conroller (defined above). Otherwise, the helper functions which resolve into the user and repo URLs and subsequently defined into thier own variables (120-121) and then called  (122&123) by the jQuery promise-calling-method which involved the actual making and returning function (defined above ln. 9 & 16) resolving into the required URLs and being passed along to the attached'.then' method which has an input the variable that resolves into a function that will handle the returned JSON data. (defined above l.40) 
//////////////////////////////////
// console.log(window.location.hash)
if (window.location.hash) {
    controller()
} else {
    var userURL = _gitUserURL('boazblake')
    var repoURL = _gitUserRepoURL('boazblake')
    makeAndReturnPromise( userURL ).then(handleDataProfile)
    makeAndReturnPromise( repoURL ).then(handleDataRepos)
}

window.addEventListener('hashchange', controller)