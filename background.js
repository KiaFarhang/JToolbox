chrome.commands.onCommand.addListener(function(command) {
    var properties = {
        active: true,

    }
    setURL(command);

    chrome.tabs.create(properties);

    function setURL(command) {
        if (command == 'load_twitter') {
            properties.url = 'https://www.twitter.com';
        } else if (command == 'load_facebook') {
            properties.url = 'https://www.facebook.com';
        }
        else if (command == 'load_dictionary'){
            properties.url = 'http://www.dictionary.com';
        }
        else if (command == 'load_gmail'){
            properties.url = 'https://mail.google.com';
        }
        // else if (command == 'load_jobs'){
        //     properties.url = 'http://www.journalismjobs.com';
        // }
    }


});
