# How to write a URL into a file using just JavaScript #

## Problem Statement ##
I basically save a lot of bookmarks, every page visited is bookmarked it, I know this is not good and i should leave this habit, but i always have this feeling what if i might need this URL sometime in near future. So because of this fear  and also did not wanted to clutter my bookmark bar of the browser, so was trying to use a very simple techniques to write the link(URL/Title) to a markdown file, and save it into my DropBox Folder so that that it is synced across my devices.

## Alternatives ##
There are lot of alternative already available, i am providing a list of few of them.  
1. [EverNote](https://evernote.com/)  
2. [DropBox](https://www.dropbox.com/)  
3. [XMarks](http://www.xmarks.com/)  
This is a very good plugin available for all the browser so that you can sync across browsers, [here](https://archerimagine.wordpress.com/2013/10/01/sync-your-bookmarks-seemlessly-acrross-browser-and-computers/) is my tutorial on setting it up.  
4. [Delicious](http://del.icio.us/)  
5. [Diggo](http://www.diigo.com/)  
6. [Digg](http://www.digg.com/)  

Now you can also google for other social bookmarking sites, the problem is I did not wanted to use these sites, as these were ready made solution and most of them looked like *trying to kill a fly with a tank* basically meaning these had to many features for my simple use case.  

My use case was petty simple, **"Write a bookmark to a markdown file and share it using drop box using JavaScript."**

Another reason was, i started learning a little bit of `JavaScript`, `CSS`, so i wanted to use this learning to create a bookmarklet.

## Solution ##
Like most of the journeys in this world, mine was also not smooth, faced many hurdles in solving this simple problem, but i learned few new things from this. So i will take you through the problem which were faced and how it was solved.

### JavaScript Does not have a FileWrite Api, though it has FileReader Api ###

So here begins my journey to solve my problem, so i started googling how to read and write files using JavaScript and then it hit me like a rock since i was  a `C` and `Java` developer before I started `JavaScript` i never thought that there is no way to do File Write operations. 

So after this finding i was planning to drop the idea, and then it hit me, i had read a blog on [Loading, Editing, and Saving a Text File in HTML5 using JavaScript](http://thiscouldbebetter.wordpress.com/2012/12/18/loading-editing-and-saving-a-text-file-in-html5-using-javascrip/) i really thanked my habit of saving all my bookmarks, else this idea would never had been possible. Now if you read the blog basically he tells a way  

* to Open a File using `FileReader` Api.
* Read the content of the file.
* Modify the content.
* And then Save the file.

So i thought i can use the same concept and open the same file, read the content, modify the content and then **save it with the same name**. So with this help my problem was solved.

Now to adapt to this solution the problem was i cannot make this complete code as a bookmarklet, because, i need to have these in a HTML page.

* One `input` file tag to input the file.
* One button to save the file.

So the idea of just a bookmarklet was not looking a possibility, the plan changed to having a bookmarklet get the **Title** and **URL** of the page to bookmark and then pass it to this WebPage, and will host this code on GitHUB and then Clone it across my Apache WebServer on different System so that my bookmarklet works both in my office and in my home.

### How to Pass the Title and  the URL to my WebPage ###
So solving this simple bookmaklet use case was turning into a nightmare, as i was getting hit by one roadblock after another, so now after deciding that i will split the work between.  

* A bookmarklet which will just get the URL and Title of the Webpage.
* Pass this URL and Title to my local WebPage to be saved into the text File.

Now the problem is how to pass these two information from my bookmarklet to the local Webpage. The Solution which came to my mind we also liitle bigger than my actual use case required. The solution which came were:-  

* Write a Cookie and the read it in the Local webPage.
* Use the Local Storage of the browser.

Even worse, coming from a Java and C background which have global variable, i was trying to make something global in bookmarklet and then using it in the Local webpage, not understanding that when i redirecting from the bookmarklet to the local webpage all my variables were gone, side effects of being a C developer, the Browser looked like one big context where i am saving variables. 

So after these initial understanding i found out about `window.location.hash` so i thought i can pass both my Title and URL as a Hash, here is the code which did this.

````
window.location = "http://localhost/myTutorials/linksSavedtoLocalFile/" +"#"+myHref+"#"+myTitle;
````

So after passing the Hash it was all about reading the hash and modifying it as shown below:-  

````
var receivedStringArray = (window.location.hash).split("#");
````

So these two were the major hurdle in my creation of custom bookmark manager. If you are interested in further, you can check some of my references mentioned below. This is the way I was able to create something which will solve at least one of my problems, and i was able to learn a little more about JavaScript, for me this was like a perfect small project to learn a little JavaScript.

## References. ##
* [Hash Usager MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window.location)
* [Loading, Editing, and Saving a Text File in HTML5 Using Javascript](http://thiscouldbebetter.wordpress.com/2012/12/18/loading-editing-and-saving-a-text-file-in-html5-using-javascrip/)
* [Create Bookmarklet - The Right Way](http://code.tutsplus.com/tutorials/create-bookmarklets-the-right-way--net-18154)
* [GitHub Code for the Local WebPage](https://github.com/archerImagine/linksSavedtoLocalFile)
* [GitHub Gist for the BookMarklet](link)