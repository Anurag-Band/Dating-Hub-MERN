# Dating-Hub-MERN

🚀 Used Technologies :- React Js, Node Js, Express Js, 

🚀 Tools Used :- Socket.io, AWS S3 (for Images uploading)  

🚀 Problem Statement :-  

Create a basic web dating app which should contain following features:-

🚀 UI:-

✅ Sign up/login with email password
✅ One Image uploading for each user
✅ User interface to scroll random images.Logged in user can scroll images and perform 3 actions (Like,block,superlike other image/user)

🚀 Backend:-

✅ Test users loading: You can load test users with 10 images in the database.
✅ Sign up api : Basic email and password based registration
✅ login api : Jwt based login with email and password

✅ Image like api : Whenever someone like other user image, a socket io notification will sent to other user
but image of person who liked should not be visible to who is being liked

✅ Image superlike : Whenever someone super likes another user image, a socket io notification will be sent to another user and the image of the person who liked will be visible to who is being liked.

✅ Block api: When a user block another user then his/her image should not be shown while blocked user is scrolling random images.
