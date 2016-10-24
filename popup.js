'use strict';


var competitorSearch = document.getElementById('competitorSearch');

competitorSearch.addEventListener('submit', searchGoogle);


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



    // var links = document.getElementById('searchList').getElementsByTagName('a');

    // for (var i = 0; i < links.length; i++) {
    //     links[i].addEventListener('click', toggleInput);
    // }

    // function toggleInput(e) {

    //     // if (e.target.nextSibling == null) {
    //     //     // var input = document.createElement('input');
    //     //     // input.setAttribute('type', 'text');

    //     //     // e.target.parentElement.appendChild(input);

    //     //     console.log('work');

    //     // } else {
    //     //   console.log('eh');
    //     // }

    //     var a = e.target;
    //     alert(a + 'asda');

    // }
