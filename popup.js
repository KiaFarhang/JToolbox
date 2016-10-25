'use strict';


var competitorSearch = document.getElementById('competitorSearch');
var dictionarySearch = document.getElementById('dictionarySearch');

competitorSearch.addEventListener('submit', searchGoogle);
dictionarySearch.addEventListener('click', searchDictionary);

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

function searchDictionary() {

    clearList();

    var text = document.getElementById('wordSearch').value;

    var ul = document.getElementById('definitionZone');

    var xhrString = 'https://wordsapiv1.p.mashape.com/words/' + text + '/definitions';
    var key = 'qX2lNxi2wfmshg2v3o2eIDfXOPVTp1RVxaCjsnzhO7HW4yczcC';

    var xhr = ajaxCall('GET', xhrString, 'X-Mashape-Authorization', key);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {

                var wordArray = JSON.parse(this.responseText).definitions;

                for (var i = 0; i < wordArray.length; i++) {
                    var thisDefinition = wordArray[i].definition;
                    var thisPart = wordArray[i].partOfSpeech;
                    var li = document.createElement('li');
                    // var span = document.createElement('span');

                    // span.innerText = thisPart;


                    // li.appendChild(span);
                    li.innerText = thisPart + ': ' + thisDefinition;
                    ul.appendChild(li);
                }
            } else {
                var error = document.createElement('li');
                error.innerText = 'Sorry, an error occurred. Make sure you spelled the word correctly.';
                ul.appendChild(error);
            }

        }
    }

    xhr.send();

}
//Mashape WordsAPI Key qX2lNxi2wfmshg2v3o2eIDfXOPVTp1RVxaCjsnzhO7HW4yczcC   



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
