
document.getElementById('files').addEventListener('change', loadFileAsText, false);
var textFromFileLoaded,fileToLoad;

var myHref=document.URL;

function loadFileAsText(evt)
{
	var files = evt.target.files; // FileList object
	fileToLoad = files[0];

	console.log("[AniB]: fileToLoad: " +fileToLoad.name);

	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent) 
	{
		textFromFileLoaded = fileLoadedEvent.target.result;
		//console.log("[AniB]: textFromFileLoaded: " +textFromFileLoaded);
		//document.getElementById("inputTextToSave").value = textFromFileLoaded;
	};
	fileReader.readAsText(fileToLoad, "UTF-8");
}

function saveTextAsFile(){
	var receivedStringArray = (window.location.hash).split("#");

	var textToWrite = textFromFileLoaded +"* ["+receivedStringArray[2]+"](" +receivedStringArray[1]+")" +"\n\r" +"\n\r";
	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
	var fileNameToSaveAs = fileToLoad.name;
	console.log("[AniB]: saveTextAsFile() " +fileNameToSaveAs);

	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";

	if (window.webkitURL != null){
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	}
	downloadLink.click();
}