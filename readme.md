**This project can't work without Node.js, install it here : https://nodejs.org/**  

# Install
**Run the** `install.bat` **file**  
**Every time you want to launch the app, run the** `run.bat`  
**Then, go to** `http://localhost:8000` **and you're good to go !**
# Notes & comments

### Limitations of image decoders

Every image is a compressed file, which needs to be decoded. For databending, we can identify two types of image decoders :

- The first is the ones we can’t use to read corrupted images, because they are **safe** : if it detects a problem, or a corruption, they stop the process and returns an error.
- On the other hand, we have the ones that don’t care about corrupted files : they behaves **blindly** and continues the process even if the final result will be totally altered.

Every npm image reader packages sadly are in the safe category, and can’t be used for databending purposes.
This step of decoding a corrupted file is crucial to make the final image : We can’t show any preview of the altered image on the web page, but most important, we can’t recompress the image to make it ‘stable’.

### Uses for research

What we can do is use Node.js to make auto compression and databending at the same time : it’s way easier to do it like that, and look at how different an image behaves with different compressions and extensions. That’s why the main program is now used to make batches of altered images.

# Pros & Cons

🟢 A tool that could be online for a better accessibility  
🟢 Corrupt an image quickly & easily  
🟢 Good for trying what looks an image corrupted with different compressions  

🔴 Image compression are limited by available npm packages  
🔴 Actually no ways to read a corrupted image using Node.js  
🔴 Data is removed without knowing where image data is (can’t read data structures for now)  
🔴 The con just above makes some images broken  

# Project screenshots
<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/2129b9c4-49da-4e3c-b214-f5864e316b92/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230202T122732Z&X-Amz-Expires=86400&X-Amz-Signature=c7696e9cf6c22573a87564af860dde83ba9ed0261f04005b1e9175ee4ce6024d&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject" width="500" />\
Web page<br><br>

<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/79b84b63-d1e2-4c75-899b-19275e0a3ffe/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230202T122704Z&X-Amz-Expires=86400&X-Amz-Signature=5115f088671c1bb1d1a03f3f36c6188a8b37e0e31c0561bb00b1138ceab171f0&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject" width="500" />\
Corrupted images in one click ! Yaay<br><br>

<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f095b684-1941-4574-9d17-d519da2a8cd4/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230202T122641Z&X-Amz-Expires=86400&X-Amz-Signature=a04750a419db5c567a3fcba0273444bbef48cd7aa1c1bdf846b7311dda13b2e5&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject" width="500" />\
Some images are broken and can’t be opened, as mentioned in the cons
