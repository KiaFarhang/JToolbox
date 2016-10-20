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
    }


});
