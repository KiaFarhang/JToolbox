'use strict';


var competitorSearch = document.getElementById('competitorSearch');
// var searchGoogle = document.getElementById('searchGoogle');
var wordSearch = document.getElementById('wordSearch');
var dictionarySearch = document.getElementById('dictionarySearch');
var thesaurusSearch = document.getElementById('thesaurusSearch');
var options = document.getElementById('options');

competitorSearch.addEventListener('submit', searchGoogle);
// searchGoogle.addEventListener('click', searchGoogle);
dictionarySearch.addEventListener('click', searchWord);
thesaurusSearch.addEventListener('click', searchWord);
options.addEventListener('click', openOptions);
wordSearch.addEventListener('keydown', pressHandler);

function searchGoogle() {

    var searchQuery = competitorSearch.elements[0].value.replace(/\s/g, '+');

    var siteString = '';

    var sitesArray = [];

    var storageSearch = 'site:';

    chrome.storage.sync.get('sites', function(data) {
        var sites = data.sites;
        for (var key in sites) {

            if (sites[key] != '') {
                sitesArray.push(sites[key]);
            }
        }

        siteString = sitesArray.join(' OR site:');

        var searchString = 'https://google.com/#q=' + searchQuery + '+' + 'site:' + siteString;

        var properties = {
            url: searchString,
            active: true
        };

        chrome.tabs.create(properties);

    });

}

function searchWord(e) {

    clearList();

    var text = document.getElementById('wordSearch').value;

    var ul = document.getElementById('definitionZone');

    var key = 'qX2lNxi2wfmshg2v3o2eIDfXOPVTp1RVxaCjsnzhO7HW4yczcC';

    if (e.target.id == 'dictionarySearch') {
        listDefinitions();
    } else if (e.target.id == 'thesaurusSearch') {
        listSynonyms();
    }

    function listSynonyms() {
        var xhrString = 'https://wordsapiv1.p.mashape.com/words/' + text + '/synonyms';

        var xhr = ajaxCall('GET', xhrString, 'X-Mashape-Authorization', key);
        xhr.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    var obj = JSON.parse(this.responseText).synonyms;

                    for (var i = 0; i < obj.length; i++) {
                        var synonym = obj[i];
                        var li = document.createElement('li');

                        li.innerText = synonym;
                        ul.appendChild(li);
                    }
                } else {
                    var error = document.createElement('li');
                    error.classList.add('error');
                    error.innerText = 'Sorry, an error occurred. Make sure you spelled the word correctly.';
                    ul.appendChild(error);
                }
            }
        }

        xhr.send();
    }

    function listDefinitions() {
        var xhrString = 'https://wordsapiv1.p.mashape.com/words/' + text + '/definitions'

        var xhr = ajaxCall('GET', xhrString, 'X-Mashape-Authorization', key);
        xhr.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {

                    var wordArray = JSON.parse(this.responseText).definitions;

                    for (var i = 0; i < wordArray.length; i++) {
                        var thisDefinition = wordArray[i].definition;
                        var thisPart = wordArray[i].partOfSpeech;
                        var li = document.createElement('li');

                        li.innerText = thisPart + ': ' + thisDefinition;
                        ul.appendChild(li);
                    }
                } else {
                    var error = document.createElement('li');
                    error.classList.add('error');
                    error.innerText = 'Sorry, an error occurred. Make sure you spelled the word correctly.';
                    ul.appendChild(error);
                }
            }
        }

        xhr.send();
    }

}

function ajaxCall(method, url, optionalHeaderType, optionalHeaderValue) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    if (optionalHeaderType != undefined && optionalHeaderValue != undefined) {
        xhr.setRequestHeader(optionalHeaderType, optionalHeaderValue);
    }
    return xhr;
}

function clearList() {
    var ul = document.getElementById('definitionZone');

    while (ul.hasChildNodes()) {
        ul.removeChild(ul.lastChild);
    }

}

function openOptions() {
    chrome.runtime.openOptionsPage();
}

function pressHandler(e) {
    if (e.key == 'Enter') {

        clearList();
        var ul = document.getElementById('definitionZone');

        var li = document.createElement('li');

        li.classList.add('error');
        li.innerText = 'Click one of the buttons to search.';

        ul.appendChild(li);
    }
}
