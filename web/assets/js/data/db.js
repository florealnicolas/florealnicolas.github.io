function DB() {

    let request = window.indexedDB.open("abbeyDB");

    request.onupgradeneeded = function () {
        const db = this.result;
        const store = db.createObjectStore("players", {autoIncrement: true});
        store.createIndex("name", "name");
    };

    request.onsuccess = function () {
        const db = this.result;
    };

    /*this.getData = function (searchStore, key, value) {
        this.request.onsuccess = function () {
            const db = this.result;
            let query = db.transaction(searchStore, "readonly");
            const store = query.objectStore(searchStore);

            const index = store.index(key);
            query = index.get(value);

            query.onsuccess = function () {
                console.log("The search is over, here you have your record.");
                console.log("Record", query.result);
                data = query.result;
            };
        }
    };

    this.loadPlayer = function (playername) {
      this.getData("players","name",playername).then(function (result) {
          console.log("Result",result);
      })
    };*/

    this.addData = function (putStore, value) {
        request.onsuccess = function () {
            const db = this.result;
            const transaction = db.transaction(putStore, "readwrite");
            const store = transaction.objectStore(putStore);

            store.put(value);

            transaction.onsuccess = function () {
                console.log("Everything has been add and done!");
            };
        }
    };

    this.removeData = function (deleteStore, deleteValue) {
        request.onsuccess = function () {
            const db = this.result;
            const removal = db.transaction(deleteStore, "readwrite");
            const store = removal.objectStore(deleteStore);
            store.delete(deleteValue);

            removal.onsuccess = function () {
                console.log("The record has been deleted!");
            }
        }
    };

    this.createObjectStore = function (storeToCreate, index) {
        request.onsuccess = function () {
            const db = this.result;
            const creation = db.createObjectStore(storeToCreate);
            creation.createIndex(index);

            creation.onsuccess = function () {
                console.log("The ObjectStore has been created!");
            }
        }
    };

    this.deleteObjectStore = function (storeToDelete) {
        request.onsuccess = function () {
            const db = this.result;
            const deletion = db.deleteObjectStore(storeToDelete);

            deletion.onsuccess = function () {
                console.log("The ObjectStore has been deleted!");
            }
        }
    };

    this.updateData = function (updateStore, key, searchValue, newData) {
        request.onsuccess = function () {
            const db = this.result;
            const update = db.transaction(updateStore, "readwrite");
            const store = update.objectStore(updateStore);

            const index = store.index(key);
            const itemToUpdate = index.get(oldValue);

            itemToUpdate.onsuccess = function (event) {

                const update = store.put(newData);

                update.onsuccess = function (event) {
                    console.log("The record has been updated!");
                }
            }
        }
    };

}