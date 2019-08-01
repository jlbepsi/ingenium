export default [
  {
    "DatabaseGroupUsers":[
      {
        "DbId":1,
        "SqlLogin":"ajout",
        "UserLogin":null,
        "UserFullName":null,
        "GroupType":2,
        "CanBeDeleted": false,
        "CanBeUpdated": false,
        "AddedByUserLogin": "test.v8"
      },
      {
        "DbId":1,
        "SqlLogin":"ajoutTestUnit",
        "UserLogin":null,
        "UserFullName":null,
        "GroupType":3,
        "CanBeDeleted": false,
        "CanBeUpdated": false,
        "AddedByUserLogin":"test.v8"
      },
      {
        "DbId":1,
        "SqlLogin":"test.v8",
        "UserLogin":"test.v8",
        "UserFullName":"V8 Test",
        "GroupType":1,
        "CanBeDeleted": true,
        "CanBeUpdated": true,
        "AddedByUserLogin":"test.v8"
      }
    ],
    "DatabaseServerName":{
      "Id":0,
      "Code":"TEST",
      "Name":"ServerTest",
      "IPLocale":"0.0.0.0",
      "NomDNS":"serveur de test interne",
      "Description": "Utilisé pour les tests",
      "CanAddDatabase":1,
    },
    "Id":1,
    "ServerId":0,
    "NomBD":"DBTest",
    "DateCreation":"2018-12-18T00:00:00",
    "Commentaire":"UpdateDatabase depuis les Tests Unitaires",
    "CanBeDeleted": false,
    "CanBeUpdated": false,
    "CanAddGroupUser": false
  },
  {
    "DatabaseGroupUsers":[],
    "DatabaseServerName":{"Id":0,"Code":"TEST","Name":"ServerTest","IPLocale":"0.0.0.0","NomDNS":"serveur de test interne","Description":"Utilisé pour les tests","CanAddDatabase":1},
    "Id":9,"ServerId":0,"NomBD":"DBTest2","DateCreation":"2018-12-21T00:00:00","Commentaire":"Aucun",
    "CanBeDeleted": false,
    "CanBeUpdated": false,
    "CanAddGroupUser": false
  },
  {
    "DatabaseGroupUsers":[{"DbId":11,"SqlLogin":"ajoutTestUnit","UserLogin":null,"UserFullName":null,"GroupType":2,
      "CanBeDeleted": false,
      "CanBeUpdated": false,"AddedByUserLogin":"test.v8"},{"DbId":11,"SqlLogin":"test.v8","UserLogin":"test.v8","UserFullName":"V8 Test","GroupType":1,
      "CanBeDeleted": true,
      "CanBeUpdated": true,"AddedByUserLogin":"test.v8"}],
    "DatabaseServerName":{"Id":4,"Code":"sqlserver","Name":"SQL Server 2","IPLocale":"192.168.100.161","NomDNS":"sqlserver.montpellier.epsi.fr","Description":null,"CanAddDatabase":1},
    "Id":11,"ServerId":4,"NomBD":"DBTest","DateCreation":"2018-12-21T00:00:00","Commentaire":"Pour les tests",
    "CanBeDeleted": true,
    "CanBeUpdated": true,
    "CanAddGroupUser": true
  },
  {
    "DatabaseGroupUsers":[{"DbId":12,"SqlLogin":"test.v8","UserLogin":"test.v8","UserFullName":"V8 Test","GroupType":1,
      "CanBeDeleted": true,
      "CanBeUpdated": true,"AddedByUserLogin":"test.v8"}],
    "DatabaseServerName":{"Id":4,"Code":"sqlserver","Name":"SQL Server 2","IPLocale":"192.168.100.161","NomDNS":"sqlserver.montpellier.epsi.fr","Description":null,"CanAddDatabase":1},
    "Id":12,"ServerId":4,"NomBD":"DBUbunitTest","DateCreation":"2018-12-21T15:18:54.23","Commentaire":"Depuis les Tests Unitaires",
    "CanBeDeleted": false,
    "CanBeUpdated": false,
    "CanAddGroupUser": false
  }
];