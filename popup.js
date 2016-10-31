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

    var dictKey = 'fe65f46d-c560-4ce5-b4f4-57a8fba739f4';
    var thesKey = '478fc1d6-2e10-4ab5-8bde-1268d2782332';

    var theWord = document.createElement('li');
    theWord.innerText = text;
    theWord.classList.add('word');
    ul.appendChild(theWord);

    if (e.target.id == 'dictionarySearch') {
        listDefinitions();
    } else if (e.target.id == 'thesaurusSearch') {
        listSynonyms();
    }

    function listSynonyms() {
        var xhrString = 'http://www.dictionaryapi.com/api/v1/references/thesaurus/xml/' + text + '?key=' + thesKey;

        var xhr = ajaxCall('GET', xhrString);
        xhr.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    var xmlData = this.responseXML;
                    var synonyms = xmlData.getElementsByTagName('syn')[0].textContent;
                    var related = xmlData.getElementsByTagName('rel')[0].textContent;

                    var liOne = document.createElement('li');
                    liOne.innerText = synonyms;

                    var liTwo = document.createElement('li');
                    liTwo.innerText = related;

                    ul.appendChild(liOne);
                    ul.appendChild(liTwo);

                } else {
                    var error = document.createElement('li');
                    error.classList.add('error');
                    error.innerText = 'Sorry, an error occurred. Make sure you spelled the word correctly.';
                    ul.appendChild(error);
                }
            }
        }
        xhr.overrideMimeType('text/xml');
        xhr.send();

    }


    function listDefinitions() {
        var xhrString = 'http://www.dictionaryapi.com/api/v1/references/collegiate/xml/' + text + '?key=' + dictKey;

        var xhr = ajaxCall('GET', xhrString);
        xhr.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {

                    var xmlData = this.responseXML;

                    var entries = xmlData.getElementsByTagName('entry');

                    for (var i = 0; i < entries.length; i++) {
                        var thisEntry = removeExtraMarkup(entries[i]);
                        var speechPart = entries[i].getElementsByTagName('fl')[0].textContent;
                        var speechItem = document.createElement('li');
                        speechItem.classList.add('speech');
                        speechItem.innerText = speechPart;
                        ul.appendChild(speechItem);

                        listThem(thisEntry);

                        function listThem(entry) {
                            var definitions = entry.getElementsByTagName('dt');
                            for (var j = 0; j < 5; j++) {
                                var thisDefinition = definitions[j].textContent.slice(1);
                                var defItem = document.createElement('li');
                                defItem.innerText = thisDefinition;
                                ul.appendChild(defItem);
                            }
                        }
                    }
                } else {
                    var error = document.createElement('li');
                    error.classList.add('error');
                    error.innerText = 'Sorry, an error occurred. Make sure you spelled the word correctly.';
                    ul.appendChild(error);
                }
            }
        }

        xhr.overrideMimeType('text/xml');
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

function removeExtraMarkup(entry) {
    if (entry.getElementsByTagName('aq') != null) {
        var aq = entry.getElementsByTagName('aq');
        while (aq[0]) {
            aq[0].parentElement.removeChild(aq[0]);
        }
    }
    if (entry.getElementsByTagName('sxn') != null) {
        var sxn = entry.getElementsByTagName('sxn');
        while (sxn[0]) {
            sxn[0].parentElement.removeChild(sxn[0]);
        }
    }
    if (entry.getElementsByTagName('vi') != null) {
        var vi = entry.getElementsByTagName('vi');
        while (vi[0]) {
            vi[0].parentElement.removeChild(vi[0]);
        }
    }

    return entry;
}
