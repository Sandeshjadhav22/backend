
## 🚀 About Me
Hi, I'm Sandesh Jadhav
I'm a full-stack developer with a passion for building beautiful and functional web applications.


# Project Title

 online prescription platform - Backend


## Tech Stack


**Server:** Node, Express, mongoDb

**utils:**  jsonwebtoken, cloudinary, multer

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`JWT_SECRET=`

`MONGODB_URL=`

`CLODINARY_CLOUD_NAME=`

`CLODINARY_API_KEY=`

`CLODINARY_API_SECRET=`
## start



First Install 
```bash
  npm i
```

To start this project run
```bash
  npm run dev
```


## API Reference

**Doctor:** Api

| Route | Description                |
| :-------- |------------------------- |
| `POST /api/doctor/signup`|  sign up Doctor |
| `POST /api/doctor/signin`|  sign In  Doctor |
| `GET /api/doctor/consultations/:doctorId`|Get Specific consultations |
| `PUT /api/doctor/prescription/:doctorId`|  Specific project |
| `POST /api/doctor/getinfo`|  Get single doctor |


**Patient:** Api
| Route | Description                |
| :-------- |------------------------- |
| `POST /api/patient/signup`|  sign up patient |
| `POST /api/patient/signin`|  sign In  patient |
| `GET /api/patient/create`| Create consultations |
| `POST /api/patient/getAllDoctors`|  Get All doctor |



