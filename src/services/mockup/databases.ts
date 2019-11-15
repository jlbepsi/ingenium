export default [
  {
    "users":[
      {
        "DbId":1,
        "sqlLogin":"ajout",
        "userLogin":null,
        "userFullName":null,
        "groupType":2,
        "canBeDeleted": false,
        "canBeUpdated": false,
        "AddedByuserLogin": "test.v8"
      },
      {
        "DbId":1,
        "sqlLogin":"ajoutTestUnit",
        "userLogin":null,
        "userFullName":null,
        "groupType":3,
        "canBeDeleted": false,
        "canBeUpdated": false,
        "AddedByuserLogin":"test.v8"
      },
      {
        "DbId":1,
        "sqlLogin":"test.v8",
        "userLogin":"test.v8",
        "userFullName":"V8 Test",
        "groupType":1,
        "canBeDeleted": true,
        "canBeUpdated": true,
        "AddedByuserLogin":"test.v8"
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
    "serverId":0,
    "NomBD":"DBTest",
    "DateCreation":"2018-12-18T00:00:00",
    "Commentaire":"UpdateDatabase depuis les Tests Unitaires",
    "canBeDeleted": false,
    "canBeUpdated": false,
    "CanAddGroupUser": false
  },
  {
    "users":[],
    "DatabaseServerName":{"Id":0,"Code":"TEST","Name":"ServerTest","IPLocale":"0.0.0.0","NomDNS":"serveur de test interne","Description":"Utilisé pour les tests","CanAddDatabase":1},
    "Id":9,"serverId":0,"NomBD":"DBTest2","DateCreation":"2018-12-21T00:00:00","Commentaire":"Aucun",
    "canBeDeleted": false,
    "canBeUpdated": false,
    "CanAddGroupUser": false
  },
  {
    "users":[{"DbId":11,"sqlLogin":"ajoutTestUnit","userLogin":null,"userFullName":null,"groupType":2,
      "canBeDeleted": false,
      "canBeUpdated": false,"AddedByuserLogin":"test.v8"},{"DbId":11,"sqlLogin":"test.v8","userLogin":"test.v8","userFullName":"V8 Test","groupType":1,
      "canBeDeleted": true,
      "canBeUpdated": true,"AddedByuserLogin":"test.v8"}],
    "DatabaseServerName":{"Id":4,"Code":"sqlserver","Name":"SQL Server 2","IPLocale":"192.168.100.161","NomDNS":"sqlserver.montpellier.epsi.fr","Description":null,"CanAddDatabase":1},
    "Id":11,"serverId":4,"NomBD":"DBTest","DateCreation":"2018-12-21T00:00:00","Commentaire":"Pour les tests",
    "canBeDeleted": true,
    "canBeUpdated": true,
    "CanAddGroupUser": true
  },
  {
    "users":[{"DbId":12,"sqlLogin":"test.v8","userLogin":"test.v8","userFullName":"V8 Test","groupType":1,
      "canBeDeleted": true,
      "canBeUpdated": true,"AddedByuserLogin":"test.v8"}],
    "DatabaseServerName":{"Id":4,"Code":"sqlserver","Name":"SQL Server 2","IPLocale":"192.168.100.161","NomDNS":"sqlserver.montpellier.epsi.fr","Description":null,"CanAddDatabase":1},
    "Id":12,"serverId":4,"NomBD":"DBUbunitTest","DateCreation":"2018-12-21T15:18:54.23","Commentaire":"Depuis les Tests Unitaires",
    "canBeDeleted": false,
    "canBeUpdated": false,
    "CanAddGroupUser": false
  }
];