var app = angular.module('toDoApp', []);

app.controller('toDoCtrl', function ($scope, $http) {
    $scope.toDoNotes = [];
    $scope.newNote = {};

    $scope.toDoData = function () {
        $http.get('/api/notes').then(function (response) {
            $scope.toDoNotes = response.data;
        });
    };

    $scope.uniqueStatuses = function (notes) {
        const uniqueStatus = [];
        const statusSet = new Set();
    
        notes.forEach(function (note) {
            if (!statusSet.has(note.status)) {
                statusSet.add(note.status);
                uniqueStatus.push(note.status);
            }
        });
        return uniqueStatus;
    };

    $scope.toDoData();

    $scope.addNote = function () {
        $http.post('/api/addNewNote', $scope.newNote).then(function (response) {
            $scope.toDoNotes.push(response.data);
            $scope.newNote = {};
        });
    };

    $scope.updateNote = function (note) {
        note.editing = true;
    };

    $scope.saveNote = function (note) {
        const updateData = {
            name: note.name,
            status: note.status
        };
        $http.put('/api/updateNote/' + note.id, updateData)
            .then(function (response) {
                $scope.toDoNotes.push(response.data);
                note.editing = false;
            });
    };

    $scope.deleteNote = function (note) {
        $http.delete('/api/deleteNote/' + note.id)
            .then(function (response) {
                $scope.toDoNotes = response.data;
                $scope.toDoData();
            });
    };
});

