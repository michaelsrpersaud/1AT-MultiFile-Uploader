// Fork of Solution found on
// https://stackoverflow.com/questions/31126181/uploading-multiple-files-to-google-drive-with-google-app-script
// 

var parentFolderId = "your folder id here";
var dropbox = "Photos";
var parentFolder = DriveApp.getFolderById(parentFolderId);
var folder;
var folderId;

function doGet() {
  var output = HtmlService.createHtmlOutputFromFile('form');
  output.addMetaTag('viewport', 'width=device-width, initial-scale=1');// See http://stackoverflow.com/a/42681526/470749
  return output.setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function uploadFileToDrive(base64Data, fileName, fileDesc) {
//subfolderId
  try{
    var splitBase = base64Data.split(','),
        type = splitBase[0].split(';')[0].replace('data:','');

    var byteCharacters = Utilities.base64Decode(splitBase[1]);
    var ss = Utilities.newBlob(byteCharacters, type);
    ss.setName(fileName);

    //Logger.log('file desc ' + fileDesc);
    //Logger.log('folder id ' + parentFolder.getFoldersByName(dropbox).next().getId());

    var file = DriveApp.getFolderById(parentFolder.getFoldersByName(dropbox).next().getId()).createFile(ss);
    //Logger.log('file fn name ' + fileName);

    file.setDescription('Uploaded by ' + fileDesc);
    //Logger.log('file url ' +  file.getUrl());

    return file.getName() + ' at ' + file.getUrl();
  } catch(e){
    return Logger.log('createFile Error: ' + e.toString());
  }
}

function createSubfolder(){
try {
      //subfolderName + Utilities.formatDate(new Date(), "US/Eastern", "_yyyy-MM-dd");
      //Logger.log(dropbox);
    try {
      folder = parentFolder.getFoldersByName(dropbox).next();
    }
    catch(e) {
      folder = parentFolder.createFolder(dropbox);
    }
  //Logger.log('folder?: '+ folder);
  return folder.getId();
    } catch(e){
    return  Logger.log('createFile Error: ' + e.toString());
  }

}
