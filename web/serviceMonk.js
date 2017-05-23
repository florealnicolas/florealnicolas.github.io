this.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('v1')
            .then(function (cache) {
                return fetch('files.json').then(function (response) {
                    return response.json();
                }).then(function (files) {
                    return cache.addAll(files);
                });
            })
            .then(function () {
                console.log("Troubadour: Your files are installed!");
            })
    );
});

this.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                    if (response) {
                        //console.log("Troubadour: I returned a file from my cache. [File = '" + event.request.url + "']");
                        return response;
                    }

                    //console.log("Troubadour: I returned a file from the server. [File = '" + event.request.url + "']");
                    return fetch(event.request);
                }
            )
    );
});